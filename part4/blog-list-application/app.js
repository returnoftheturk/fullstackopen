import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import cors from 'cors';

import blogsRouter from './controllers/blogs.js';
import usersRouter from './controllers/users.js';
import loginRouter from './controllers/login.js';
import testingRouter from './controllers/testing.js';

import { MONGODB_URI } from './utils/config.js';
import { info } from './utils/logger.js';
import { requestLogger, unknownEndpoint, errorHandler, tokenExtractor, userExtractor } from './utils/middleware.js';

const app = express();

info('connecting to', MONGODB_URI);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
    info('connected to MongoDB');
  })
  .catch((error) => {
    info('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(tokenExtractor);

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/blogs', userExtractor, blogsRouter);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
