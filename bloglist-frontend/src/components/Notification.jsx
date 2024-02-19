export const NOTIFICATION_STATE = {
  ERROR: 'error',
  SUCCESS: 'success'
}

const Notification = ({ notification }) => {
  if (!notification.message) {
    return null
  }

  return (
    <div
      className="notification"
      style={{
        color:notification.type === NOTIFICATION_STATE.ERROR ? 'red' : 'green'
      }}
    >
      {notification.message}
    </div>
  )
}

export default Notification
