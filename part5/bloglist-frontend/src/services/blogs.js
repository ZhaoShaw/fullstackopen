import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getHeaderAuth = () => {
  return {
    headers: { Authorization : token }
  }
}

const getAll = async () => {
  // console.log(getHeaderAuth());
  const response = await axios.get(baseUrl, getHeaderAuth())
  return response.data
}

const createNewBlog = async (blog) => {
  const response = await axios.post(baseUrl, blog, getHeaderAuth())
  return response.data
}

const updateLikes = async (blog ,data) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, data, getHeaderAuth())
  return response.data
}

const deleteBlog = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, getHeaderAuth())
  return response.data
}

export default { setToken, getAll, createNewBlog, updateLikes, deleteBlog }