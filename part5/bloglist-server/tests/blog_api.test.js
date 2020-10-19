const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')
const { getToken } = require('./test_helper')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const rootUser = new User({ username: 'root', passwordHash, blogs: []})
  await rootUser.save()
  const userId = rootUser._id.toString()

  await Blog.deleteMany({})

  let blogObject1 = new Blog(helper.initialBlogs[0])
  blogObject1.user = userId
  await blogObject1.save()
  rootUser.blogs.push(blogObject1)
  let blogObject2 = new Blog(helper.initialBlogs[1])
  blogObject2.user = userId
  await blogObject2.save()
  rootUser.blogs.push(blogObject2)
  
  await rootUser.save()
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
    expect(titles).toContain('HTML is fun')
  })  

  test('each post has a unique id', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(r => r.id)
    expect(ids).toBeDefined()
  })
})


describe('creating blogs', () => {
  test ('a valid blog can be added', async () => {
    const user = await helper.userInDb()
    const token = helper.getToken(user)

    const newBlog = {
      title: 'Testing is still fun, kind of?',
      author: 'virenb',
      url: 'virenb.cc/testing-eh',
      likes: 111
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: `bearer ${token}` })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)  
  })

  test('creating a blog with no token shows 401', async () => {
    const newBlog = {
      title: 'Testing is still fun, kind of?',
      author: 'virenb',
      url: 'virenb.cc/testing-eh',
      likes: 111
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  test('new blog entry with missing properties is not added', async () => {
    const user = await helper.userInDb()
    const token = helper.getToken(user)

    const blogWithMissingInfo = {
      title: 'Testing is still fun, kind of?',
      likes: 111
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: `bearer ${token}` })
      .send(blogWithMissingInfo)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const user = await helper.userInDb()
    const token = helper.getToken(user)
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: `bearer ${token}` })
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const title = blogsAtEnd.map(r => r.title)

    expect(title).not.toContain(blogToDelete.title)
  })

  test('cannot delete a blog without a token', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('cannot delete blog with wrong token', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    const user = await helper.userInDb()
    const token = getToken(user)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: `bearer ${token + 'making this a bad token'}` })
      .expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})