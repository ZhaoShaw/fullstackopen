import { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createNewBlog = (event) => {
    event.preventDefault()
    createBlog({
      title, author, url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNewBlog}>
        <div>
            title:<input
            id='new-blog-title'
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
            author:<input
            id='new-blog-author'
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
            url:<input
            id='new-blog-url'
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button id='new-blog-create' type='submit'>create</button>
      </form>
    </div>
  )
}

NewBlog.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default NewBlog