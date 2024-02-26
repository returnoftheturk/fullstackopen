import mongoose from 'mongoose';
import User from '../models/user.js'
import Blog from '../models/blog.js'

// Clear out test data from collections after each test
afterEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
});

afterAll(async function () {
  await mongoose.connection.close();
});
