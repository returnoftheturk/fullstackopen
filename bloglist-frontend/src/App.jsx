import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Togglable from './components/Togglable'
import Notification, { NOTIFICATION_STATE} from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({type: '', message: ''});
  const blogFormRef = useRef();

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

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      createNotification(NOTIFICATION_STATE.SUCCESS, `Logged in ${user.name}`)
    } catch (exception) {
      createNotification(NOTIFICATION_STATE.ERROR, 'Wrong credentials')
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser');
    setUser(null);
    setBlogs([])
  };

  const createBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog);
      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(createdBlog));
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

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <Login 
        handleLogin={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="New Blog" ref={blogFormRef}>
      <BlogForm
        createBlog={createBlog}
      />
    </Togglable>
  )

  return (
    <div>
      <h1>Blogs Application</h1>
      <Notification notification={notification} />

      {user === null ?
        loginForm()
        :
        <div>
          <span>{user.name} logged in</span> &nbsp;
          <button onClick={handleLogout}>
            Logout
          </button>
          <h2> Create New </h2>
          {blogForm()}
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
