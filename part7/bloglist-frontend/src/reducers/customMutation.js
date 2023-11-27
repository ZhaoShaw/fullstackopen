import { getHeaderAuth } from '../services/blogs'
import { useSelector, useDispatch } from 'react-redux'
export const useCustomMutation = (mutationFn, successFn) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  return {
    mutationFn: (params) => {
      return mutationFn({ params, headers: getHeaderAuth(user) })
    },
    onSuccess: (args) => {
      dispatch(successFn(args))
    },
  }
}
