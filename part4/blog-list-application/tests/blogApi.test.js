import supertest from 'supertest';
import mongoose from 'mongoose';

import app from '../app';

const api = supertest(app);
import Blog from '../models/blog';
import { getBlogsInDb, initialBlogs } from './testHelper';

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

afterAll(async () => {
  await mongoose.connection.close();
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(initialBlogs.length);
});

test('verifies the unique ID property is named id', async () => {
  const blogsInDb = await getBlogsInDb();
  expect(blogsInDb[0].id).toBeDefined();
});

test('a valid blog can be added', async () => {
  const newBlog = {
    author: 'Some author 3',
    title: 'Some title 3',
    likes: 5
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await getBlogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);
  const authors = blogsAtEnd.map(n => n.author);
  expect(authors).toContain(
    'Some author 3'
  );
});

test('a blog without likes defaults to 0', async () => {
  const newBlog = {
    author: 'Some author 3',
    title: 'Some title 4',
  };

  const apiRequest = await api
    .post('/api/blogs')
    .send(newBlog);

  expect(apiRequest.status).toEqual(201);
  expect(apiRequest.header['content-type']).toMatch(/application\/json/);

  const blogsAtEnd = await getBlogsInDb();
  const addedBlog = blogsAtEnd.find(blog => blog.id === apiRequest.body.id);
  expect(addedBlog).toHaveProperty('likes', 0);
});

test('a blog without a title is not added', async () => {
  const newBlog = {
    author: 'Some author 3',
    likes: 5,
    url: 'some url'
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await getBlogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogs.length);
});

test('a blog without a URL is not added', async () => {
  const newBlog = {
    author: 'Some author 3',
    likes: 5,
    title: 'some title'
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await getBlogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogs.length);
});
