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


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}