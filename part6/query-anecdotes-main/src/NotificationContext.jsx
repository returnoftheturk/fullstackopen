import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION': {
      return action.payload
    };
    case 'CLEAR_NOTIFICATION': 
    default:
      return ''
  }
}

const NotificationContext = createContext();

export const useNoticationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, '');
  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}
