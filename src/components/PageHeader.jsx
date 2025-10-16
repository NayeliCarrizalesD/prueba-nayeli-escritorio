import React from 'react'
import { FaUser } from 'react-icons/fa'

function PageHeader({ 
  title = "Nutrición", 
  userName = "Nayeli Carrizales", 
  description = "Para brindarte una mejor atención, contesta las siguientes preguntas. La información es confidencial y esencial para crear tu perfil y que recibas la mejor atención.",
  indicators = []
}) {
  return (
    <div className="page-header">
      <div className="user-info">
        <div className="user-avatar-icon">
          <FaUser />
        </div>
        <div className="header-content">
          <div className="user-text">
            <h2>{title}</h2>
            <h1>Hola, {userName}</h1>
            <p>{description}</p>
          </div>
          
          <div className="progress-indicators">
            {indicators.map((indicator, index) => (
              <div 
                key={index} 
                className={`indicator ${indicator.status || ''}`}
              >
                {indicator.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageHeader