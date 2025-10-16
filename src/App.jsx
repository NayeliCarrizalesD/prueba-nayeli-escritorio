import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Goals from './pages/Goals'
import Home from './pages/Home'
import Nutrition from './pages/Nutrition'
import Contact from './pages/Contact'
import MedicalHistory from './pages/MedicalHistory'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasVerifiedData, setHasVerifiedData] = useState(false)
  const [hasCompletedGoals, setHasCompletedGoals] = useState(false)
  const [hasCompletedMedicalHistory, setHasCompletedMedicalHistory] = useState(false)
  const [userData, setUserData] = useState({
    name: "Nayeli Carrizales",
    age: "22 años",
    email: "nayeli.carrizales@gmail.com",
    phone: "01 55 5530 6750",
    workplace: "Desarrolladora Frontend React"
  })
  const navigate = useNavigate()

  // Verificar si hay una sesión guardada al cargar la app
  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuthenticated')
    const dataVerified = localStorage.getItem('dataVerified')
    const goalsCompleted = localStorage.getItem('goalsCompleted')
    const medicalHistoryCompleted = localStorage.getItem('medicalHistoryCompleted')
    const savedUserData = localStorage.getItem('userData')
    
    if (savedAuth === 'true') {
      setIsAuthenticated(true)
    }
    
    if (dataVerified === 'true') {
      setHasVerifiedData(true)
    }
    
    if (goalsCompleted === 'true') {
      setHasCompletedGoals(true)
    }
    
    if (medicalHistoryCompleted === 'true') {
      setHasCompletedMedicalHistory(true)
    }
    
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData))
    }
  }, [])

  const handleLogin = (success) => {
    if (success) {
      setIsAuthenticated(true)
      localStorage.setItem('isAuthenticated', 'true')
    }
  }

  const handleDataVerification = () => {
    setHasVerifiedData(true)
    localStorage.setItem('dataVerified', 'true')
  }

  const handleUserDataUpdate = (newUserData) => {
    setUserData(newUserData)
    localStorage.setItem('userData', JSON.stringify(newUserData))
  }

  const handleDataVerificationFromRoute = () => {
    // Navegar directamente a goals usando navigate
    console.log('Navigating to goals from home')
    navigate('/goals')
  }

  const handleGoalsComplete = () => {
    setHasCompletedGoals(true)
    localStorage.setItem('goalsCompleted', 'true')
    // Navegar automáticamente al historial médico
    navigate('/medical-history')
  }

  const handleMedicalHistoryComplete = () => {
    setHasCompletedMedicalHistory(true)
    localStorage.setItem('medicalHistoryCompleted', 'true')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setHasVerifiedData(false)
    setHasCompletedGoals(false)
    setHasCompletedMedicalHistory(false)
    setUserData({
      name: "Nayeli Carrizales",
      age: "22 años", 
      email: "nayeli.carrizales@gmail.com",
      phone: "01 55 5530 6750",
      workplace: "Desarrolladora Frontend React"
    })
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('dataVerified')
    localStorage.removeItem('goalsCompleted')
    localStorage.removeItem('medicalHistoryCompleted')
    localStorage.removeItem('userGoals')
    localStorage.removeItem('medicalHistory')
    localStorage.removeItem('userData')
  }

  // Si no está autenticado, mostrar login
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  // Si está autenticado pero no ha verificado datos, mostrar Home sin navbar
  if (isAuthenticated && !hasVerifiedData) {
    return <Home userData={userData} onUserDataUpdate={handleUserDataUpdate} onDataVerified={handleDataVerification} onLogout={handleLogout} />
  }

  // Si ha verificado datos, mostrar la aplicación con navbar
  return (
    <div className="App">
      <Navbar onLogout={handleLogout} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={
            // Lógica de flujo para después de verificar datos
            !hasCompletedGoals ? (
              <Goals userName={userData.name} onComplete={handleGoalsComplete} onLogout={handleLogout} />
            ) : !hasCompletedMedicalHistory ? (
              <MedicalHistory userName={userData.name} onComplete={handleMedicalHistoryComplete} onLogout={handleLogout} />
            ) : (
              <Nutrition onLogout={handleLogout} />
            )
          } />
          <Route path="/nutrition" element={<Nutrition onLogout={handleLogout} />} />
          <Route path="/home" element={<Home userData={userData} onUserDataUpdate={handleUserDataUpdate} onDataVerified={handleDataVerificationFromRoute} onLogout={handleLogout} />} />
          <Route path="/goals" element={<Goals userName={userData.name} onComplete={handleGoalsComplete} onLogout={handleLogout} />} />
          <Route path="/medical-history" element={<MedicalHistory userName={userData.name} onComplete={handleMedicalHistoryComplete} onLogout={handleLogout} />} />
          <Route path="/contact" element={<Contact onLogout={handleLogout} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App