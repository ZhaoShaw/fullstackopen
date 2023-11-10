const _ = require('lodash')

describe('most likes', () => {
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
  test('find most likes', () => {
    const mostLikes = {
      author: 'Edsger W. Dijkstra',
      likes: 18
    }
    const findMostLikes = _.chain(listBlogs)
      .groupBy('author')
      .reduce((result, value, key) => {
        let likes = _.chain(value)
          .countBy('likes')
          .keys()
          .map(_.parseInt)
          .sum()
          .value()
        result[key] = likes
        return result
      }, {})
      .reduce((result, value, key) => {
        if (result['likes'] < value ) {
          result['likes'] = value
          result['author'] = key
        }
        return result
      }, { author: '', likes: 0 })
      .value()
    console.log(findMostLikes)
    expect(findMostLikes).toEqual(mostLikes)
  })
})