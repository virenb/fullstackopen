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


describe('when there is initially some blogs saved', () => {
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
})


// 4.9
test('each post has a unique id', async () => {
  const response = await api.get('/api/blogs')

  const ids = response.body.map(r => r.id)
  expect(ids).toBeDefined()
})

// 4.10
test('a valid blog can be added ', async () => {
  const newBlog =   {
    title: 'Testing is still fun, kind of?',
    author: 'virenb',
    url: 'virenb.cc/testing-eh',
    likes: 111
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain(
    'Testing is still fun, kind of?'
  )
})

describe('addition of a new blog', () => {
// 4.11
  test('a new entry with no likes provided will default to ', async () => {
    const newBlog =   {
      title: 'No likes, yet!',
      author: 'virenb',
      url: 'virenb.cc/likes',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const likes = blogsAtEnd.map(n => n.likes)
    expect(likes).toContain(0)
  })

  // 4.12
  test('new blog entry with missing properties is not added', async () => {
    const newBlog = {
      author: 'virenb',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const title = blogsAtEnd.map(r => r.title)

    expect(title).not.toContain(blogToDelete.title)
  })
})


afterAll(() => {
  mongoose.connection.close()
})