const _ = require('lodash')
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0 ? 0
    : blogs.length === 1 ? blogs[0].likes
      : blogs.reduce( ( sum , cur ) => sum + cur.likes , 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((a, b) => a.likes > b.likes ? a : b)
}

const mostBlogs = (blogs) => {
  let counted = _.countBy(blogs, 'author')
  let countedResult = _.map(counted, (v, k) => ({ author: k, blogs: v }))
  let sorted = _.orderBy(countedResult, ['blogs'], ['desc'])
  return sorted[0]
}

const mostLikes = (blogs) => {
  let sorted = _(blogs).groupBy('author').map((objs, key) => ({
    'author': key,
    'likes': _.sumBy(objs, 'likes') }))
    .value()
  return sorted[0]
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}