import { createSlice } from '@reduxjs/toolkit'
import { getBlogById, updateLikes, addBlogComment } from '../services/blogs'
import { useCustomMutation } from './customMutation'

const blogSlice = createSlice({
  name: 'blog',
  initialState: null,
  reducers: {
    setBlogAct(state, action) {
      return action.payload
    },
    updateBlogAct(state, action) {
      return action.payload
    },
    addCommentAct(state, action) {
      const newComment = action.payload
      state.comments.push(newComment)
    },
  },
})

export const { setBlogAct, updateBlogAct, addCommentAct } = blogSlice.actions

export const setBlogMutation = () => {
  return useCustomMutation(getBlogById, setBlogAct)
}

export const likesMutation = () => {
  return useCustomMutation(updateLikes, updateBlogAct)
}

export const addBlogCommentMutation = () => {
  return useCustomMutation(addBlogComment, addCommentAct)
}

export default blogSlice.reducer
