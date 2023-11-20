import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    return action.payload
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [message, messageDispatch] = useReducer(notificationReducer, null)
    return (
        <NotificationContext.Provider value={[message, messageDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext