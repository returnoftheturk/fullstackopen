import express from 'express';
import Blog from '../models/blog.js';

const blogsRouter = express.Router();

blogsRouter.get('/', async (request, response) => {
  const user = request.user;
  const blogs = await Blog
    .find({user: user.id}).populate('user', { username: 1, name: 1, passwordHash: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user;

  const blog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    user: user._id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog);
  await user.save()

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user;
  const blog = await Blog.findById(request.params.id);

  if(!(blog.user.toString() === user.id.toString())) {
    return response.status(401).json({error: 'Blog can only be deleted by user who created it'})
  }

  await Blog.deleteOne({_id: blog._id});
  response.status(204).end();
})

blogsRouter.put('/:id', async (request, response) => {
  const user = request.user;

  const { likes } = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    { _id: request.params.id, user: user._id },
    { likes },
    { new: true, runValidators: true, context: 'query'}
  );
  response.json(updatedBlog);
})

export default blogsRouter;