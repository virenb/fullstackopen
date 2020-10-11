const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blog', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(titles).toContain(
    'HTML is easy'
  )
})

test('each post has a unique id', async () => {
  const response = await api.get('/api/blogs')

  const ids = response.body.map(r => r.id)
  expect(ids).toBeDefined()
})


afterAll(() => {
  mongoose.connection.close()
})