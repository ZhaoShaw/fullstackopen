import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link, useNavigate } from 'react-router-dom'
const Menu = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(setNotification('Logged out', 5))
    navigate('/')
  }
  return (
    <div className='flex justify-start bg-blue-300 p-8 tracking-wide'>
      <Link className='ml-4 text-3xl uppercase hover:text-blue-100 ' to='/blogs'>
        blogs
      </Link>
      <Link className='ml-4 text-3xl uppercase hover:text-blue-100' to='/users'>
        users
      </Link>
      {user === null && (
        <Link className='ml-auto mr-4 text-3xl uppercase hover:text-blue-100' to='/login'>
          login
        </Link>
      )}
      {user !== null && (
        <div className='ml-auto mr-4 flex text-xl'>
          <p className='mr-4 italic leading-relaxed text-blue-500'>{user.username} logged in</p>
          <button className='uppercase hover:text-blue-100' onClick={handleLogout}>
            logout
          </button>
        </div>
      )}
    </div>
  )
}

export default Menu
