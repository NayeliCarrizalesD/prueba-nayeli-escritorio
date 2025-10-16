import Navbar from '../components/Navbar'
import { FaRunning, FaWeight, FaChartBar, FaUtensils, FaTint } from 'react-icons/fa'

function Nutrition({ onLogout }) {
  return (
    <div className="nutrition">
      <Navbar onLogout={onLogout} />
      <div className="nutrition-container">
        <div className="nutrition-header">
        <h1>Nutrición</h1>
        <p>Gestiona tu plan nutricional y hábitos alimenticios</p>
      </div>

      <div className="nutrition-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🍎</div>
            <div className="stat-info">
              <h3>Calorías de hoy</h3>
              <p className="stat-number">1,850</p>
              <p className="stat-goal">Meta: 2,000 kcal</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💧</div>
            <div className="stat-info">
              <h3>Agua consumida</h3>
              <p className="stat-number">1.5L</p>
              <p className="stat-goal">Meta: 2.5L</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon"><FaRunning /></div>
            <div className="stat-info">
              <h3>Ejercicio</h3>
              <p className="stat-number">45 min</p>
              <p className="stat-goal">Meta: 60 min</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon"><FaWeight /></div>
            <div className="stat-info">
              <h3>Peso actual</h3>
              <p className="stat-number">65 kg</p>
              <p className="stat-goal">Meta: 63 kg</p>
            </div>
          </div>
        </div>

        <div className="nutrition-sections">
          <div className="section">
            <h2>Plan de Comidas</h2>
            <div className="meals-grid">
              <div className="meal-card">
                <h4>🌅 Desayuno</h4>
                <p>Avena con frutas y nueces</p>
                <span className="calories">320 kcal</span>
              </div>
              <div className="meal-card">
                <h4>🌞 Almuerzo</h4>
                <p>Ensalada de pollo con quinoa</p>
                <span className="calories">450 kcal</span>
              </div>
              <div className="meal-card">
                <h4>🌙 Cena</h4>
                <p>Salmón a la plancha con verduras</p>
                <span className="calories">380 kcal</span>
              </div>
            </div>
          </div>

          <div className="section">
            <h2>Progreso Semanal</h2>
            <div className="progress-card">
              <div className="progress-item">
                <span>Lunes</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '85%'}}></div>
                </div>
                <span>85%</span>
              </div>
              <div className="progress-item">
                <span>Martes</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '92%'}}></div>
                </div>
                <span>92%</span>
              </div>
              <div className="progress-item">
                <span>Miércoles</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '78%'}}></div>
                </div>
                <span>78%</span>
              </div>
              <div className="progress-item">
                <span>Jueves</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '95%'}}></div>
                </div>
                <span>95%</span>
              </div>
              <div className="progress-item">
                <span>Viernes</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '88%'}}></div>
                </div>
                <span>88%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="actions-section">
          <button className="action-btn primary">
            <FaChartBar style={{ marginRight: '8px' }} />Ver Reporte Completo
          </button>
          <button className="action-btn secondary">
            <FaUtensils style={{ marginRight: '8px' }} />Agregar Comida
          </button>
          <button className="action-btn secondary">
            <FaTint style={{ marginRight: '8px' }} />Registrar Agua
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Nutrition