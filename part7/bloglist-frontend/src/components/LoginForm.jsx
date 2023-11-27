import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from 'react-query'
import { loginMutation } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const loginMutate = useMutation(loginMutation())
  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()
    try {
      loginMutate.mutate({
        username,
        password,
      })
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 5))
    }
    setUsername('')
    setPassword('')
    navigate('/')
  }

  return (
    <form className='m-auto flex max-w-lg flex-col px-4 pt-4' onSubmit={handleLogin}>
      <div>
        username
        <input
          className='input-custom'
          id='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          className='input-custom'
          id='password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button className='btn-custom mt-4' id='login-button' type='submit'>
        login
      </button>
    </form>
  )
}
export default LoginForm
