import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaSignOutAlt } from 'react-icons/fa'

function Navbar({ onLogout }) {
  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      onLogout()
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img 
            src="/logo.png" 
            alt="Salinas Logo" 
            className="logo-img"
          />
          
        </Link>
        
        <ul className="nav-menu-center">
          <li className="nav-item">
            <Link to="/goals" className="nav-link">
              Nutrición
            </Link>
          </li>
        </ul>
        
        <ul className="nav-menu-right">
          <li className="nav-item">
            <Link to="/home" className="nav-link user-link" title="Ver perfil de usuario">
              <FaUser />
            </Link>
          </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="logout-btn">
              Salir <FaSignOutAlt style={{ marginLeft: '8px' }} />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar