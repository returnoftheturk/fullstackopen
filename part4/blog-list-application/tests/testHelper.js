import Blog from '../models/blog';

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
