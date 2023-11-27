import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notification)

  if (message === null) return null

  return (
    <div>
      <div className='border-gray-300 bg-gray-300 p-5 text-gray-700'>{message}</div>
    </div>
  )
}

export default Notification
