# Documentación de Traducción de Palabras Clave

## Introducción

Este documento explica cómo el sistema de palabras clave humanizadas traduce comandos en lenguaje natural (español) a código ejecutable para diferentes motores gráficos.

## Arquitectura del Sistema

### Componentes Principales

1. **KeywordSystem**: Clase principal que maneja la traducción
2. **Diccionario de Palabras Clave**: Mapeo de comandos naturales a funciones
3. **Generadores de Código**: Funciones específicas para cada motor gráfico

### Flujo de Traducción

```
Comando Natural → Análisis → Identificación → Generación → Código Ejecutable
```

## Categorías de Comandos

### 1. Creación de Objetos
| Palabra Clave | Parámetros | Código Kaplay | Código Custom |
|---------------|------------|---------------|---------------|
| `crear jugador` | x, y | `add([sprite("player"), pos(x, y), "player"])` | `createPlayer(x, y)` |
| `crear enemigo` | x, y | `add([sprite("enemy"), pos(x, y), "enemy"])` | `createEnemy(x, y)` |
| `crear plataforma` | x, y, w, h | `add([rect(w, h), pos(x, y), area(), solid()])` | `createPlatform(x, y, w, h)` |

### 2. Movimiento
| Palabra Clave | Parámetros | Código Kaplay | Código Custom |
|---------------|------------|---------------|---------------|
| `mover a` | objeto, x, y | `objeto.moveTo(x, y)` | `moveObject(objeto, x, y)` |
| `mover por` | objeto, dx, dy | `objeto.move(dx, dy)` | `moveObjectBy(objeto, dx, dy)` |
| `rotar` | objeto, ángulo | `objeto.angle = ángulo` | `rotateObject(objeto, ángulo)` |

### 3. Apariencia
| Palabra Clave | Parámetros | Código Kaplay | Código Custom |
|---------------|------------|---------------|---------------|
| `cambiar color` | objeto, color | `objeto.color = rgb(color)` | `changeColor(objeto, color)` |
| `cambiar tamaño` | objeto, escala | `objeto.scale = escala` | `changeScale(objeto, escala)` |
| `ocultar` | objeto | `objeto.hidden = true` | `hideObject(objeto)` |
| `mostrar` | objeto | `objeto.hidden = false` | `showObject(objeto)` |

### 4. Física
| Palabra Clave | Parámetros | Código Kaplay | Código Custom |
|---------------|------------|---------------|---------------|
| `aplicar gravedad` | objeto | `objeto.use(body())` | `applyGravity(objeto)` |
| `saltar` | objeto, fuerza | `objeto.jump(fuerza)` | `jumpObject(objeto, fuerza)` |
| `detener` | objeto | `objeto.vel = vec2(0, 0)` | `stopObject(objeto)` |

### 5. Controles
| Palabra Clave | Parámetros | Código Kaplay | Código Custom |
|---------------|------------|---------------|---------------|
| `al presionar` | tecla, acción | `onKeyPress(tecla, acción)` | `onKeyPress(tecla, acción)` |
| `mientras presiona` | tecla, acción | `onKeyDown(tecla, acción)` | `onKeyDown(tecla, acción)` |
| `al soltar` | tecla, acción | `onKeyRelease(tecla, acción)` | `onKeyRelease(tecla, acción)` |

## Sintaxis de Comandos

### Formato Básico
```
[acción] [objeto] [parámetros]
```

### Ejemplos de Uso

#### Comando Simple
```
Entrada: "crear jugador 100 200"
Salida Kaplay: add([sprite("player"), pos(100, 200), "player"])
Salida Custom: createPlayer(100, 200)
```

#### Comando con Múltiples Parámetros
```
Entrada: "crear plataforma 50 300 200 20"
Salida Kaplay: add([rect(200, 20), pos(50, 300), area(), solid()])
Salida Custom: createPlatform(50, 300, 200, 20)
```

#### Comando de Control
```
Entrada: "al presionar espacio jugador saltar 500"
Salida Kaplay: onKeyPress("space", () => { player.jump(500) })
Salida Custom: onKeyPress("space", () => { jumpObject(player, 500) })
```

## Procesamiento de Comandos

### 1. Análisis Léxico
- Separación de palabras
- Identificación de números y parámetros
- Normalización de texto

### 2. Análisis Sintáctico
- Identificación del verbo principal
- Extracción de objetos y parámetros
- Validación de sintaxis

### 3. Generación de Código
- Selección del motor gráfico activo
- Aplicación de plantillas de código
- Inserción de parámetros

## Extensibilidad

### Agregar Nuevas Palabras Clave

1. **Definir en el diccionario**:
```javascript
keywords.creation["crear moneda"] = {
    params: ["x", "y"],
    kaplay: (x, y) => `add([sprite("coin"), pos(${x}, ${y}), "coin"])`,
    custom: (x, y) => `createCoin(${x}, ${y})`
};
```

2. **Agregar documentación**:
```markdown
| `crear moneda` | x, y | `add([sprite("coin"), pos(x, y), "coin"])` | `createCoin(x, y)` |
```

### Agregar Nuevo Motor Gráfico

1. **Extender el sistema**:
```javascript
class KeywordSystem {
    generatePhaser(action, params) {
        // Implementar generación para Phaser
    }
}
```

2. **Actualizar diccionario**:
```javascript
keywords.creation["crear jugador"].phaser = (x, y) => `this.add.sprite(${x}, ${y}, "player")`;
```

## Manejo de Errores

### Tipos de Errores

1. **Comando no reconocido**
   - Mensaje: "Comando no reconocido: [comando]"
   - Sugerencias de comandos similares

2. **Parámetros incorrectos**
   - Mensaje: "Parámetros incorrectos para [comando]"
   - Formato esperado

3. **Motor no soportado**
   - Mensaje: "Comando no disponible para [motor]"
   - Alternativas disponibles

### Ejemplo de Manejo
```javascript
try {
    const code = keywordSystem.processCommand("crear jugador abc def");
} catch (error) {
    console.error("Error: Parámetros incorrectos. Esperado: crear jugador [x] [y]");
}
```

## Optimizaciones

### Cache de Comandos
- Almacenamiento de comandos frecuentes
- Reducción de tiempo de procesamiento

### Validación Previa
- Verificación de sintaxis antes de generar código
- Prevención de errores en tiempo de ejecución

### Sugerencias Inteligentes
- Autocompletado de comandos
- Corrección de errores tipográficos

## Casos de Uso Avanzados

### Comandos Compuestos
```
Entrada: "crear jugador 100 200 y aplicar gravedad"
Procesamiento: 
1. crear jugador 100 200
2. aplicar gravedad jugador
```

### Variables y Referencias
```
Entrada: "guardar jugador como miJugador"
Uso posterior: "mover miJugador a 300 400"
```

### Condicionales
```
Entrada: "si jugador toca enemigo entonces jugador perder vida"
Salida: onCollide("player", "enemy", () => { player.hurt() })
```

## Integración con IA

### Modo Ask
- La IA puede consultar comandos disponibles
- Explicación de sintaxis y parámetros
- Ejemplos de uso

### Modo Agent
- La IA puede generar comandos automáticamente
- Traducción de descripciones a comandos específicos
- Optimización de secuencias de comandos

### Ejemplo de Integración
```javascript
// Usuario pregunta a la IA
"¿Cómo creo un personaje que salte?"

// IA responde con comandos
"Puedes usar: 'crear jugador 100 200' y luego 'al presionar espacio jugador saltar 500'"

// Sistema traduce automáticamente
const code1 = keywordSystem.processCommand("crear jugador 100 200");
const code2 = keywordSystem.processCommand("al presionar espacio jugador saltar 500");
```

## Conclusión

El sistema de palabras clave humanizadas proporciona una interfaz intuitiva para la programación de juegos, permitiendo tanto a usuarios novatos como a la IA interactuar con diferentes motores gráficos usando lenguaje natural en español.

La arquitectura modular permite fácil extensión y mantenimiento, mientras que el manejo robusto de errores asegura una experiencia de usuario fluida.