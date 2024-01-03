const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes);
  });
});

notesRouter.post('/', (request, response, next) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then(savedNote => {
    response.json(savedNote);
  }).catch(next);
});

notesRouter.put('/:id', (request, response, next) => {
  const { content, important } = request.body;

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updateNote => {
      response.json(updateNote);
    })
    .catch(next);
});

notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id).then(note => {
    if(note){
      response.json(note);
    } else {
      response.status(404).end();
    }
  }).catch(next);
});

notesRouter.delete('/:id', (request, response, next) => {
  Note.findOneAndDelete(request.params.id).then(() => {
    response.status(204).end();
  })
    .catch(next);
});

module.exports = notesRouter;