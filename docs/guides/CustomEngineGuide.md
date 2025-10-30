# Guía del Motor Gráfico Personalizado (Offline)

## Introducción

El Motor Gráfico Personalizado es una implementación ligera diseñada para funcionar completamente offline, proporcionando funcionalidades básicas de desarrollo de juegos 2D cuando no hay conexión a internet o cuando se prefiere una solución independiente.

## Características Principales

- **100% Offline**: No requiere conexión a internet
- **Ligero**: Mínimas dependencias
- **Compatible**: API similar a motores populares
- **Extensible**: Fácil de modificar y expandir
- **Canvas nativo**: Utiliza HTML5 Canvas directamente

## Configuración Inicial

### Inicialización Básica
```javascript
// Crear instancia del motor
const engine = new CustomEngine({
    width: 800,
    height: 600,
    canvas: document.getElementById('gameCanvas'),
    backgroundColor: '#87CEEB'
});

// Inicializar el motor
engine.init();
```

### Configuración Avanzada
```javascript
const engine = new CustomEngine({
    width: 1024,
    height: 768,
    canvas: document.getElementById('gameCanvas'),
    backgroundColor: '#000000',
    debug: true,
    physics: {
        gravity: 980,
        friction: 0.8
    },
    audio: {
        enabled: true,
        volume: 0.7
    }
});
```

## Sistema de Objetos

### Creación de Objetos Básicos

#### Sprites
```javascript
// Crear sprite simple
const player = engine.createSprite({
    x: 100,
    y: 200,
    width: 32,
    height: 32,
    color: '#FF0000',
    tag: 'player'
});

// Sprite con imagen
const enemy = engine.createSprite({
    x: 300,
    y: 200,
    image: 'enemy.png',
    tag: 'enemy'
});
```

#### Rectángulos
```javascript
const platform = engine.createRect({
    x: 200,
    y: 400,
    width: 200,
    height: 20,
    color: '#00FF00',
    solid: true,
    tag: 'platform'
});
```

#### Círculos
```javascript
const coin = engine.createCircle({
    x: 150,
    y: 300,
    radius: 16,
    color: '#FFFF00',
    tag: 'coin'
});
```

#### Texto
```javascript
const scoreText = engine.createText({
    x: 20,
    y: 20,
    text: 'Score: 0',
    font: '20px Arial',
    color: '#FFFFFF',
    tag: 'ui'
});
```

### Propiedades de Objetos

#### Posición y Transformación
```javascript
// Mover objeto
player.moveTo(300, 400);
player.moveBy(50, -25);

// Escalar
player.scale = 2; // Doble tamaño
player.scaleX = 1.5; // Solo horizontal
player.scaleY = 0.8; // Solo vertical

// Rotar
player.rotation = 45; // Grados
player.rotate(15); // Rotar por incremento

// Visibilidad
player.visible = false; // Ocultar
player.opacity = 0.5; // Semi-transparente
```

#### Física Básica
```javascript
// Aplicar física
player.physics = true;
player.velocity = { x: 100, y: 0 };
player.acceleration = { x: 0, y: 980 }; // Gravedad

// Propiedades físicas
player.mass = 1;
player.friction = 0.8;
player.bounce = 0.3;
player.solid = true; // Colisiones sólidas
```

## Sistema de Entrada

### Teclado
```javascript
// Eventos de teclado
engine.input.onKeyPress('Space', () => {
    player.jump(500);
});

engine.input.onKeyDown('ArrowLeft', () => {
    player.velocity.x = -200;
});

engine.input.onKeyUp('ArrowRight', () => {
    player.velocity.x = 0;
});

// Verificar estado de tecla
if (engine.input.isKeyDown('KeyA')) {
    player.moveBy(-5, 0);
}
```

### Mouse
```javascript
// Eventos de mouse
engine.input.onMouseClick((x, y) => {
    console.log(`Click en: ${x}, ${y}`);
});

engine.input.onMouseMove((x, y) => {
    cursor.moveTo(x, y);
});

// Posición del mouse
const mousePos = engine.input.getMousePosition();
```

### Touch (Móvil)
```javascript
// Eventos táctiles
engine.input.onTouchStart((x, y) => {
    player.jump();
});

engine.input.onTouchMove((x, y) => {
    // Seguir el dedo
    player.moveTo(x, y);
});
```

## Sistema de Colisiones

### Detección de Colisiones
```javascript
// Colisión entre objetos específicos
engine.physics.onCollision(player, enemy, (playerObj, enemyObj) => {
    console.log('¡Colisión con enemigo!');
    playerObj.takeDamage(10);
});

// Colisión por tags
engine.physics.onCollisionByTag('player', 'coin', (player, coin) => {
    coin.destroy();
    addScore(100);
});

// Verificar colisión manual
if (engine.physics.checkCollision(player, platform)) {
    player.onGround = true;
}
```

### Tipos de Colisión
```javascript
// Colisión sólida (rebote)
platform.collisionType = 'solid';

// Colisión trigger (atravesable)
powerup.collisionType = 'trigger';

// Sin colisión
background.collisionType = 'none';
```

## Sistema de Audio

### Cargar y Reproducir Sonidos
```javascript
// Cargar sonidos
engine.audio.load('jump', 'sounds/jump.wav');
engine.audio.load('music', 'sounds/background.mp3');

// Reproducir
engine.audio.play('jump');

// Reproducir con opciones
engine.audio.play('music', {
    loop: true,
    volume: 0.5
});

// Control de audio
const music = engine.audio.play('background');
music.pause();
music.resume();
music.stop();
music.volume = 0.3;
```

## Sistema de Escenas

### Gestión de Escenas
```javascript
// Crear escena
engine.scene.create('menu', () => {
    const title = engine.createText({
        x: 400,
        y: 200,
        text: 'Mi Juego',
        font: '48px Arial',
        color: '#FFFFFF'
    });
    
    const startButton = engine.createRect({
        x: 350,
        y: 300,
        width: 100,
        height: 40,
        color: '#0080FF',
        tag: 'button'
    });
    
    engine.input.onMouseClick((x, y) => {
        if (startButton.containsPoint(x, y)) {
            engine.scene.switch('game');
        }
    });
});

engine.scene.create('game', () => {
    // Lógica del juego principal
    setupGameObjects();
    setupGameLogic();
});

// Cambiar escena
engine.scene.switch('menu');
```

### Datos Entre Escenas
```javascript
// Pasar datos a escena
engine.scene.switch('game', { level: 2, score: 1500 });

// Recibir datos en escena
engine.scene.create('game', (data) => {
    const level = data.level || 1;
    const score = data.score || 0;
    
    setupLevel(level);
    updateScore(score);
});
```

## Sistema de Cámara

### Control de Cámara
```javascript
// Seguir objeto
engine.camera.follow(player);

// Posición manual
engine.camera.setPosition(400, 300);

// Zoom
engine.camera.setZoom(2); // Zoom 2x
engine.camera.zoom(1.5); // Zoom relativo

// Límites de cámara
engine.camera.setBounds(0, 0, 2000, 1000);

// Suavizado
engine.camera.setSmoothing(0.1); // Más suave
```

### Efectos de Cámara
```javascript
// Shake (temblor)
engine.camera.shake(10, 0.5); // Intensidad 10, duración 0.5s

// Fade
engine.camera.fadeOut(1); // Fade out en 1 segundo
engine.camera.fadeIn(1); // Fade in en 1 segundo

// Flash
engine.camera.flash('#FFFFFF', 0.2); // Flash blanco
```

## Animaciones

### Animaciones de Propiedades
```javascript
// Mover suavemente
engine.animate(player, 'x', 300, 1000); // A x=300 en 1 segundo

// Múltiples propiedades
engine.animate(player, {
    x: 300,
    y: 200,
    scale: 2
}, 1500);

// Con callback
engine.animate(player, 'rotation', 360, 1000, () => {
    console.log('Rotación completada');
});
```

