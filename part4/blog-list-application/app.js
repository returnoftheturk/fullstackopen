import express from 'express';
import blogsRouter from './controllers/blogs.js';
import { MONGODB_URI } from './utils/config.js';
import 'express-async-errors';
import { info } from './utils/logger.js';
import { requestLogger, unknownEndpoint, errorHandler } from './utils/middleware.js';

import cors from 'cors';
const app = express();

import mongoose from 'mongoose';

info('connecting to', MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(() => {
    info('connected to MongoDB');
  })
  .catch((error) => {
    info('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/blogs', blogsRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

export default app;