import bcrypt from 'bcrypt';
import express from 'express';
import User from '../models/user.js'

const usersRouter = express.Router();

usersRouter.get('/', async (_request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, url: 1, likes: 1, author: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;
  if(!password || password.length < 3){
    return response.status(400).json({error: 'Password must have minimum length of 3'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

export default usersRouter;
