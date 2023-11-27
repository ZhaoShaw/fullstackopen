import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useMutation } from 'react-query'
import { removeMutation } from '../reducers/blogListReducer'
import { setBlogMutation, likesMutation } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'
import Comments from './Comments'

function Blog({ id }) {
  const user = useSelector((state) => state.user)
  const blog = useSelector((state) => state.blog)
  const dispatch = useDispatch()
  const initialBlogMutate = useMutation(setBlogMutation())
  const likesMutate = useMutation(likesMutation())
  const removeMutate = useMutation(removeMutation())
  const navigate = useNavigate()

  useEffect(() => {
    initialBlogMutate.mutate(id)
  }, [id])

  if (blog === null) return null

  const addLikes = () => {
    likesMutate.mutate(blog)
  }
  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeMutate.mutate(blog)
      dispatch(setNotification(`Remove blog ${blog.title} by ${blog.author}`, 5))
      navigate('/')
    }
  }

  return (
    <div>
      <div className='card-custom'>
        <h2>{blog.title}</h2>
        <div className='font-normal'>{blog.url}</div>
        <div className='font-normal'>
          {blog.likes} likes
          <button className='btn-custom ml-4' id='like-button' onClick={addLikes}>
            like
          </button>
        </div>
        <div className='font-normal'>added by {blog.author} </div>
        {user && user.username === blog.user.username ? (
          <button className='btn-custom w-fit' id='remove-button' onClick={removeBlog}>
            remove
          </button>
        ) : null}
      </div>
      <Comments blogId={blog.id} comments={blog.comments} />
    </div>
  )
}

export default Blog
