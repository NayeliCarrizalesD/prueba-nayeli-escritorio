import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useLocalStorage } from '../hooks/useLocalStorage'
import PageHeader from '../components/PageHeader'
import { 
  FaChartBar, 
  FaHeart, 
  FaRunning, 
  FaBullseye, 
  FaClipboardList,
  FaSave 
} from 'react-icons/fa'

function MedicalHistory({ userName = "Nayeli Carrizales", onComplete, onLogout }) {
  const navigate = useNavigate()
  
  // Usar hook personalizado para persistencia automática
  const [medicalData, setMedicalData] = useLocalStorage('medicalHistory', {
    hasDisease: '',
    diseaseDescription: '',
    hasAllergy: '',
    allergyDescription: '',
    hasSurgery: '',
    surgeryDescription: '',
    surgeryDate: '',
    // Historial familiar
    familyHistory: [],
    // Preguntas adicionales
    hasDiet: '',
    hasMedication: '',
    hasReductiveTreatment: '',
    treatmentDuration: '',
    hasSupplements: '',
    supplementsDescription: '',
    hasMedicalStudies: '',
    studiesDescription: ''
  })

  // Guardar timestamp cuando se actualicen los datos
  useEffect(() => {
    localStorage.setItem('medicalHistory_timestamp', Date.now().toString())
  }, [medicalData])

  const [currentStep, setCurrentStep] = useState(1)

  const progressIndicators = [
    { icon: <FaChartBar />, status: 'completed' },
    { icon: <FaHeart />, status: 'active' },
    { icon: <FaRunning />, status: '' },
    { icon: <FaBullseye />, status: '' },
    { icon: <FaClipboardList />, status: '' }
  ]

  const handleInputChange = (field, value) => {
    setMedicalData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addFamilyHistory = () => {
    setMedicalData(prev => ({
      ...prev,
      familyHistory: [...prev.familyHistory, { relationship: '', condition: '' }]
    }))
  }

  const updateFamilyHistory = (index, field, value) => {
    setMedicalData(prev => ({
      ...prev,
      familyHistory: prev.familyHistory.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }))
  }

  const removeFamilyHistory = (index) => {
    setMedicalData(prev => ({
      ...prev,
      familyHistory: prev.familyHistory.filter((_, i) => i !== index)
    }))
  }

  const handleSaveProgress = () => {
    // Los datos ya se guardan automáticamente con el hook
    const now = new Date()
    const timeString = now.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
    
    Swal.fire({
      title: '¡Progreso guardado!',
      text: `Tu historial médico ha sido guardado correctamente. Puedes continuar más tarde desde donde lo dejaste.`,
      icon: 'success',
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#FFD61B',
      background: '#fff',
      color: '#3e3e3e',
      customClass: {
        confirmButton: 'swal-confirm-btn'
      }
    })
  }

  const handleContinue = () => {
    // Los datos ya se guardan automáticamente con el hook
    console.log('Historial médico completado:', medicalData)
    
    // Navegar a la página Home
    navigate('/')
  }

  return (
    <div className="goals-container">
      <div className="goals-content">
        <PageHeader userName={userName} indicators={progressIndicators} />

        <div className="medical-form">
          <div className="section">
            <h3><FaHeart style={{ marginRight: '8px' }} />Historial médico</h3>

          <div className="questions-grid">
            {/* Primera fila: 3 preguntas principales */}
            <div className="questions-row">
              {/* Pregunta 1: Enfermedades */}
              <div className="question-item">
                <h3 className="h4">¿Padeces alguna enfermedad o afectación médica?</h3>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="hasDisease"
                      value="Si"
                      checked={medicalData.hasDisease === 'Si'}
                      onChange={(e) => handleInputChange('hasDisease', e.target.value)}
                    />
                    <span className="radio-custom"></span>
                    <span className="parrafo">Sí</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="hasDisease"
                      value="No"
                      checked={medicalData.hasDisease === 'No'}
                      onChange={(e) => handleInputChange('hasDisease', e.target.value)}
                    />
                    <span className="radio-custom"></span>
                    <span className="parrafo">No</span>
                  </label>
                </div>
                {medicalData.hasDisease === 'Si' && (
                  <div className="description-input">
                    <input
                      type="text"
                      placeholder="Fresas, nuez moscada y mariscos."
                      value={medicalData.diseaseDescription}
                      onChange={(e) => handleInputChange('diseaseDescription', e.target.value)}
                      className="disease-description"
                    />
                  </div>
                )}
              </div>

              {/* Pregunta 2: Alergias */}
              <div className="question-item">
                <h3 className="h4">¿Tienes alguna alergia?</h3>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="hasAllergy"
                      value="Si"
                      checked={medicalData.hasAllergy === 'Si'}
                      onChange={(e) => handleInputChange('hasAllergy', e.target.value)}
                    />
                    <span className="radio-custom"></span>
                    <span className="parrafo">Sí</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="hasAllergy"
                      value="No"
                      checked={medicalData.hasAllergy === 'No'}
                      onChange={(e) => handleInputChange('hasAllergy', e.target.value)}
                    />
                    <span className="radio-custom"></span>
                    <span className="parrafo">No</span>
                  </label>
                </div>
                {medicalData.hasAllergy === 'Si' && (
                  <div className="description-input">
                    <input
                      type="text"
                      placeholder="Fresas, nuez moscada y mariscos."
                      value={medicalData.allergyDescription}
                      onChange={(e) => handleInputChange('allergyDescription', e.target.value)}
                      className="allergy-description"
                    />
                  </div>
                )}
              </div>

              {/* Pregunta 3: Cirugías */}
              <div className="question-item">
                <h3 className="h4">¿Te han hecho alguna cirugía?</h3>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="hasSurgery"
                      value="Si"
                      checked={medicalData.hasSurgery === 'Si'}
                      onChange={(e) => handleInputChange('hasSurgery', e.target.value)}
                    />
                    <span className="radio-custom"></span>
                    <span className="parrafo">Sí</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="hasSurgery"
                      value="No"
                      checked={medicalData.hasSurgery === 'No'}
                      onChange={(e) => handleInputChange('hasSurgery', e.target.value)}
                    />
                    <span className="radio-custom"></span>
                    <span className="parrafo">No</span>
                  </label>
                </div>
                {medicalData.hasSurgery === 'Si' && (
                  <div className="surgery-details">
                    <div className="description-input">
                      <input
                        type="text"
                        placeholder="Miomectomía"
                        value={medicalData.surgeryDescription}
                        onChange={(e) => handleInputChange('surgeryDescription', e.target.value)}
                        className="surgery-description"
                      />
                      <small className="parrafo">Miomectomía</small>
                      <div className="date-input">
                        <input
                          type="date"
                          value={medicalData.surgeryDate}
                          onChange={(e) => handleInputChange('surgeryDate', e.target.value)}
                          className="surgery-date"
                        />
                        <small className="parrafo">Fecha</small>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Pregunta 4: Historial Familiar */}
            <div className="question-block full-width">
              <h3>¿Algún familiar directo ha sufrido alguna afección médica como enfermedades del corazón, cáncer, diabetes u otro padecimiento crónico?</h3>
              <div className="family-history-section">
                {medicalData.familyHistory.map((item, index) => (
                  <div key={index} className="family-history-item">
                    <select
                      value={item.relationship}
                      onChange={(e) => updateFamilyHistory(index, 'relationship', e.target.value)}
                      className="relationship-select"
                    >
                      <option value="">Seleccionar parentesco</option>
                      <option value="Abuelo Materno">Abuelo Materno</option>
                      <option value="Abuela Materna">Abuela Materna</option>
                      <option value="Abuelo Paterno">Abuelo Paterno</option>
                      <option value="Abuela Paterna">Abuela Paterna</option>
                      <option value="Padre">Padre</option>
                      <option value="Madre">Madre</option>
                      <option value="Hermano">Hermano</option>
                      <option value="Hermana">Hermana</option>
                      <option value="Hijo">Hijo</option>
                      <option value="Hija">Hija</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Ej: Diabetes, Hipertensión..."
                      value={item.condition}
                      onChange={(e) => updateFamilyHistory(index, 'condition', e.target.value)}
                      className="condition-input"
                    />
                    <button 
                      type="button" 
                      onClick={() => removeFamilyHistory(index)}
                      className="remove-btn"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={addFamilyHistory}
                  className="add-family-btn"
                >
                  <div className="plus-icon">+</div>
                  <span className="btn-text">Agregar otro familiar</span>
                </button>
              </div>
            </div>

            {/* Segunda fila: 3 preguntas */}
            <div className="questions-row">
              {/* Pregunta 5: Dietas */}
              <div className="question-item">
                <h3 className="h4">¿Has hecho dieta para bajar de peso?</h3>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="hasDiet"
                      value="Si"
                      checked={medicalData.hasDiet === 'Si'}
                      onChange={(e) => handleInputChange('hasDiet', e.target.value)}
                    />
                    <span className="radio-custom"></span>
                    <span className="parrafo">Sí</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="hasDiet"
                      value="No"
                      checked={medicalData.hasDiet === 'No'}
                      onChange={(e) => handleInputChange('hasDiet', e.target.value)}
                    />
                    <span className="radio-custom"></span>
                    <span className="parrafo">No</span>
                  </label>
                </div>
              </div>

              {/* Pregunta 6: Medicamentos */}
              <div className="question-item">
                <h3 className="h4">¿Has tomado medicamentos para bajar de peso?</h3>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="hasMedication"
                      value="Si"
                      checked={medicalData.hasMedication === 'Si'}
                      onChange={(e) => handleInputChange('hasMedication', e.target.value)}
                    />
                    <span className="radio-custom"></span>
                    <span className="parrafo">Sí</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="hasMedication"
                      value="No"
                      checked={medicalData.hasMedication === 'No'}
                      onChange={(e) => handleInputChange('hasMedication', e.target.value)}
                    />
                    <span className="radio-custom"></span>
                    <span className="parrafo">No</span>
                  </label>
                </div>
              </div>

              {/* Pregunta 7: Tratamientos Reductivos */}
              <div className="question-item">
                <h3 className="h4">¿Has tomado tratamientos reductivos anteriormente?</h3>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="hasReductiveTreatment"
                      value="Si"
                      checked={medicalData.hasReductiveTreatment === 'Si'}
                      onChange={(e) => handleInputChange('hasReductiveTreatment', e.target.value)}
                    />
                    <span className="radio-custom"></span>
                    <span className="parrafo">Sí</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="hasReductiveTreatment"
                      value="No"
                      checked={medicalData.hasReductiveTreatment === 'No'}
                      onChange={(e) => handleInputChange('hasReductiveTreatment', e.target.value)}
                    />
                    <span className="radio-custom"></span>
                    <span className="parrafo">No</span>
                  </label>
                </div>
                {medicalData.hasReductiveTreatment === 'Si' && (
                  <div className="description-input">
                    <input
                      type="text"
                      placeholder="ej. Cavitación"
                      value={medicalData.treatmentDuration}
                      onChange={(e) => handleInputChange('treatmentDuration', e.target.value)}
                      className="treatment-description"
                    />
                    <small className="parrafo">Tipo de tratamiento</small>
                  </div>
                )}
              </div>
            </div>

            {/* Tercera fila: 2 preguntas */}
            <div className="questions-row">
              {/* Pregunta 8: Suplementos */}
              <div className="question-item">
                <h3 className="h4">¿Utilizas algún suplemento o tomas vitaminas de manera regular?</h3>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="hasSupplements"
                      value="Si"
                      checked={medicalData.hasSupplements === 'Si'}
                      onChange={(e) => handleInputChange('hasSupplements', e.target.value)}
                    />
                    <span className="radio-custom"></span>
                    <span className="parrafo">Sí</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="hasSupplements"
                      value="No"
                      checked={medicalData.hasSupplements === 'No'}
                      onChange={(e) => handleInputChange('hasSupplements', e.target.value)}
                    />
                    <span className="radio-custom"></span>
                    <span className="parrafo">No</span>
                  </label>
                </div>
                {medicalData.hasSupplements === 'Si' && (
                  <div className="description-input">
                    <input
                      type="text"
                      placeholder="ej. Vitamina B, Proteínas"
                      value={medicalData.supplementsDescription}
                      onChange={(e) => handleInputChange('supplementsDescription', e.target.value)}
                      className="supplements-description"
                    />
                    <small className="parrafo">¿Cuál?</small>
                  </div>
                )}
              </div>

              {/* Pregunta 9: Estudios Médicos */}
              <div className="question-item">
                <h3 className="h4">¿Te has realizado estudios médicos recientes?</h3>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="hasMedicalStudies"
                      value="Si"
                      checked={medicalData.hasMedicalStudies === 'Si'}
                      onChange={(e) => handleInputChange('hasMedicalStudies', e.target.value)}
                    />
                    <span className="radio-custom"></span>
                    <span className="parrafo">Sí</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="hasMedicalStudies"
                      value="No"
                      checked={medicalData.hasMedicalStudies === 'No'}
                      onChange={(e) => handleInputChange('hasMedicalStudies', e.target.value)}
                    />
                    <span className="radio-custom"></span>
                    <span className="parrafo">No</span>
                  </label>
                </div>
                {medicalData.hasMedicalStudies === 'Si' && (
                  <div className="description-input">
                    <input
                      type="text"
                      placeholder="ej. Química Sanguínea, Hemoglobina, etc."
                      value={medicalData.studiesDescription}
                      onChange={(e) => handleInputChange('studiesDescription', e.target.value)}
                      className="studies-description"
                    />
                    <small className="parrafo">¿Qué tipo de estudio médico?</small>
                    <div className="file-upload-section">
                      <button type="button" className="upload-btn">
                        📎 Adjuntar archivo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <div className="save-progress">
              <span>Deseo continuar después.</span>
              <button type="button" onClick={handleSaveProgress} className="save-btn">
                <FaSave style={{ marginRight: '8px' }} />
                Guardar mi avance
              </button>
            </div>

            <button className="continue-btn" onClick={handleContinue}>
              Continuar
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MedicalHistory