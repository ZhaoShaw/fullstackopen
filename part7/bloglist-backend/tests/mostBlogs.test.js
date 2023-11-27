const _ = require('lodash')

describe('most blogs', () => {
  const listBlogs = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Alex',
      likes: 5
    },
    {
      title: 'Go To Statement Considered Harmful -1',
      author: 'Edsger W. Dijkstra',
      likes: 7
    },
    {
      title: 'Go To Statement Considered Harmful -2',
      author: 'Edsger W. Dijkstra',
      likes: 8
    },
    {
      title: 'Go To Statement Considered Harmful -3',
      author: 'Edsger W. Dijkstra',
      likes: 3
    }
  ]
  test('find most blogs', () => {
    const mostBlog = {
      author: 'Edsger W. Dijkstra',
      blogs: 3
    }
    const findMostBlog = _.chain(listBlogs)
      .countBy('author')
      .reduce(
        (result, value, key) => {
          if (result['blogs'] < value) {
            result['blogs'] = value
            result['author'] = key
          }
          return result
        },
        { author: '', blogs: 0 }
      )
      .value()
    expect(findMostBlog).toEqual(mostBlog)
  })
})
