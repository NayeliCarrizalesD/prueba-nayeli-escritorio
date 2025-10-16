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
        <Link to="/home" className="nav-logo">
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
            <button onClick={handleLogout} className="nav-link">
              Salir <FaSignOutAlt style={{ marginLeft: '8px' }} />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar