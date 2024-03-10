import { useSelector } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const notifications = useSelector(state => state.notification);
  return (
    <div>
      {notifications.map(notification => 
        <Notification
          content={notification.content}
          key={notification.id}
        />
      )}
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App
