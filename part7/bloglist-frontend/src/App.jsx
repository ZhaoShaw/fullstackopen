import { useEffect } from 'react'
import Menu from './components/Menu'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import NewBlog from './components/BlogForm'
import UserBlog from './components/UserBlog'
import Blog from './components/Blog'
import { setLoginUser } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import { Route, Routes, useMatch, Navigate } from 'react-router-dom'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const matchUserId = useMatch('/users/:id')
  const matchBlogId = useMatch('/blogs/:id')

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      dispatch(setLoginUser(user))
    }
  }, [])

  return (
    <div>
      <Menu />
      <Notification />
      <Routes>
        <Route path='/users/:id' element={matchUserId && <UserBlog id={matchUserId.params.id} />} />
        <Route path='/blogs/:id' element={matchBlogId && <Blog id={matchBlogId.params.id} />} />
        <Route path='/login' element={user === null && <LoginForm />} />
        <Route
          path='/blogs'
          element={
            <div>
              {user !== null && <NewBlog />}
              <BlogList />
            </div>
          }
        />
        <Route path='/users' element={<UserList />} />
        <Route path='/' element={<Navigate to='/blogs' />} />
      </Routes>
    </div>
  )
}

export default App
