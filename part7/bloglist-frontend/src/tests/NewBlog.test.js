import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlog from '../components/NewBlog'


describe('NewBlog Component', () => {

  test('new blog', async () => {

    const mockCreateBlog = jest.fn()
    const container = render(<NewBlog
      createBlog={mockCreateBlog}
    />).container

    const title = container.querySelector('#new-blog-title')
    const author = container.querySelector('#new-blog-author')
    const url = container.querySelector('#new-blog-url')
    const createButton = screen.getByText('create')

    await userEvent.type(title,'High 111')
    await userEvent.type(author, 'tim')
    await userEvent.type(url, 'http://baidu.com')
    await userEvent.click(createButton)

    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0].title).toBe('High 111')
    expect(mockCreateBlog.mock.calls[0][0].author).toBe('tim')
    expect(mockCreateBlog.mock.calls[0][0].url).toBe('http://baidu.com')
  })
})