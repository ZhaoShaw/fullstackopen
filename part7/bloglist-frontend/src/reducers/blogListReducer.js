import { createSlice } from '@reduxjs/toolkit'
import { getAll, deleteBlog, createNewBlog } from '../services/blogs'
import { useCustomMutation } from './customMutation'

const blogListSlice = createSlice({
  name: 'blogList',
  initialState: [],
  reducers: {
    setBlogsAct(state, action) {
      return action.payload
    },
    removeBlogAct(state, action) {
      const removedBlog = action.payload
      return state.filter((blog) => blog.id !== removedBlog.id)
    },
    createBlogAct(state, action) {
      const newBlog = action.payload
      return state.concat(newBlog)
    },
  },
})

export const { setBlogsAct, removeBlogAct, createBlogAct } = blogListSlice.actions

export const initialBlogsMutation = () => {
  return useCustomMutation(getAll, setBlogsAct)
}

export const removeMutation = () => {
  return useCustomMutation(deleteBlog, removeBlogAct)
}

export const createBlogMutation = () => {
  return useCustomMutation(createNewBlog, createBlogAct)
}

export default blogListSlice.reducer
