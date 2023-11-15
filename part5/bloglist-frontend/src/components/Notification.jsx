const Notification = ({ message }) => {
  if (message === null ) return null

  return (
    <div>
      <div className="notification">
        {message}
      </div>
    </div>
  )
}

export default Notification