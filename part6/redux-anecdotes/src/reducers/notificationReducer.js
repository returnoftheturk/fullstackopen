import { createSlice } from "@reduxjs/toolkit"
import { getId } from '../utils'

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

export const setNotification = (content, timeout) => {
  return async (dispatch) => {
    const notificationId = getId();
    dispatch(addNotification({content, id: notificationId}))
    setTimeout(() => {
      dispatch(clearNotification(notificationId))
    }, timeout * 1000);
  }
}
export default notificationSlice.reducer;
