import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    addNotification: (state, action) => {
      const {content, id} = action.payload
      state.push({
        id,
        content
      })
    },
    clearNotification: (state, action) => {
      const id = action.payload;
      return state.filter(n => n.id != id)
    }
  }
})

export const { addNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
