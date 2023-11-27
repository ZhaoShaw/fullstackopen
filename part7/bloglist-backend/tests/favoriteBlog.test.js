const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
  const listBlogs = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 7
    }
  ]
  test('find most likes blog', () => {
    const mostLikesBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 7
    }
    const result = listHelper.favoriteBlog(listBlogs)
    expect(result).toEqual(mostLikesBlog)
  })
})
