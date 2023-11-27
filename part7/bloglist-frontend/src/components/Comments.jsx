import { addBlogCommentMutation } from '../reducers/blogReducer'
import { useMutation } from 'react-query'
const Comments = ({ blogId, comments }) => {
  const addCommentMutate = useMutation(addBlogCommentMutation())
  const handleComment = (event) => {
    event.preventDefault()
    addCommentMutate.mutate({ id: blogId, content: event.target.comment.value })
    event.target.comment.value = ''
  }
  return (
    <div className='card-custom'>
      <h2>comments</h2>
      <form onSubmit={handleComment}>
        <input className='input-custom' name='comment' />
        <button className='btn-custom mt-4' type='submit'>
          add comment
        </button>
      </form>
      {comments.length !== 0 && (
        <ul className='text-2xl font-normal text-gray-700'>
          {comments.map((comment) => (
            <li className='mt-3' key={comment.id}>
              {comment.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Comments
