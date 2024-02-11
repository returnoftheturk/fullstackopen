import supertest from 'supertest';
import mongoose from 'mongoose';

import './testSetup.js';
import app from '../app';

const api = supertest(app);
import Blog from '../models/blog';
import { getBlogsInDb, initialBlogs, createRootUser, testUserData } from './testHelper';

describe('/api/blogs', () => {
  let testUser;
  let jwtToken;

  beforeEach(async () => {
    await Blog.deleteMany({});
    // await Blog.insertMany(initialBlogs);
    testUser = await createRootUser();
    const blogs = initialBlogs.map(blog => ({...blog, user: testUser._id.toString()}));
    await Blog.insertMany(blogs);

    const jwtTokenResponse = await api
      .post('/api/login')
      .send(testUserData)
    
    jwtToken = jwtTokenResponse.body.token;
  });
  
  afterAll(async () => {
    await mongoose.connection.close();
  });
  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .set({ Authorization: `Bearer ${jwtToken}` })
      .expect(200);
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
      likes: 5,
      url: 'some valid url'
    };
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `Bearer ${jwtToken}` })
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
      url: 'some url'
    };
  
    const apiRequest = await api
      .post('/api/blogs')
      .send(newBlog)
      .set({ Authorization: `Bearer ${jwtToken}` });
  
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
      .set({ Authorization: `Bearer ${jwtToken}` })
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
      .set({ Authorization: `Bearer ${jwtToken}` })
      .expect(400);
  
    const blogsAtEnd = await getBlogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  });
  
  test('a blog can be deleted by the user who created it', async () => {
    const blogsAtStart = await getBlogsInDb();
    const blogToDelete = blogsAtStart[0];
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: `Bearer ${jwtToken}` })
      .expect(204);
  
    const blogsAtEnd = await getBlogsInDb();
  
    expect(blogsAtEnd).toHaveLength(
      blogsAtStart.length - 1
    );
  
    expect(blogsAtEnd.some(blog => blog.id === blogToDelete.id)).toBe.false;
  });
  
  test('a blog can be updated', async () => {
    const blogsAtStart = await getBlogsInDb();
    const blogToUpdate = blogsAtStart[0];
  
    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set({ Authorization: `Bearer ${jwtToken}` })
      .send({
        likes: blogToUpdate.likes + 1
      })
      .expect(200);
  
    expect(updatedBlog.body.likes).toEqual(blogToUpdate.likes + 1);
  });
})

