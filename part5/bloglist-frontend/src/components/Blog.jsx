import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, updateLikes, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const showBlogDetail = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLikes = () => {
    const data = {
      likes: blog.likes + 1
    }
    updateLikes(blog, data)
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog)
    }
  }

  return (
    <div style={blogStyle}>
      <div className='default-show'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div className='default-hide' style={showBlogDetail}>
        <div>{blog.url}</div>
        <div>
        likes: {blog.likes}
          <button id='like-button' onClick={addLikes}>like</button>
        </div>
        {user.username === blog.user.username
          ? <button id='remove-button' onClick={removeBlog}>remove</button>
          : null
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog