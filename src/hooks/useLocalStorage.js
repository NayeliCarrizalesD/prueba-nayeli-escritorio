import { useState, useEffect } from 'react'

/**
 * Hook personalizado para manejar estado persistente en localStorage
 * @param {string} key - Clave para localStorage
 * @param {any} initialValue - Valor inicial si no existe en localStorage
 * @returns {[any, function]} - [estado, función para actualizar estado]
 */
export function useLocalStorage(key, initialValue) {
  // Función para obtener el valor del localStorage
  const getStoredValue = () => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  }

  // Estado inicial
  const [storedValue, setStoredValue] = useState(getStoredValue)

  // Función para actualizar el estado y localStorage
  const setValue = (value) => {
    try {
      // Permitir que value sea una función como en useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      
      // Guardar en estado
      setStoredValue(valueToStore)
      
      // Guardar en localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
      
      // Disparar evento personalizado para sincronizar entre pestañas
      window.dispatchEvent(new CustomEvent('localStorageChange', {
        detail: { key, value: valueToStore }
      }))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }

  // Escuchar cambios en localStorage de otras pestañas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch (error) {
          console.warn(`Error parsing localStorage value for key "${key}":`, error)
        }
      }
    }

    // Escuchar eventos de storage (cambios de otras pestañas)
    window.addEventListener('storage', handleStorageChange)

    // Escuchar eventos personalizados (cambios de la misma pestaña)
    const handleCustomStorageChange = (e) => {
      if (e.detail.key === key) {
        setStoredValue(e.detail.value)
      }
    }
    window.addEventListener('localStorageChange', handleCustomStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('localStorageChange', handleCustomStorageChange)
    }
  }, [key])

  return [storedValue, setValue]
}

/**
 * Hook para limpiar datos específicos del localStorage
 * @param {string[]} keys - Array de claves a limpiar
 * @returns {function} - Función para limpiar los datos
 */
export function useClearLocalStorage(keys = []) {
  const clearStorage = () => {
    if (keys.length === 0) {
      // Limpiar todo el localStorage
      window.localStorage.clear()
    } else {
      // Limpiar claves específicas
      keys.forEach(key => {
        window.localStorage.removeItem(key)
      })
    }
    
    // Disparar evento para notificar a otros componentes
    window.dispatchEvent(new CustomEvent('localStorageCleared', {
      detail: { keys }
    }))
  }

  return clearStorage
}

/**
 * Hook para obtener información sobre el progreso guardado
 * @returns {object} - Información sobre el progreso
 */
export function useProgressInfo() {
  const [medicalHistory] = useLocalStorage('medicalHistory', null)
  const [userGoals] = useLocalStorage('userGoals', null)
  const [nutritionData] = useLocalStorage('nutritionData', null)

  const getProgressPercentage = () => {
    let completed = 0
    let total = 3 // Total de secciones principales

    if (medicalHistory && Object.values(medicalHistory).some(val => val !== '' && val.length !== 0)) {
      completed++
    }
    if (userGoals && Object.values(userGoals).some(val => val !== '' && val.length !== 0)) {
      completed++
    }
    if (nutritionData && Object.values(nutritionData).some(val => val !== '' && val.length !== 0)) {
      completed++
    }

    return Math.round((completed / total) * 100)
  }

  const hasAnyProgress = () => {
    return medicalHistory || userGoals || nutritionData
  }

  const getLastSaved = () => {
    const keys = ['medicalHistory', 'userGoals', 'nutritionData']
    let lastSaved = null

    keys.forEach(key => {
      const timestamp = localStorage.getItem(`${key}_timestamp`)
      if (timestamp) {
        const date = new Date(parseInt(timestamp))
        if (!lastSaved || date > lastSaved) {
          lastSaved = date
        }
      }
    })

    return lastSaved
  }

  return {
    medicalHistory,
    userGoals,
    nutritionData,
    progressPercentage: getProgressPercentage(),
    hasProgress: hasAnyProgress(),
    lastSaved: getLastSaved()
  }
}