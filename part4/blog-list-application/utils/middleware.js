import { info, logError } from './logger.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'

export const requestLogger = (request, response, next) => {
  info('Method:', request.method);
  info('Path:  ', request.path);
  info('Body:  ', request.body);
  info('---');
  next();
};

export const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  next();
};

export const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id);
  if(!user) {
    next(new Error('Could not find user'));
  };

  request.user = user;
  next();
};

export const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};


export const errorHandler = (error, request, response, next) => {
  logError(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  }

  next(error); 
};
