import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import { initialBlogsMutation } from '../reducers/blogListReducer'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const initialBlogMutate = useMutation(initialBlogsMutation())
  useEffect(() => {
    initialBlogMutate.mutate()
  }, [])
  const blogs = useSelector((state) => state.blogList)

  return (
    <div className='card-custom' id='blog-list'>
      {blogs.map((blog) => (
        <div
          className='transform text-2xl 
          transition hover:-translate-y-0.5 hover:text-white'
          key={blog.id}
        >
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
