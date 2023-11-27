import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { getUserById } from '../services/users'
const UserBlog = ({ id }) => {
  const [user, setUser] = useState(null)
  const initialUserMutation = useMutation({
    mutationFn: getUserById,
    onSuccess: (res) => {
      setUser(res)
    },
  })

  useEffect(() => {
    initialUserMutation.mutate(id)
  }, [])

  if (user === null) return null

  return (
    <div className='card-custom'>
      <h2 className='text-4xl'>{user.username}</h2>
      <h3>added blogs</h3>
      <ul className='text-xl font-normal'>
        {user.blogs.map((blog) => (
          <li className='mt-3' key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserBlog
