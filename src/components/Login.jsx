import { useState } from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'

function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Credenciales predefinidas
  const validCredentials = {
    email: 'nayeli@salinas.com',
    password: '123456'
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpiar error al escribir
    if (error) setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simular un pequeño delay de autenticación
    setTimeout(() => {
      if (credentials.email === validCredentials.email && 
          credentials.password === validCredentials.password) {
        onLogin(true)
      } else {
        setError('Correo electrónico o contraseña incorrectos')
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <img src="/logo.png" alt="Salinas Logo" />
          </div>
          <h1>Iniciar Sesión</h1>
          <p>Accede a tu cuenta de Salinas</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              placeholder="Introduce tu correo"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Introduce tu contraseña"
              required
            />
          </div>

          {error && (
            <div className="error-message">
              <span><FaExclamationTriangle style={{ marginRight: '8px' }} />{error}</span>
            </div>
          )}

          <button 
            type="submit" 
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="login-footer">
          <div className="demo-credentials">
            <h4>Credenciales de demostración:</h4>
            <p><strong>Email:</strong> nayeli@salinas.com</p>
            <p><strong>Contraseña:</strong> 123456</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login