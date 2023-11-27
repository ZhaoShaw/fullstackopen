const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  let blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1
  })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const result = await Blog.findById(request.params.id)
    .populate('user', {
      username: 1,
      name: 1,
      id: 1
    })
    .populate('comments', {
      content: 1,
      id: 1
    })
  response.json(result)
})

blogsRouter.post(
  '/',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const body = request.body
    const user = request.user
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
    let result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
  }
)

blogsRouter.delete(
  '/:id',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user
    const findBlog = await Blog.findById(request.params.id)
    if (findBlog.user.toString() === user.id) {
      await Blog.findByIdAndDelete(request.params.id)
      await Comment.deleteMany({ blog: request.params.id })
      const newBlogs = user.blogs.filter(
        (blog) => blog.toString() !== request.params.id
      )
      await User.findByIdAndUpdate(
        user.id,
        { blogs: newBlogs },
        { new: true, runValidators: true }
      )
      response.status(204).end()
    } else {
      response.status(401).json({
        error: 'invalid user'
      })
    }
  }
)

blogsRouter.put('/:id', async (request, response) => {
  let result = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: request.body.likes },
    { new: true, runValidators: true, context: 'query' }
  ).populate('user', {
    username: 1,
    name: 1,
    id: 1
  })
  response.json(result)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const findBlog = await Blog.findById(request.params.id)
  const comment = new Comment({
    content: body.content,
    blog: request.params.id
  })
  let result = await comment.save()
  findBlog.comments = findBlog.comments.concat(result._id)
  await findBlog.save()
  response.status(201).json(result)
})

module.exports = blogsRouter
