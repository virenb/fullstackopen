const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
  try{
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response) => {
  try {
    const decodedToken = await jwt.verify(request.token, process.env.SECRET)
    request.decodedToken = decodedToken
  } catch (error) {
    request.decodedToken = null
  }
  if (!request.token || !request.decodedToken) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(request.decodedToken.id)

  const blog = new Blog({
    title: request.body.title,
    url: request.body.url,
    likes: request.body.likes,
    author: request.body.author,
    user: user._id
  })

  if (!blog.title || !blog.url || !blog.author) {
    response.status(400).json({ error: 'incomplete submission' })
  }
  else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
  
    await user.save()
  
    response.status(201).json(savedBlog.toJSON())
  }

})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => next(error))

})

blogsRouter.delete('/:id', async (request, response, next) => {
  const body = request.body
  if (!body.token) {
    console.log('not logged in')
  }
  if (body.token) {
    try {
      console.log(request)
      let hi = await Blog.findById(request.params.id)
      if (hi.user == body.username) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
      }
      else {
        return response.status(401).json({ error: 'u not the user' })
      }
    }
    catch (exception) {
      next(exception)
    }
  }
})

module.exports = blogsRouter