import { useState } from 'react'
import { useMutation } from 'react-query'
import { createBlogMutation } from '../reducers/blogListReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import Togglable from './Togglable'

const NewBlog = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()
  const createBlogMutate = useMutation(createBlogMutation())

  const createNewBlog = (event) => {
    event.preventDefault()
    try {
      createBlogMutate.mutate({ title, author, url })
      dispatch(setNotification(`a new blog ${title} by ${author} added!`, 5))
    } catch (exception) {
      dispatch(setNotification('Create Failed!', 5))
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className='fixed bottom-2 left-2 z-10'>
      <Togglable buttonLabel='new blog'>
        <div className='flex min-w-[30vw] flex-col bg-blue-300 px-4 pt-4'>
          <form onSubmit={createNewBlog}>
            <div>
              title
              <input
                className='input-custom'
                id='new-blog-title'
                type='text'
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              author
              <input
                className='input-custom'
                id='new-blog-author'
                type='text'
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              url
              <input
                className='input-custom'
                type='text'
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <button className='btn-custom' id='new-blog-create' type='submit'>
              create
            </button>
          </form>
        </div>
      </Togglable>
    </div>
  )
}

export default NewBlog
