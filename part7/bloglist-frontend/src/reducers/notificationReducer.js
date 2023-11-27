import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotificationAct: (state, action) => {
      return action.payload
    },
  },
})

export const { showNotificationAct } = notificationSlice.actions

export const setNotification = (message, sec = 5) => {
  return (dispatch) => {
    dispatch(showNotificationAct(message))
    setTimeout(() => {
      dispatch(showNotificationAct(null))
    }, sec * 1000)
  }
}

export default notificationSlice.reducer
