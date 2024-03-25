// npm modules
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userService } from '../../services'
import {
  NETWORK_ERROR,
} from '../../constants'

// css
import styles from './Login.module.css'

const LoginPage = ({ handleAuthEvt }) => {
  const navigate = useNavigate()

  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = evt => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()

    // if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
    //   throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
    // }
    // await authService.login(formData)

    userService
      .login(formData)
      .then(response => {
        setMessage(JSON.stringify(response))

        handleAuthEvt()
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
        setMessage(NETWORK_ERROR)
      })
    
  }

  const { email, password } = formData

  const isFormInvalid = () => {
    return !(email && password)
  }

  return (
    <main className={styles.container}>
      <h1>Log In</h1>
      <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Email
          <input
            type="text"
            value={email}
            name="email"
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Password
          <input
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </label>
        <div>
          <Link to="/">Reset</Link>
          <button className={styles.button} disabled={isFormInvalid()}>
            Log In
          </button>
        </div>
      </form>
      <p className={styles.message}>{message}</p>
    </main>
  )
}

export default LoginPage
