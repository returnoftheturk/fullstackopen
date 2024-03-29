import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = (event) => {
    event.preventDefault()
    handleLogin({ username, password })
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={loginUser}>
        <div>
          username
          <input
            id='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
