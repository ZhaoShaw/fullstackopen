const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const result = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1, id:1 })
  response.json(result)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: 'username or password minLength is 3'
    })
  }
  const existingUser = await User.findOne({ username: username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username,
    name,
    passwordHash
  })

  const result = await user.save()
  response.status(201).json(result)
})

module.exports = usersRouter