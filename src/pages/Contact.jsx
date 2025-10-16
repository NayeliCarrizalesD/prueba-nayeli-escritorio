import { useState } from 'react'
import Navbar from '../components/Navbar'

function Contact({ onLogout }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí normalmente enviarías los datos a un servidor
    console.log('Datos del formulario:', formData)
    setSubmitted(true)
    
    // Reiniciar formulario después de 3 segundos
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  if (submitted) {
    return (
      <div className="contact">
        <Navbar onLogout={onLogout} />
        <div className="contact-container">
          <div className="success-message">
            <h1>¡Mensaje Enviado! ✅</h1>
            <p>Gracias por contactarnos. Te responderemos pronto.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="contact">
      <Navbar onLogout={onLogout} />
      <div className="contact-container">
        <h1>Contacto</h1>
      
      <div className="contact-content">
        <div className="contact-info">
          <h2>¿Tienes alguna pregunta?</h2>
          <p>No dudes en contactarnos. Estamos aquí para ayudarte.</p>
          
          <div className="contact-details">
            <div className="contact-item">
              <h3>📧 Email</h3>
              <p>contacto@miapp.com</p>
            </div>
            <div className="contact-item">
              <h3>📱 Teléfono</h3>
              <p>+52 (555) 123-4567</p>
            </div>
            <div className="contact-item">
              <h3>📍 Ubicación</h3>
              <p>Ciudad de México, México</p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Envíanos un mensaje</h2>
          
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Enviar Mensaje
          </button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Contact