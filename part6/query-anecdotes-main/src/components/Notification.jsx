import { useNoticationValue } from '../NotificationContext'

const Notification = () => {
  const notification = useNoticationValue();

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <>
      {
        notification &&
        <div style={style}>
          {notification}
        </div>
      }
    </>
  )
}

export default Notification
