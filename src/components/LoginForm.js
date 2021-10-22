import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useAuth } from '../useAuth'

const LoginForm = ({ setErrorMessage }) => {
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { signin, user } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await signin(username, password)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            placeholder="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      <p>User {user} has been logged in</p>
    </div>
  )
}

LoginForm.propTypes = {
  setErrorMessage: PropTypes.func.isRequired,
}

export default LoginForm