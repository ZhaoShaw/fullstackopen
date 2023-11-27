import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { getAll } from '../services/users'
import { Link } from 'react-router-dom'

const UserList = () => {
  const [userList, setUserList] = useState([])

  const initialUserListMutation = useMutation({
    mutationFn: getAll,
    onSuccess: (users) => {
      setUserList(users)
    },
  })

  useEffect(() => {
    initialUserListMutation.mutate()
  }, [])

  return (
    <div className='card-custom'>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <th>
                <Link
                  className='transform transition hover:-translate-y-0.5 hover:text-white'
                  to={`/users/${user.id}`}
                >
                  {user.username}
                </Link>
              </th>
              <th>{user.blogs.length}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
