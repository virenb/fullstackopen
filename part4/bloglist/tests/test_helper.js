const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Santa Claus',
    url: 'north.pole',
    likes: 1
  },
  {
    title: 'CSS is hard',
    author: 'Santa Claus',
    url: 'north.pole/css',
    likes: 1
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'Testing out something', author: 'Hilo Goodbye', url: 'hello.com/abc', likes: 0 })
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

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb

}