const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const mongoose = require('mongoose')
const config = require('../utils/config')
const helper = require('./user_test_helper')

beforeEach(async() => {
  await mongoose.connect(config.MONGODB_URI)
  await User.deleteMany({})
  const promiseArray = helper.initialUsers.map(u => {
    return api.post('/api/users').send(u)
  })
  await Promise.all(promiseArray)
}, 1000000)

describe('invalid user create check', () => {
  test('invaild username', async() => {
    const user = {
      username: 'al',
      name: 'all',
      password: '123'
    }
    const res = await api.post('/api/users')
      .send(user)
      .expect(400)
    expect(res.body.error).toBe('username or password minLength is 3')
  })

  test('invalid password', async() => {
    const user = {
      username: 'all',
      name: 'all',
      password: '12'
    }
    const res = await api.post('/api/users')
      .send(user)
      .expect(400)
    expect(res.body.error).toBe('username or password minLength is 3')
  })

  test('unique username', async() => {
    const user = {
      username: 'Alex',
      name: 'all',
      password: '123'
    }
    const res = await api.post('/api/users')
      .send(user)
      .expect(400)
    expect(res.body.error).toBe('username must be unique')
  })
})

afterAll(() => {
  mongoose.connection.close()
})