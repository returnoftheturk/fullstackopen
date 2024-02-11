import Blog from '../models/blog';
import User from '../models/user';
import bcrypt from 'bcrypt';

export const testUserData = {
  username: 'root',
  password: 'sekret'
}

export const initialBlogs = [
  {
    title: 'Some blog',
    author: 'Some Author',
    url: 'Some URL',
    likes: 20
  },
  {
    title: 'Some blog 2',
    author: 'Some Author 2',
    url: 'Some URL 2',
    likes: 30
  }
];

export const createRootUser = async () => {
  await User.deleteMany({})
  
  const passwordHash = await bcrypt.hash(testUserData.password, 10)
  const user = new User({ username: testUserData.username, passwordHash })
  
  return await user.save();
}

export const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

export const getBlogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

export const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}
