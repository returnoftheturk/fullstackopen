import mongoose from 'mongoose';
import { MONGODB_URI } from '../utils/config.js';
import User from '../models/user.js'
import Blog from '../models/blog.js'

beforeAll(async function () {
  // Connect to the test database
  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

// Clear out test data from collections after each test
afterEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
});

afterAll(async function () {
  await mongoose.connection.close();
});
