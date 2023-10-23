export const Notification = ({ notification }) => {
  if (!notification?.message?.length) {
    return null;
  }

  const style = {
    color: notification?.isError ? 'red' : 'green'  
  };

  return <div className="error" style={style} >{notification.message}</div>;
};
