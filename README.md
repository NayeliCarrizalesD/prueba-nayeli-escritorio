# Prueba Nayeli - Aplicación de Evaluación Médica 🏥

Una aplicación web moderna para la captura y gestión de datos médicos y objetivos de salud.

## � Instalación y Configuración Local

### Prerrequisitos

Asegúrate de tener instalado en tu PC:

- **Node.js** (versión 16 o superior) - [Descargar aquí](https://nodejs.org/)
- **Git** (opcional, para clonar el repositorio) - [Descargar aquí](https://git-scm.com/)

### Pasos para ejecutar la aplicación

#### 1. Obtener el código

**Opción A: Clonar con Git**
```bash
git clone https://github.com/NayeliCarrizalesD/prueba-nayeli-escritorio.git
cd prueba-nayeli-escritorio
```

**Opción B: Descargar ZIP**
- Descarga el archivo ZIP del repositorio
- Extrae los archivos en una carpeta de tu elección
- Abre terminal/consola en esa carpeta

#### 2. Instalar dependencias
```bash
npm install
```

#### 3. Ejecutar la aplicación
```bash
npm run dev
```

#### 4. Abrir en el navegador
La aplicación se ejecutará automáticamente en:
- **URL**: `http://localhost:3004` (o el puerto que se muestre en la consola)
- Se abrirá automáticamente en tu navegador predeterminado

## 🔐 Credenciales de Acceso

Para probar la aplicación, usa estas credenciales:

- **Email**: `nayeli@salinas.com`
- **Contraseña**: `123456`

## 📋 Funcionalidades Incluidas

- ✅ **Sistema de login** con validación
- ✅ **Gestión de datos personales** (editable)
- ✅ **Configuración de objetivos** de salud
- ✅ **Historial médico completo** con:
  - Enfermedades y alergias
  - Historial de cirugías
  - Historial familiar
  - Medicamentos y suplementos
- ✅ **Guardado automático** en localStorage
- ✅ **Indicador de progreso** visual
- ✅ **Diseño responsive** para móviles y desktop

## 🛠️ Tecnologías Utilizadas

- **React 18** + **Vite** - Framework y herramientas de desarrollo
- **React Router** - Navegación entre páginas
- **SASS/SCSS** - Estilos avanzados con variables CSS
- **SweetAlert2** - Alertas y notificaciones elegantes
- **Local Storage** - Persistencia de datos local

## 📱 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge (últimas versiones)
- ✅ Dispositivos móviles y tablets
- ✅ Windows, macOS, Linux

## 🔧 Comandos Adicionales

### Construir para producción
```bash
npm run build
```

### Vista previa de producción
```bash
npm run preview
```

### Limpiar caché de Node
```bash
npm start -- --reset-cache
```

## ❗ Solución de Problemas

### La aplicación no inicia
1. Verifica que Node.js esté instalado: `node --version`
2. Elimina `node_modules` y ejecuta `npm install` nuevamente
3. Verifica que el puerto no esté ocupado

### Error de permisos
- En Windows: Ejecuta la terminal como administrador
- En macOS/Linux: Usa `sudo` si es necesario

### Puerto ocupado
La aplicación buscará automáticamente un puerto disponible (3000, 3001, 3002, etc.)

## �‍💻 Desarrollado por

**Nayeli Carrizales** - Desarrolladora Frontend React

---

¡Listo para usar! 🎉 La aplicación guardará automáticamente tu progreso localmente.