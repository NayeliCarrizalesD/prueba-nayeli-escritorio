import { useState, useRef } from 'react'
import { FaUser, FaBirthdayCake, FaEnvelope, FaPhone, FaBriefcase } from 'react-icons/fa'
import Swal from 'sweetalert2'

function Home({ userData, onUserDataUpdate, onDataVerified, onLogout }) {
  const [localUserData, setLocalUserData] = useState(userData || {
    name: "Nayeli Carrizales",
    age: "22 años",
    email: "nayeli.carrizales@gmail.com",
    phone: "01 55 5530 6750",
    workplace: "Desarrolladora Frontend React"
  })

  const [editingField, setEditingField] = useState(null)
  const inputRefs = useRef({})

  const handleInputChange = (field, value) => {
    const updatedData = {
      ...localUserData,
      [field]: value
    }
    setLocalUserData(updatedData)
    
    // Actualizar los datos del usuario globalmente de inmediato
    if (onUserDataUpdate) {
      onUserDataUpdate(updatedData)
    }
  }

  const handleFieldClick = (field) => {
    setEditingField(field)
    // Enfocar el input después de un pequeño delay para que se renderice
    setTimeout(() => {
      if (inputRefs.current[field]) {
        inputRefs.current[field].focus()
      }
    }, 50)
  }

  const handleInputBlur = (field) => {
    setEditingField(null)
    console.log(`Campo ${field} guardado automáticamente:`, localUserData[field])
    
    // Mostrar una notificación sutil de guardado
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Guardado automáticamente'
    })
  }

  const handleKeyDown = (e, field) => {
    if (e.key === 'Enter') {
      handleInputBlur(field)
    }
    if (e.key === 'Escape') {
      setEditingField(null)
    }
  }

  const handleContinue = () => {
    // Verificar datos y avanzar al siguiente paso (Goals)
    console.log('handleContinue called')
    onDataVerified()
  }

  return (
    <div className="home">
      <div className="profile-container">
        <div className="welcome-section">
          <div className="avatar">
            <div className="avatar-icon">
              <FaUser />
            </div>
          </div>
          <div className="welcome-text">
            <span className="parrafo">¡Bienvenida</span>
            <span className="h1">{localUserData.name}!</span>
          </div>
        </div>

        <div className="verification-section">
          <p className="parrafo verification-text">
            Para comenzar, ayúdanos a verificar tus datos. Haz clic en cualquier campo para editarlo.
          </p>
        </div>

        <div className="user-data">
          <div className="data-row">
            <div className="data-item">
              <span className="data-icon"><FaUser /></span>
              <div className="data-content">
                <span className="h5 data-label">Nombre</span>
                {editingField === 'name' ? (
                  <input
                    ref={(el) => inputRefs.current['name'] = el}
                    type="text"
                    className="data-input"
                    value={localUserData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onBlur={() => handleInputBlur('name')}
                    onKeyDown={(e) => handleKeyDown(e, 'name')}
                  />
                ) : (
                  <span 
                    className="parrafo data-value editable-field" 
                    onClick={() => handleFieldClick('name')}
                  >
                    {localUserData.name}
                  </span>
                )}
              </div>
            </div>
            <div className="data-item">
              <span className="data-icon"><FaBirthdayCake /></span>
              <div className="data-content">
                <span className="h5 data-label">Edad</span>
                {editingField === 'age' ? (
                  <input
                    ref={(el) => inputRefs.current['age'] = el}
                    type="text"
                    className="data-input"
                    value={localUserData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    onBlur={() => handleInputBlur('age')}
                    onKeyDown={(e) => handleKeyDown(e, 'age')}
                  />
                ) : (
                  <span 
                    className="parrafo data-value editable-field" 
                    onClick={() => handleFieldClick('age')}
                  >
                    {localUserData.age}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="data-row">
            <div className="data-item">
              <span className="data-icon"><FaEnvelope /></span>
              <div className="data-content">
                <span className="h5 data-label">Correo electrónico</span>
                {editingField === 'email' ? (
                  <input
                    ref={(el) => inputRefs.current['email'] = el}
                    type="email"
                    className="data-input"
                    value={localUserData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={() => handleInputBlur('email')}
                    onKeyDown={(e) => handleKeyDown(e, 'email')}
                  />
                ) : (
                  <span 
                    className="parrafo data-value editable-field" 
                    onClick={() => handleFieldClick('email')}
                  >
                    {localUserData.email}
                  </span>
                )}
              </div>
            </div>
            <div className="data-item">
              <span className="data-icon"><FaPhone /></span>
              <div className="data-content">
                <span className="h5 data-label">Teléfono celular</span>
                {editingField === 'phone' ? (
                  <input
                    ref={(el) => inputRefs.current['phone'] = el}
                    type="tel"
                    className="data-input"
                    value={localUserData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    onBlur={() => handleInputBlur('phone')}
                    onKeyDown={(e) => handleKeyDown(e, 'phone')}
                  />
                ) : (
                  <span 
                    className="parrafo data-value editable-field" 
                    onClick={() => handleFieldClick('phone')}
                  >
                    {localUserData.phone}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="data-row">
            <div className="data-item full-width">
              <span className="data-icon"><FaBriefcase /></span>
              <div className="data-content">
                <span className="h5 data-label">Lugar de trabajo</span>
                {editingField === 'workplace' ? (
                  <input
                    ref={(el) => inputRefs.current['workplace'] = el}
                    type="text"
                    className="data-input"
                    value={localUserData.workplace}
                    onChange={(e) => handleInputChange('workplace', e.target.value)}
                    onBlur={() => handleInputBlur('workplace')}
                    onKeyDown={(e) => handleKeyDown(e, 'workplace')}
                  />
                ) : (
                  <span 
                    className="parrafo data-value highlighted editable-field" 
                    onClick={() => handleFieldClick('workplace')}
                  >
                    {localUserData.workplace}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="action-section">
          <button className="continue-btn" onClick={handleContinue}>
            Continuar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home