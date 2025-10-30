# 📚 **Guía Completa del Motor de Juegos**

> **🎯 Objetivo**: Esta guía te ayudará a usar el motor de juegos tanto manualmente como con IA, incluyendo comandos, palabras clave humanizadas y modos de interacción.

---

## 📖 **Índice**

1. [🎮 Introducción](#-introducción)
2. [🛠️ Modos de Uso](#️-modos-de-uso)
3. [🎯 Comandos por Motor](#-comandos-por-motor)
4. [💬 Palabras Clave Humanizadas](#-palabras-clave-humanizadas)
5. [🤖 Modos de IA](#-modos-de-ia)
6. [📋 Comandos Universales](#-comandos-universales)
7. [🔧 Ejemplos Prácticos](#-ejemplos-prácticos)

---

## 🎮 **Introducción**

Este motor de juegos soporta **múltiples motores gráficos** y **diferentes formas de interacción**:

### **🎯 Motores Disponibles:**
- **Kaplay Engine** - Motor 2D completo <mcreference link="https://kaplayjs.com/" index="1">1</mcreference>
- **Motor Propio** - Fallback offline personalizado
- **Phaser** - (Próximamente)
- **PixiJS** - (Próximamente)

### **🛠️ Formas de Interacción:**
1. **Manual** - Controles directos (drag & drop, toolbar)
2. **Comandos de Texto** - Palabras clave humanizadas
3. **IA Asistente** - Modo Ask (preguntas) y Agent (acciones)

---

## 🛠️ **Modos de Uso**

### **🖱️ Modo Manual**
- **Drag & Drop**: Arrastra objetos directamente
- **Toolbar**: Herramientas visuales (crear, mover, eliminar)
- **Shortcuts**: Atajos de teclado
- **Inspector**: Panel de propiedades visual

### **💬 Modo Comandos de Texto**
- **Palabras Clave**: Comandos humanizados en español
- **Sintaxis Simple**: "crear jugador en 100,200"
- **Sin Código**: No necesitas saber programación

### **🤖 Modo IA**
- **Ask Mode**: Pregunta sobre comandos y funcionalidades
- **Agent Mode**: La IA ejecuta acciones por ti
- **Híbrido**: Combina manual + IA según necesites

---

## 🎯 **Comandos por Motor**

## **🎮 Kaplay Engine**

### **📦 Comandos de Objetos**
<mcreference link="https://kaplayjs.com/docs/api/reference/" index="2">2</mcreference>

| Comando Manual | Palabra Clave | Código Kaplay |
|----------------|---------------|---------------|
| Crear objeto | `crear [tipo] en [x,y]` | `add([sprite(), pos(x,y)])` |
| Mover objeto | `mover [objeto] a [x,y]` | `obj.pos = vec2(x,y)` |
| Eliminar objeto | `eliminar [objeto]` | `obj.destroy()` |
| Rotar objeto | `rotar [objeto] [grados]` | `obj.angle = degrees` |
| Escalar objeto | `escalar [objeto] [factor]` | `obj.scale = vec2(x,y)` |

### **🎨 Comandos Visuales**

| Comando Manual | Palabra Clave | Código Kaplay |
|----------------|---------------|---------------|
| Cambiar color | `color [objeto] [color]` | `obj.color = rgb(r,g,b)` |
| Cambiar sprite | `sprite [objeto] [nombre]` | `obj.use(sprite("name"))` |
| Hacer invisible | `ocultar [objeto]` | `obj.hidden = true` |
| Cambiar opacidad | `opacidad [objeto] [valor]` | `obj.opacity = valor` |
| Dibujar rectángulo | `rectángulo [ancho] [alto]` | `add([rect(w,h)])` |
| Dibujar círculo | `círculo [radio]` | `add([circle(radius)])` |

### **🎯 Comandos de Física**

| Comando Manual | Palabra Clave | Código Kaplay |
|----------------|---------------|---------------|
| Aplicar gravedad | `gravedad [objeto]` | `obj.use(body())` |
| Saltar | `saltar [objeto] [fuerza]` | `obj.jump(force)` |
| Aplicar fuerza | `fuerza [objeto] [x,y]` | `obj.addForce(vec2(x,y))` |
| Detener | `detener [objeto]` | `obj.vel = vec2(0,0)` |
| Velocidad | `velocidad [objeto] [x,y]` | `obj.vel = vec2(x,y)` |

### **🎵 Comandos de Audio**

| Comando Manual | Palabra Clave | Código Kaplay |
|----------------|---------------|---------------|
| Reproducir sonido | `sonido [nombre]` | `play("sound")` |
| Pausar música | `pausar música` | `music.pause()` |
| Cambiar volumen | `volumen [valor]` | `volume(valor)` |

### **🎮 Comandos de Entrada**

| Comando Manual | Palabra Clave | Código Kaplay |
|----------------|---------------|---------------|
| Detectar tecla | `tecla [key] hacer [acción]` | `onKeyPress("key", fn)` |
| Detectar click | `click hacer [acción]` | `onMousePress(fn)` |
| Detectar gamepad | `gamepad [botón] hacer [acción]` | `onGamepadPress("btn", fn)` |

### **🌍 Comandos de Escena**

| Comando Manual | Palabra Clave | Código Kaplay |
|----------------|---------------|---------------|
| Cambiar escena | `ir a [escena]` | `go("sceneName")` |
| Crear escena | `nueva escena [nombre]` | `scene("name", fn)` |
| Pausar juego | `pausar` | `debug.paused = true` |
| Reiniciar nivel | `reiniciar` | `go("currentScene")` |

### **📊 Comandos de Cámara**

| Comando Manual | Palabra Clave | Código Kaplay |
|----------------|---------------|---------------|
| Mover cámara | `cámara a [x,y]` | `camPos(vec2(x,y))` |
| Hacer zoom | `zoom [factor]` | `camScale(scale)` |
| Seguir objeto | `seguir [objeto]` | `obj.onUpdate(() => camPos(obj.pos))` |
| Rotar cámara | `rotar cámara [grados]` | `camRot(angle)` |

### **⚡ Comandos de Efectos**

| Comando Manual | Palabra Clave | Código Kaplay |
|----------------|---------------|---------------|
| Sacudir pantalla | `sacudir [intensidad]` | `shake(intensity)` |
| Flash pantalla | `flash [color] [duración]` | `flash(color, duration)` |
| Animar objeto | `animar [objeto] a [destino]` | `tween(obj.pos, target, time)` |
| Partículas | `partículas [config]` | `add([particles(config)])` |

---

## **🔧 Motor Propio (Fallback)**

### **📦 Comandos Básicos**

| Comando Manual | Palabra Clave | Código Interno |
|----------------|---------------|----------------|
| Crear objeto | `crear [tipo] en [x,y]` | `engine.create(type, x, y)` |
| Mover objeto | `mover [id] a [x,y]` | `engine.move(id, x, y)` |
| Eliminar objeto | `eliminar [id]` | `engine.destroy(id)` |
| Cambiar color | `color [id] [color]` | `engine.setColor(id, color)` |

---

## 💬 **Palabras Clave Humanizadas**

### **🎯 Sintaxis General**
```
[ACCIÓN] [OBJETO] [PARÁMETROS]
```

### **📝 Ejemplos de Uso**
```
crear jugador en 100,200
mover jugador a 300,400
color jugador rojo
sonido explosion
ir a menu_principal
zoom 2
```

### **🔄 Traducción a Código**

#### **Ejemplo 1: Crear Jugador**
```
Entrada: "crear jugador en 100,200"
Procesamiento:
  - Acción: crear
  - Objeto: jugador
  - Parámetros: x=100, y=200
Código: add([sprite("player"), pos(100, 200), body(), area()])
```

#### **Ejemplo 2: Mover Cámara**
```
Entrada: "cámara a 500,300"
Procesamiento:
  - Acción: cámara
  - Destino: x=500, y=300
Código: camPos(vec2(500, 300))
```

### **📚 Diccionario de Palabras Clave**

#### **🎮 Objetos**
- `jugador` → player sprite
- `enemigo` → enemy sprite
- `plataforma` → platform object
- `moneda` → coin collectible
- `puerta` → door object
- `fondo` → background

#### **🎨 Colores**
- `rojo` → rgb(255, 0, 0)
- `azul` → rgb(0, 0, 255)
- `verde` → rgb(0, 255, 0)
- `amarillo` → rgb(255, 255, 0)
- `negro` → rgb(0, 0, 0)
- `blanco` → rgb(255, 255, 255)

#### **⚡ Acciones**
- `crear` → add()
- `mover` → move() / pos =
- `eliminar` → destroy()
- `saltar` → jump()
- `correr` → move() with speed
- `atacar` → attack action

#### **🌍 Direcciones**
- `arriba` → vec2(0, -1)
- `abajo` → vec2(0, 1)
- `izquierda` → vec2(-1, 0)
- `derecha` → vec2(1, 0)
- `centro` → center()

---

## 🤖 **Modos de IA**

### **❓ Ask Mode (Modo Pregunta)**
La IA responde preguntas sobre comandos y funcionalidades.

#### **Ejemplos de Preguntas:**
```
Usuario: "¿Cómo creo un jugador?"
IA: "Puedes usar 'crear jugador en [x,y]' o arrastrar desde la toolbar"

Usuario: "¿Qué comandos de física hay?"
IA: "Tienes: gravedad, saltar, fuerza, velocidad, detener..."

Usuario: "¿Cómo hago que un objeto siga a otro?"
IA: "Usa 'seguir [objeto1] a [objeto2]' o el comando 'obj.onUpdate(() => obj.pos = target.pos)'"
```

### **🤖 Agent Mode (Modo Agente)**
La IA ejecuta acciones directamente en el motor.

#### **Ejemplos de Comandos:**
```
Usuario: "Crea un juego de plataformas básico"
IA: Ejecuta automáticamente:
  - crear jugador en 100,400
  - crear plataforma en 0,500
  - crear plataforma en 200,400
  - crear moneda en 300,350
  - gravedad jugador
  - tecla espacio hacer saltar jugador

Usuario: "Haz que el jugador sea más rápido"
IA: Ejecuta: velocidad jugador 200,0
```

### **🔄 Modo Híbrido**
Combina manual + IA según la situación.

```
Usuario trabaja manualmente → IA observa y sugiere
Usuario pregunta → IA responde (Ask Mode)
Usuario pide acción compleja → IA ejecuta (Agent Mode)
```

---

## 📋 **Comandos Universales**

### **🎯 Comandos que Funcionan en Todos los Motores**

| Comando | Descripción | Ejemplo |
|---------|-------------|---------|
| `ayuda` | Muestra ayuda contextual | `ayuda movimiento` |
| `lista` | Lista objetos disponibles | `lista objetos` |
| `info` | Información de objeto | `info jugador` |
| `guardar` | Guarda el proyecto | `guardar proyecto` |
| `cargar` | Carga un proyecto | `cargar proyecto1` |
| `exportar` | Exporta el juego | `exportar html5` |
| `deshacer` | Deshace última acción | `deshacer` |
| `rehacer` | Rehace acción | `rehacer` |

### **🔧 Comandos de Sistema**

| Comando | Descripción | Ejemplo |
|---------|-------------|---------|
| `motor` | Cambia motor gráfico | `motor kaplay` |
| `ia` | Cambia modo de IA | `ia deepseek` |
| `debug` | Activa modo debug | `debug on` |
| `fps` | Muestra FPS | `fps mostrar` |
| `consola` | Abre/cierra consola | `consola toggle` |

---

## 🔧 **Ejemplos Prácticos**

### **🎮 Ejemplo 1: Juego de Plataformas Simple**

#### **Modo Manual:**
1. Arrastra "Player" desde toolbar
2. Arrastra "Platform" y posiciona
3. Click en Player → Inspector → Enable Physics
4. Toolbar → Add Controls → Arrow Keys

#### **Modo Comandos:**
```
crear jugador en 100,400
crear plataforma en 0,500 tamaño 800,50
crear plataforma en 200,400 tamaño 200,20
gravedad jugador
tecla izquierda hacer mover jugador izquierda
tecla derecha hacer mover jugador derecha
tecla espacio hacer saltar jugador
```

#### **Modo IA Agent:**
```
Usuario: "Crea un juego de plataformas con un jugador que pueda saltar entre 3 plataformas"
IA: [Ejecuta automáticamente todos los comandos necesarios]
```

### **🎯 Ejemplo 2: Sistema de Colecciones**

#### **Modo Comandos:**
```
crear moneda en 300,350
crear moneda en 500,300
crear moneda en 700,250
cuando jugador toca moneda hacer:
  eliminar moneda
  sonido coin
  puntos +10
```

#### **Modo IA Ask:**
```
Usuario: "¿Cómo hago que las monedas desaparezcan cuando las toco?"
IA: "Usa el comando 'cuando [objeto1] toca [objeto2] hacer [acción]'. 
     Por ejemplo: 'cuando jugador toca moneda hacer eliminar moneda'"
```

### **🌟 Ejemplo 3: Efectos Visuales**

#### **Modo Comandos:**
```
cuando jugador salta hacer:
  partículas dust en jugador
  sonido jump
cuando enemigo muere hacer:
  flash pantalla rojo 0.2
  sacudir 5
  partículas explosion en enemigo
```

---

## 🎓 **Consejos y Mejores Prácticas**

### **✅ Recomendaciones**

1. **Combina Modos**: Usa manual para diseño, comandos para lógica, IA para ayuda
2. **Palabras Clave**: Aprende las palabras clave básicas para mayor velocidad
3. **Ask Mode**: Úsalo cuando no sepas cómo hacer algo
4. **Agent Mode**: Úsalo para tareas repetitivas o complejas
5. **Guarda Frecuentemente**: Usa `guardar` regularmente

### **⚠️ Errores Comunes**

1. **Sintaxis Incorrecta**: `crear jugador 100 200` ❌ → `crear jugador en 100,200` ✅
2. **Objetos Inexistentes**: Referencia a objetos que no existen
3. **Parámetros Faltantes**: `mover jugador` ❌ → `mover jugador a 200,300` ✅
4. **Modo IA Incorrecto**: Usar Agent para preguntas simples

### **🚀 Atajos Útiles**

| Atajo | Acción |
|-------|--------|
| `Ctrl + Z` | Deshacer |
| `Ctrl + Y` | Rehacer |
| `Ctrl + S` | Guardar |
| `F1` | Ayuda |
| `F5` | Ejecutar/Probar |
| `F12` | Debug Mode |
| `Tab` | Autocompletar comando |

---

## 📞 **Soporte y Recursos**

### **🔗 Enlaces Útiles**
- **Documentación Kaplay**: <mcreference link="https://kaplayjs.com/docs/" index="3">3</mcreference>
- **Ejemplos de Código**: `/examples/`
- **Comunidad Discord**: [Enlace al Discord]
- **Tutoriales Video**: [Enlace a YouTube]

### **❓ ¿Necesitas Ayuda?**
1. **Usa Ask Mode**: Pregunta directamente a la IA
2. **Comando `ayuda`**: `ayuda [tema]`
3. **Documentación**: Consulta esta guía
4. **Comunidad**: Únete al Discord

---

**🎉 ¡Feliz desarrollo de juegos!** 

> Recuerda: No hay una forma "correcta" de usar el motor. Experimenta con diferentes modos y encuentra tu flujo de trabajo ideal.