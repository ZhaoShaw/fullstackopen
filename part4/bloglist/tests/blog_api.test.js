const mongoose = require('mongoose')
const supertest =  require('supertest')
const app = require('../app')
const api  = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')

let token

beforeEach(async () => {
  await mongoose.connect(config.MONGODB_URI)
  await Blog.deleteMany({})
  await User.deleteMany({})
  const user = await helper.initialUserDbFormat()
  const userPromise =  await new User(user).save()
  const blogObjects = helper.initialBlogs.map(blog => {
    blog.user = userPromise._id
    return new Blog(blog)
  })
  const blogsPromise = blogObjects.map(blog => blog.save())
  const all = await Promise.all(blogsPromise)
  const newBlogs = all.map(blog => blog._id)
  await User.findByIdAndUpdate(userPromise._id, { blogs: newBlogs },  { new: true, runValidators:true })
  const userForToken = {
    username: user.username,
    id: userPromise._id
  }
  token = await jwt.sign(userForToken, process.env.SECRET)
  token = 'Bearer ' + token
}, 1000000)

describe('get blogs tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', token)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 1000000)

  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', token)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response =  await api
      .get('/api/blogs')
      .set('Authorization', token)
    const titles = response.body.map(r => r.title)
    expect(titles).toContain('Go To Statement1')
  })

  test('blog has id property', async () => {
    const response =  await api
      .get('/api/blogs')
      .set('Authorization', token)
    expect(response.body[0].id).toBeDefined()
  })
})

test('new blog added check', async () => {
  const newBlog = {
    title: 'You knew World',
    author: 'Alex',
    url: 'https://hello.com',
    likes: 66
  }
  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response =  await api
    .get('/api/blogs')
    .set('Authorization', token)
  const titles =  response.body.map(r => r.title)
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain('You knew World')
})

test('new blog added without token', async () => {
  const newBlog = {
    title: 'You knew World',
    author: 'Alex',
    url: 'https://hello.com',
    likes: 77
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

test('new blog lack likes property', async () => {
  const newBlog = {
    title: 'You knew World1',
    author: 'Alex',
    url: 'https://hello.com'
  }
  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response =  await api
    .get('/api/blogs')
    .set('Authorization', token)
  const findBlog =  response.body.find(r => r.title === 'You knew World1')
  expect(findBlog.likes).toBe(0)
})


test('new blog lack title or url property', async () => {
  const newBlog = {
    title: 'You knew World2',
    author: 'Alex'
  }
  await api
    .post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    .expect(400)
})

test('delete blog by id', async () => {
  let response = await api
    .get('/api/blogs')
    .set('Authorization', token)
  let findBlog  = response.body.find(blog => blog.title === 'Go To Statement1')
  await api
    .delete(`/api/blogs/${findBlog.id}`)
    .set('Authorization', token)
    .expect(204)
})

test('update blog likes by id', async () => {
  let response = await api
    .get('/api/blogs')
    .set('Authorization', token)
  let findBlog  = response.body.find(blog => blog.title === 'Go To Statement2')
  let result = await api
    .put(`/api/blogs/${findBlog.id}`)
    .set('Authorization', token)
    .send({ likes: 9888 })
  expect(result.body.likes).toBe(9888)
})

afterAll(() => {
  mongoose.connection.close()
})