### Animaciones de Sprites
```javascript
// Definir animación
player.addAnimation('walk', [0, 1, 2, 3], 8); // Frames 0-3, 8 FPS
player.addAnimation('idle', [4], 1);

// Reproducir animación
player.playAnimation('walk');
player.playAnimation('idle');

// Eventos de animación
player.onAnimationEnd('attack', () => {
    player.playAnimation('idle');
});
```

## Utilidades

### Matemáticas
```javascript
// Distancia entre puntos
const distance = engine.math.distance(player.x, player.y, enemy.x, enemy.y);

// Ángulo entre puntos
const angle = engine.math.angle(player.x, player.y, target.x, target.y);

// Números aleatorios
const randomInt = engine.math.randomInt(1, 10);
const randomFloat = engine.math.random(0.5, 2.0);

// Interpolación
const lerped = engine.math.lerp(0, 100, 0.5); // 50
```

### Tiempo
```javascript
// Tiempo transcurrido
const deltaTime = engine.time.deltaTime;
const totalTime = engine.time.totalTime;

// Temporizadores
engine.time.setTimeout(() => {
    console.log('2 segundos después');
}, 2000);

engine.time.setInterval(() => {
    spawnEnemy();
}, 5000);

// FPS
const fps = engine.time.getFPS();
```

### Utilidades de Juego
```javascript
// Verificar si objeto está en pantalla
if (engine.utils.isOnScreen(enemy)) {
    enemy.update();
}

// Obtener objetos por tag
const enemies = engine.utils.getObjectsByTag('enemy');
const coins = engine.utils.getObjectsByTag('coin');

// Destruir objeto
enemy.destroy();

// Clonar objeto
const newEnemy = engine.utils.clone(enemy);
```

## Debugging

### Herramientas de Debug
```javascript
// Activar modo debug
engine.debug.enabled = true;

// Mostrar información
engine.debug.showFPS = true;
engine.debug.showColliders = true;
engine.debug.showGrid = true;

// Log personalizado
engine.debug.log('Player position:', player.x, player.y);
engine.debug.warn('Low health!');
engine.debug.error('Game over!');

// Dibujar formas de debug
engine.debug.drawRect(100, 100, 50, 30, '#FF0000');
engine.debug.drawCircle(200, 200, 25, '#00FF00');
engine.debug.drawLine(0, 0, 100, 100, '#0000FF');
```

## Optimización

### Mejores Prácticas
```javascript
// Pool de objetos
class BulletPool {
    constructor(size) {
        this.pool = [];
        for (let i = 0; i < size; i++) {
            this.pool.push(this.createBullet());
        }
    }
    
    getBullet() {
        if (this.pool.length > 0) {
            return this.pool.pop();
        }
        return this.createBullet();
    }
    
    returnBullet(bullet) {
        bullet.visible = false;
        this.pool.push(bullet);
    }
    
    createBullet() {
        return engine.createCircle({
            radius: 3,
            color: '#FFFF00',
            tag: 'bullet'
        });
    }
}

// Culling (no actualizar objetos fuera de pantalla)
engine.onUpdate(() => {
    enemies.forEach(enemy => {
        if (engine.utils.isOnScreen(enemy)) {
            enemy.update();
        }
    });
});

// Limitar objetos
if (bullets.length > 100) {
    bullets.shift().destroy(); // Eliminar el más antiguo
}
```

## Ejemplos Completos

