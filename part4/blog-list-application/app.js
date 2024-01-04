import express from 'express';
import blogsRouter from './controllers/blogs.js';
import { MONGODB_URI } from './utils/config.js';

import cors from 'cors';
const app = express();

import mongoose from 'mongoose';

console.log('connecting to', MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);

export default app;