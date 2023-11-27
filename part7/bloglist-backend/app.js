const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const testingRouter = require('./controllers/testing')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

// if (process.env.NODE_ENV !== 'test') {
logger.info('connecting to', config.MONGODB_URI)
const connectDb = async () => {
  await mongoose.connect(config.MONGODB_URI)
}
connectDb()
// }

app.use(cors())
app.use(express.json())
// app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)

module.exports = app
