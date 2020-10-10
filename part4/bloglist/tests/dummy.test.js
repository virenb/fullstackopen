const listHelper = require('../utils/list_helper')

describe('dummy test', () => {
  test('dummy returns 1', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
}) 

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const blogs = [ 
    { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 },
    { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 },
    { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 }    
  ]

  const emptyList = []

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has no entries, return 0', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  test('when list has multiple entries, return sum', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(24)
  })
})

describe('most liked blog', () => {
  const blogs = [ 
    { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 },
    { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 },
    { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 }    
  ]

  test('when list has multiple entries, return sum', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toBe(blogs[2])
  })

  const blog1 = {
    title: 'I love testing',
    author: 'virenb',
    likes: 50
  }
  const blog2 = {
    title: 'Testing is awesome',
    author: 'bhi',
    likes: 49
  }

  test('blog1 has more likes than blog2', () => {
    const result = listHelper.favoriteBlog([blog1, blog2])
    expect(result).toEqual(blog1)
  })

})

describe('author with the most blos', () => {
  const blogs = [ 
    { title: 'React patterns', author: 'Michael Chan', likes: 7 },
    { title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', likes: 5 },
    { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', likes: 12},
    { title: 'Testing is the best', author: 'bhi', likes: 100 },
    { title: 'Testing is awesome', author: 'bhi', likes: 10203 },
    { title: 'Testing makes you a good dev', author: 'bhi', likes: 3 },
    { title: 'We need more tests', author: 'bhi', likes: 11230 },
    { title: 'Jest, the Best', author: 'bhi', likes: 2 }    
  ]

  test('find author who has the most blog posts', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({ author: 'bhi', blogs: 5 })
  })


})


// describe('author with most likes', () => {
//   const blogs = [ 
//     { title: 'React patterns', author: 'Michael Chan', likes: 7 },
//     { title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', likes: 5 },
//     { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', likes: 12},
//     { title: 'Hello World', author: 'Michael Chan', likes: 10 }    
//   ]

//   test('when multiple blogs, return author with most likes on all blogs summed', () => {
//     const result = listHelper.mostLikes(blogs)
//     expect(result).toEqual({ 'author': 'Michael Chan', 'likes': 17 })
//   })

// })