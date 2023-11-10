const jwt = require('jsonwebtoken')
const User = require('../models/user')

const errorHandler = (error, request, response, next) => {
//   console.log(error.name)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  if (error.name === 'JsonWebTokenError') {
    return response.status(401).send({ error: error.message })
  }
  next(error)
}

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization &&
      authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const tokenExtractor = (request, response, next) => {
  const token = getTokenFrom(request)
  request['token'] = token
  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  const user = await User.findById(decodedToken.id)
  request['user'] = user
  next()
}

module.exports = { errorHandler, tokenExtractor, userExtractor }