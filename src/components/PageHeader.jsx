import React from 'react'
import { FaUser } from 'react-icons/fa'

function PageHeader({ 
  title = "Nutrición", 
  userName = "Nayeli Carrizales", 
  description = "Para brindarte una mejor atención, contesta las siguientes preguntas. La información es confidencial y esencial para crear tu perfil y que recibas la mejor atención.",
  indicators = []
}) {
  return (
    <div className="welcome-section">
      <div className="welcome-content">
        <div className="avatar">
          <div className="avatar-icon">
            <FaUser />
          </div>
        </div>
        <div className="welcome-text">
          <div className="h3">¡Bienvenida</div>
          <div className="h2">{userName}!</div>
        </div>
      </div>
    </div>
  )
}

export default PageHeader