# 📋 TODO List - Engine Integration Project

## 🎯 **Objetivo Principal**
Integrar EngineAI Web (autenticación) con Kaplay Engine (motor 2D) en una aplicación web unificada.

---

## 📁 **Fase 1: Estructura y Documentación**
- [x] ✅ Crear estructura de carpetas del proyecto
- [x] ✅ Crear README.md inicial
- [x] ✅ Crear todo-list.md detallado
- [ ] 🚧 Crear architecture.md con documentación técnica
- [ ] 📊 Crear diagrama Mermaid del proyecto completo
- [ ] 📝 Crear package.json para el proyecto integrado

---

## 🔐 **Fase 2: Sistema de Autenticación**
### **Componentes a Copiar/Adaptar de EngineAI Web:**
- [ ] 📄 `index.html` → `src/auth/login.html`
- [ ] 🎨 `styles.css` → `public/css/auth.css`
- [ ] ⚙️ `script.js` → `src/auth/auth.js`
- [ ] 🔧 `api/auth/callback.js` → `src/auth/callback.js`
- [ ] 📋 `privacy-policy.html` → `src/auth/privacy.html`
- [ ] 📋 `terms-of-service.html` → `src/auth/terms.html`

### **Adaptaciones Necesarias:**
- [ ] 🔄 Modificar rutas de redirección post-login
- [ ] 🎯 Integrar con página del motor de juegos
- [ ] 🛡️ Adaptar manejo de tokens JWT
- [ ] 📱 Responsive design para nueva interfaz

---

## 🎮 **Fase 3: Integración Motor Kaplay (Control Manual)** (Días 8-12)
**Prioridad: Alta** | **Estimación: 5 días**

> **🎯 ENFOQUE PRINCIPAL**: Crear un motor completamente funcional con controles manuales. La IA será una herramienta opcional que se agregará después.

### **Tareas Principales:**
- [ ] **3.1** Copiar archivos del motor Kaplay al proyecto
- [ ] **3.2** Adaptar servidor Express para servir Kaplay
- [ ] **3.3** Crear componente viewport para renderizado manual
- [ ] **3.4** Implementar controles manuales del editor (drag & drop, click, toolbar)
- [ ] **3.5** Configurar sistema de eventos entre UI manual y motor
- [ ] **3.6** Crear interfaz visual para edición manual de objetos

### **Subtareas Detalladas:**
- [ ] **3.1.1** Copiar `server.js` y adaptarlo
- [ ] **3.1.2** Integrar dependencias de Kaplay en `package.json`
- [ ] **3.1.3** Configurar rutas para servir assets del juego
- [ ] **3.2.1** Crear endpoint `/game` para el motor
- [ ] **3.2.2** Configurar middleware para archivos estáticos
- [ ] **3.3.1** Crear `viewport.js` con canvas HTML5 para edición manual
- [ ] **3.3.2** Inicializar contexto Kaplay en el viewport
- [ ] **3.3.3** Implementar sistema de resize responsivo
- [ ] **3.4.1** Crear controles manuales de zoom y pan (mouse wheel, drag)
- [ ] **3.4.2** Implementar herramientas de selección manual (click, drag select)
- [ ] **3.4.3** Agregar shortcuts de teclado para acciones manuales
- [ ] **3.4.4** Crear toolbar con herramientas visuales (crear, mover, eliminar)
- [ ] **3.4.5** Implementar drag & drop para objetos del juego
- [ ] **3.5.1** Sistema de eventos custom para comunicación manual
- [ ] **3.5.2** Bridge entre UI manual y Kaplay
- [ ] **3.6.1** Crear panel de propiedades para edición manual de objetos
- [ ] **3.6.2** Implementar inspector visual de objetos seleccionados
- [ ] **3.6.3** Crear sistema de capas para organización manual
- [ ] **3.6.4** Implementar grid y snap para posicionamiento preciso

---

## 🤖 **Fase 3.5: Herramienta de IA Opcional** (Días 13-17)
**Prioridad: Media** | **Estimación: 5 días**

> **⚠️ IMPORTANTE**: Esta fase es **OPCIONAL** y se ejecuta **DESPUÉS** de que el motor manual esté completamente funcional. La IA es solo una herramienta adicional que complementa el control manual.

### **Arquitectura IA Híbrida Escalonada (Herramienta Opcional):**

#### **🎯 Nivel 1: IA Propia (Comandos Básicos)**
- [ ] **3.5.1** Crear parser de comandos naturales básicos
- [ ] **3.5.2** Implementar diccionario de acciones del motor
- [ ] **3.5.3** Sistema de respuestas predefinidas
- [ ] **3.5.4** Comandos: "crear objeto", "mover", "eliminar", "cambiar color"

#### **💰 Nivel 2: DeepSeek API (Comandos Complejos)**
- [ ] **3.5.5** Integrar DeepSeek API ($0.14 por 1M tokens)
- [ ] **3.5.6** Sistema de fallback para comandos complejos
- [ ] **3.5.7** Cache de respuestas para optimizar costos
- [ ] **3.5.8** Comandos: "crear nivel completo", "generar enemigos", "balancear gameplay"

#### **🏠 Nivel 3: Ollama Local (Backup Offline)**
- [ ] **3.5.9** Configurar Ollama para funcionar offline
- [ ] **3.5.10** Descargar modelo ligero (Llama 3.2 3B)
- [ ] **3.5.11** Sistema de detección de conectividad
- [ ] **3.5.12** Fallback automático cuando no hay internet

#### **🔗 Nivel 4: OpenAI (Opcional Premium)**
- [ ] **3.5.13** Integración opcional con OpenAI API
- [ ] **3.5.14** Configuración para usuarios premium
- [ ] **3.5.15** Comandos avanzados y generación de código

### **Tareas de Implementación:**
- [ ] **3.5.16** Crear `ai-controller.js` con sistema escalonado
- [ ] **3.5.17** Implementar `command-parser.js` para NLP básico
- [ ] **3.5.18** Crear `ai-config.js` para configuración de APIs
- [ ] **3.5.19** Desarrollar `response-cache.js` para optimización
- [ ] **3.5.20** Implementar `offline-detector.js` para conectividad
- [ ] **3.5.21** Crear interfaz de chat en el editor
- [ ] **3.5.22** Sistema de comandos por voz (opcional)
- [ ] **3.5.23** Historial de comandos y deshacer/rehacer
- [ ] **3.5.24** Documentación de comandos disponibles
- [ ] **3.5.25** Tests unitarios para cada nivel de IA

---

## 🌐 **Fase 4: Interfaz Web Unificada**
### **Páginas Principales:**
- [ ] 🏠 `src/pages/index.html` - Página de inicio/login
- [ ] 🎮 `src/pages/game.html` - Página principal del motor
- [ ] 👤 `src/pages/profile.html` - Perfil de usuario
- [ ] 📊 `src/pages/dashboard.html` - Dashboard de proyectos

### **Componentes de UI:**
- [ ] 🧩 `src/components/header.js` - Header con navegación
- [ ] 🔘 `src/components/sidebar.js` - Panel lateral
- [ ] 🎛️ `src/components/toolbar.js` - Barra de herramientas
- [ ] 📋 `src/components/project-list.js` - Lista de proyectos
- [ ] ⚙️ `src/components/settings-panel.js` - Panel de configuración

---

## 🔧 **Fase 5: Funcionalidades Avanzadas**
### **Sistema de Proyectos:**
- [ ] 📁 `src/utils/project-manager.js` - Gestor de proyectos
- [ ] 💾 `src/utils/storage.js` - Sistema de almacenamiento
- [ ] 📤 `src/utils/export.js` - Exportador de proyectos
- [ ] 📥 `src/utils/import.js` - Importador de proyectos

### **Integración Backend:**
- [ ] 🗄️ Base de datos para proyectos de usuarios
- [ ] 🔄 API REST para CRUD de proyectos
- [ ] 🔐 Middleware de autenticación
- [ ] 📁 Sistema de archivos para assets

---

## 🎨 **Fase 6: Estilos y UX**
### **CSS/Styling:**
- [ ] 🎨 `public/css/main.css` - Estilos principales
- [ ] 🎮 `public/css/game.css` - Estilos del motor
- [ ] 📱 `public/css/responsive.css` - Diseño responsive
- [ ] 🌙 `public/css/themes.css` - Temas (claro/oscuro)

### **JavaScript Utilities:**
- [ ] 🔧 `src/utils/helpers.js` - Funciones auxiliares
- [ ] 🎯 `src/utils/events.js` - Manejo de eventos
- [ ] 📊 `src/utils/analytics.js` - Analytics básico
- [ ] 🐛 `src/utils/error-handler.js` - Manejo de errores

---

## 🧪 **Fase 7: Testing y Optimización**
### **Testing:**
- [ ] 🧪 Tests unitarios para componentes
- [ ] 🔍 Tests de integración
- [ ] 🎮 Tests del motor de juegos
- [ ] 🔐 Tests de autenticación

### **Optimización:**
- [ ] ⚡ Optimización de carga
- [ ] 📦 Bundling y minificación
- [ ] 🖼️ Optimización de assets
- [ ] 📱 Performance en móviles

---

## 🚀 **Fase 8: Deployment**
### **Configuración:**
- [ ] 🔧 `vercel.json` - Configuración de Vercel
- [ ] 🌍 Variables de entorno
- [ ] 🔒 Configuración de seguridad
- [ ] 📊 Monitoring y logs

### **Documentación Final:**
- [ ] 📖 Manual de usuario
- [ ] 👨‍💻 Documentación para desarrolladores
- [ ] 🚀 Guía de deployment
- [ ] 🔧 Troubleshooting guide

---

## 📊 **Métricas de Progreso**
- **Total de tareas**: ~60
- **Completadas**: 3 ✅
- **En progreso**: 2 🚧
- **Pendientes**: ~55 📋
- **Progreso actual**: ~5%

---

## 🎯 **Prioridades Inmediatas**
1. 📊 Completar documentación y diagramas
2. 🔐 Implementar sistema de autenticación básico
3. 🎮 Integrar motor Kaplay básico
4. 🌐 Crear interfaz unificada mínima
5. 🧪 Testing básico y deployment inicial

---

## 📝 **Notas Importantes**
- ⚠️ No modificar proyectos originales (EngineAI Web / Kaplay Engine)
- 🔄 Copiar y adaptar componentes uno por uno
- 🧪 Probar cada integración antes de continuar
- 📊 Mantener documentación actualizada
- 🎯 Enfoque en MVP funcional primero