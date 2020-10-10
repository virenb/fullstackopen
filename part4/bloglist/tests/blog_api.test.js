const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blog list returned correctly', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are four notes', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(0)
})

afterAll(() => {
  mongoose.connection.close()
})