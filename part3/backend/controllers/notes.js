const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.post('/', async (request, response) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  const savedNote = await note.save();
  response.status(201).json(savedNote);
});

notesRouter.put('/:id', async (request, response) => {
  const { content, important } = request.body;
  const updatedNoted = await Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  );
  response.json(updatedNoted);
});

notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id);
  if(note){
    response.json(note);
  } else {
    response.status(404).end();
  }
});

notesRouter.delete('/:id', async (request, response) => {
  await Note.findOneAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = notesRouter;