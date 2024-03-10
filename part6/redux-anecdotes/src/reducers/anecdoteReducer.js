import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToIncrement = state.find(n => n.id === id)
      const changedAnecdote = { 
        ...anecdoteToIncrement, 
        votes: anecdoteToIncrement.votes + 1 
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    }
  }
})

export const {voteAnecdote, createAnecdote, setAnecdotes} = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
