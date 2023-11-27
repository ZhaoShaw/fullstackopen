import axios from 'axios'
const baseUrl = '/api/blogs'

export const getHeaderAuth = (user) => {
  if (user === null) {
    return { headers: { Authorization: `Bearer ` } }
  }
  return {
    headers: { Authorization: `Bearer ${user.token}` },
  }
}

export const getAll = async ({ headers }) => {
  const response = await axios.get(baseUrl, headers)
  return response.data
}

export const getBlogById = async ({ headers, ...args }) => {
  const response = await axios.get(`${baseUrl}/${args.params}`, headers)
  return response.data
}

export const createNewBlog = async ({ headers, ...args }) => {
  const response = await axios.post(baseUrl, args.params, headers)
  return response.data
}

export const updateLikes = async ({ headers, ...args }) => {
  const newBlog = {
    ...args.params,
    likes: args.params.likes + 1,
  }
  const response = await axios.put(`${baseUrl}/${args.params.id}`, newBlog, headers)
  return response.data
}

export const deleteBlog = async ({ headers, ...args }) => {
  const response = await axios.delete(`${baseUrl}/${args.params.id}`, headers)
  return { ...response.data, id: args.params.id }
}

export const addBlogComment = async ({ headers, ...args }) => {
  const response = await axios.post(`${baseUrl}/${args.params.id}/comments`, args.params, headers)
  return response.data
}
