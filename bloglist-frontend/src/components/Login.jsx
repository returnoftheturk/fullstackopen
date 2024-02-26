import { useState } from 'react'

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    await handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form 
      onSubmit={onSubmit}
      id="login-form"
      >
      <div>
        username
        <input
          type="text"
          id="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          id="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button 
        type="submit"
        id="login-button"
        >
        login
      </button>
    </form>
  )
}

export default Login
