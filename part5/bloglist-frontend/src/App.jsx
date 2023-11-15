import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [message, setMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const loginFormRef = useRef()

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user !== null)
      getAllBlogs()
  }, [user])

  const getAllBlogs = async () => {
    const blogs = await blogService.getAll()
    await blogs.sort((a,b) => b.likes - a.likes)
    setBlogs( blogs )
  }

  const handleLogin = async (user) => {
    try {
      loginFormRef.current.toggleVisibility()
      const res = await loginService.login(user)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(res)
      )
      blogService.setToken(res.token)
      setUser(res)
      setMessage(`${res.username} Logged in`)
      notificationReset()
      getAllBlogs()
    } catch (exception) {
      setMessage('Wrong credentials')
      notificationReset()
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setBlogs([])
    setMessage('Logged out')
    notificationReset()
    blogService.setToken('')
  }

  const notificationReset = () => {
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const createNewBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const res = await blogService.createNewBlog(newBlog)
      setBlogs(blogs.concat(res))
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added!`)
      notificationReset()
    } catch (exception) {
      setMessage('Create Failed!')
      notificationReset()
    }
  }

  const addLikes = async (blog, data) => {
    await blogService.updateLikes(blog, data)
    const blogs = await blogService.getAll()
    await blogs.sort((a,b) => b.likes - a.likes)
    setBlogs( blogs )
  }

  const deleteBlog = async (blog) => {
    await blogService.deleteBlog(blog)
    const blogs = await blogService.getAll()
    await blogs.sort((a,b) => b.likes - a.likes)
    setBlogs( blogs )
    setMessage(`Remove blog ${blog.title} by ${blog.author}`)
    notificationReset()
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={ message }></Notification>
      {user === null && (
        <Togglable buttonLabel='login in' ref={loginFormRef}>
          <LoginForm
            userlogin={handleLogin}
          >
          </LoginForm>
        </Togglable>
      )}
      {user !== null && (
        <div>
          <div>{`${user.username} logged in`}
            <button onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <NewBlog
              createBlog={createNewBlog}
            ></NewBlog>
          </Togglable>
        </div>
      )}
      <div id='blog-list'>
        {user !== null && blogs.map(blog =>
          <Blog key={blog.id}
            user={user}
            blog={blog}
            updateLikes={addLikes}
            deleteBlog={deleteBlog}
          />
        )}
      </div>
    </div>
  )
}

export default App