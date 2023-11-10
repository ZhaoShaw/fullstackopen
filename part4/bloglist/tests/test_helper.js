const Blog = require('../models/blog')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: 'Go To Statement1',
    author: 'Edsger1',
    url: 'https://hello.com',
    likes: 5
  },
  {
    title: 'Go To Statement2',
    author: 'Edsger2',
    url: 'https://hello.com',
    likes: 8
  }
]
const initialUser = {
  username: 'Alex',
  name: 'Alex',
  password: '123456'
}

const initialUserDbFormat = async () => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(initialUser.password, saltRounds)
  return {
    username: initialUser.username,
    name: initialUser.name,
    passwordHash: passwordHash
  }
}


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  initialUser,
  initialUserDbFormat,
  blogsInDb
}