### Juego de Plataformas Simple
```javascript
// Configuración
const engine = new CustomEngine({
    width: 800,
    height: 600,
    canvas: document.getElementById('gameCanvas')
});

engine.init();

// Crear escena de juego
engine.scene.create('game', () => {
    // Jugador
    const player = engine.createRect({
        x: 100,
        y: 100,
        width: 32,
        height: 32,
        color: '#FF0000',
        physics: true,
        tag: 'player'
    });
    
    // Plataforma
    const platform = engine.createRect({
        x: 0,
        y: 550,
        width: 800,
        height: 50,
        color: '#00FF00',
        solid: true,
        tag: 'platform'
    });
    
    // Controles
    engine.input.onKeyDown('ArrowLeft', () => {
        player.velocity.x = -200;
    });
    
    engine.input.onKeyDown('ArrowRight', () => {
        player.velocity.x = 200;
    });
    
    engine.input.onKeyPress('Space', () => {
        if (player.onGround) {
            player.velocity.y = -500;
        }
    });
    
    // Cámara
    engine.camera.follow(player);
    
    // Colisiones
    engine.physics.onCollision(player, platform, () => {
        player.onGround = true;
    });
});

// Iniciar juego
engine.scene.switch('game');
```

### Sistema de Puntuación
```javascript
let score = 0;

const scoreDisplay = engine.createText({
    x: 20,
    y: 20,
    text: 'Score: 0',
    font: '24px Arial',
    color: '#FFFFFF',
    fixed: true // No se mueve con la cámara
});

function addScore(points) {
    score += points;
    scoreDisplay.text = `Score: ${score}`;
    
    // Efecto visual
    engine.animate(scoreDisplay, 'scale', 1.2, 100, () => {
        engine.animate(scoreDisplay, 'scale', 1, 100);
    });
}

// Recoger monedas
engine.physics.onCollisionByTag('player', 'coin', (player, coin) => {
    coin.destroy();
    addScore(100);
    engine.audio.play('coin');
});
```

## Extensiones

### Crear Componentes Personalizados
```javascript
// Componente de salud
class HealthComponent {
    constructor(maxHealth) {
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
    }
    
    takeDamage(amount) {
        this.currentHealth -= amount;
        if (this.currentHealth <= 0) {
            this.die();
        }
    }
    
    heal(amount) {
        this.currentHealth = Math.min(this.maxHealth, this.currentHealth + amount);
    }
    
    die() {
        // Lógica de muerte
        console.log('¡Objeto destruido!');
    }
}

// Usar componente
player.addComponent('health', new HealthComponent(100));
player.health.takeDamage(25);
```

### Plugins
```javascript
// Plugin de partículas
const ParticlePlugin = {
    install(engine) {
        engine.particles = {
            create(x, y, options = {}) {
                const particle = engine.createCircle({
                    x: x,
                    y: y,
                    radius: options.size || 2,
                    color: options.color || '#FFFFFF',
                    physics: true
                });
                
                particle.velocity = options.velocity || { x: 0, y: -100 };
                particle.lifespan = options.lifespan || 1000;
                
                engine.time.setTimeout(() => {
                    particle.destroy();
                }, particle.lifespan);
                
                return particle;
            }
        };
    }
};

// Instalar plugin
engine.use(ParticlePlugin);

// Usar plugin
engine.particles.create(100, 200, {
    size: 5,
    color: '#FF0000',
    velocity: { x: 50, y: -200 },
    lifespan: 2000
});
```

## Conclusión

El Motor Gráfico Personalizado proporciona una base sólida para el desarrollo de juegos 2D offline. Aunque es más básico que motores comerciales, ofrece la flexibilidad de ser completamente personalizable y no depende de servicios externos.

### Ventajas
- ✅ Completamente offline
- ✅ Ligero y rápido
- ✅ Fácil de entender y modificar
- ✅ Sin dependencias externas
- ✅ API familiar

### Limitaciones
- ❌ Funcionalidades más básicas que motores comerciales
- ❌ Requiere más código manual para funciones avanzadas
- ❌ Sin herramientas visuales de desarrollo
- ❌ Comunidad más pequeña

### Casos de Uso Ideales
- Prototipos rápidos
- Juegos educativos
- Proyectos offline
- Aprendizaje de desarrollo de motores
- Juegos simples 2D