import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'


describe('Blogs Component', () => {
  let container
  const blog = {
    title: 'Go To Statement2',
    author: 'Edsger2',
    url: 'https://hello.com',
    likes: 8,
    user: {
      username:'al'
    }
  }
  const user = {
    username: 'al',
    name: 'all'
  }
  const mockUpdateLikes = jest.fn()
  const mockDeleteBlog = jest.fn()
  beforeEach(() => {
    container = render(<Blog
      blog={blog}
      user={user}
      updateLikes={mockUpdateLikes}
      deleteBlog={mockDeleteBlog}
    />).container
  })


  test('render blog hide', () => {
    const title = screen.getByText('Go To Statement2', { exact: false })
    const author = screen.getByText('Edsger2', { exact: false })
    const showDiv = container.querySelector('.default-show')
    const hideDiv = container.querySelector('.default-hide')

    expect(title).toBeDefined()
    expect(author).toBeDefined()
    expect(showDiv).not.toHaveStyle('display: none')
    expect(hideDiv).toHaveStyle('display: none')
  })

  test('render blog show', async () => {
    const mockUser = userEvent.setup()
    const button = screen.getByText('view')
    await mockUser.click(button)
    const hideDiv = container.querySelector('.default-hide')
    expect(hideDiv).not.toHaveStyle('display: none')
  })


  test('blog likes twice', async () => {
    const mockUser = userEvent.setup()
    const button = screen.getByText('view')
    await mockUser.click(button)

    const likeButton = screen.getByText('like')
    await mockUser.click(likeButton)
    await mockUser.click(likeButton)

    expect(mockUpdateLikes.mock.calls).toHaveLength(2)
  })

})