const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
  {
    title: 'HTML is fun',
    author: 'Blog Writer',
    url: 'blogs.io/1',
    likes: 1
  },
  {
    title: 'CSS is hard',
    author: 'Blog Writer',
    url: 'blogs.io/2',
    likes: 2
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'Testing out something', author: 'Bob Bob', url: 'hello.com/abc', likes: 0 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const userInDb = async (params) => {
  const user = await User.findOne(params || { username: 'root' })
  return user.toJSON()
}

const getToken = (user) => jwt.sign(user, process.env.SECRET)

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb, getToken, userInDb
}