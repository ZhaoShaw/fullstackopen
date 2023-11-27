import blogListReducer from './reducers/blogListReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    blogList: blogListReducer,
    blog: blogReducer,
    user: userReducer,
    notification: notificationReducer,
  },
})

export default store
