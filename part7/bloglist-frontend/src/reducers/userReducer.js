import { createSlice } from '@reduxjs/toolkit'
import { login } from '../services/login'
import { useDispatch } from 'react-redux'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    loginAct(state, action) {
      return action.payload
    },
    setLoginUserAct(state, action) {
      return action.payload
    },
    logoutAct() {
      return null
    },
  },
})

export const { loginAct, setLoginUserAct, logoutAct } = userSlice.actions

export const loginMutation = () => {
  const dispatch = useDispatch()
  return {
    mutationFn: login,
    onSuccess: (user) => {
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(loginAct(user))
      dispatch(setNotification(`${user.username} Logged in`, 5))
    },
  }
}

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedUser')
    dispatch(logoutAct())
  }
}

export const setLoginUser = (user) => {
  return (dispatch) => {
    dispatch(setLoginUserAct(user))
  }
}

export default userSlice.reducer
