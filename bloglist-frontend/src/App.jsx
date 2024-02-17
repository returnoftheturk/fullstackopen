import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification, { NOTIFICATION_STATE} from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({author: '', title: '', url: ''});
  const [notification, setNotification] = useState({type: '', message: ''});

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, []);

  useEffect(() => {
    if(user) {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      createNotification(NOTIFICATION_STATE.SUCCESS, `Logged in ${user.name}`)

      setUsername('')
      setPassword('')
    } catch (exception) {
      createNotification(NOTIFICATION_STATE.ERROR, 'Wrong credentials')
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
    setBlogs([])
  };

  const addBlog = async (e) => {
    e.preventDefault();
    try {
      const createdBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlog));
      setNewBlog({ author: '', title: '', url: '' });
      createNotification(NOTIFICATION_STATE.SUCCESS, `Created ${createdBlog.title} blog`)
    } catch(error) {
      createNotification(NOTIFICATION_STATE.ERROR, error.response.data.error)
    }
  }

  const createNotification = (type, message) => {
    setNotification({type, message })
    setTimeout(() => {
      setNotification({type: '', message: ''})
    }, 5000)
  }

  const handleBlogChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  }

  return (
    <div>
      <h1>Blogs Application</h1>
      <Notification notification={notification} />

      {user === null ?
        <Login 
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
        />
        :
        <div>
          <span>{user.name} logged in</span> &nbsp;
          <button onClick={handleLogout}>
            Logout
          </button>
          <h2> Create New </h2>
          <BlogForm
            newBlog={newBlog}
            handleBlogChange={handleBlogChange}
            addBlog={addBlog}
          />
          <h2> Existing Blogs </h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>  
      }
    </div>
  )
}

export default App;
