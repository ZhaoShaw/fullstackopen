import axios from 'axios'
const baseUrl = '/api/users'

export const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

export const getUserById = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}
