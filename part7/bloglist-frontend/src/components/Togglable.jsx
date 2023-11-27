import { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // useImperativeHandle(ref, () => {
  //   return {
  //     toggleVisibility,
  //   }
  // })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button
          className='transform
           rounded-2xl bg-blue-300/50 p-4 tracking-wide
           transition hover:-translate-y-0.5 hover:text-white'
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </button>
      </div>
      <div className=' bg-blue-300' style={showWhenVisible}>
        {props.children}
        <button className='btn-custom ml-4' onClick={toggleVisibility}>
          cancel
        </button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
