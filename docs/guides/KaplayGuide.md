# Guía Completa del Motor Kaplay

## Introducción

Kaplay es un motor de juegos 2D moderno y fácil de usar, diseñado para crear juegos web de manera rápida y eficiente. Esta guía te ayudará a dominar todas las funcionalidades del motor.

## Configuración Inicial

### Instalación
```javascript
// Incluir Kaplay en tu proyecto
import kaplay from "kaplay";

// Inicializar el motor
const k = kaplay({
    width: 800,
    height: 600,
    background: [0, 0, 0], // Color de fondo negro
    font: "Arial",
    global: true // Hace las funciones globales
});
```

### Configuración Avanzada
```javascript
const k = kaplay({
    width: 1024,
    height: 768,
    scale: 1,
    stretch: true,
    letterbox: true,
    debug: true,
    background: [135, 206, 235], // Azul cielo
    font: "monospace",
    canvas: document.querySelector("#game-canvas"),
    root: document.body,
    global: false,
    touchToMouse: true,
    loadingScreen: true,
    logMax: 8
});
```

## Gestión de Recursos

### Carga de Sprites
```javascript
// Sprite simple
loadSprite("player", "sprites/player.png");

// Sprite con configuración
loadSprite("enemy", "sprites/enemy.png", {
    sliceX: 4, // 4 frames horizontales
    sliceY: 2, // 2 frames verticales
    anims: {
        idle: { from: 0, to: 3, loop: true, speed: 8 },
        walk: { from: 4, to: 7, loop: true, speed: 12 }
    }
});

// Atlas de sprites
loadSpriteAtlas("characters", "sprites/atlas.png", {
    "player": { x: 0, y: 0, width: 32, height: 32 },
    "enemy": { x: 32, y: 0, width: 32, height: 32 }
});
```

### Carga de Audio
```javascript
// Sonidos
loadSound("jump", "sounds/jump.wav");
loadSound("music", "sounds/background.mp3");

// Música con configuración
loadMusic("theme", "music/theme.ogg", {
    volume: 0.7,
    loop: true
});
```

### Carga de Fuentes
```javascript
loadFont("pixel", "fonts/pixel.ttf");
loadBitmapFont("arcade", "fonts/arcade.png", 8, 8);
```

## Creación de Objetos

### Objetos Básicos
```javascript
// Sprite simple
const player = add([
    sprite("player"),
    pos(100, 100),
    area(),
    body(),
    "player" // Tag
]);

// Rectángulo
const platform = add([
    rect(200, 20),
    pos(300, 400),
    area(),
    solid(),
    color(0, 255, 0),
    "platform"
]);

// Círculo
const coin = add([
    circle(16),
    pos(150, 200),
    area(),
    color(255, 255, 0),
    "coin"
]);

// Texto
const score = add([
    text("Score: 0"),
    pos(20, 20),
    color(255, 255, 255),
    "ui"
]);
```

### Objetos Avanzados
```javascript
// Personaje completo
const hero = add([
    sprite("player", { anim: "idle" }),
    pos(100, 300),
    area({ width: 24, height: 32 }),
    body({ jumpForce: 640 }),
    health(100),
    scale(2),
    rotate(0),
    opacity(1),
    z(10),
    "player",
    "hero",
    {
        // Propiedades personalizadas
        speed: 200,
        lives: 3,
        invulnerable: false
    }
]);
```

## Componentes Principales

### Posición y Transformación
```javascript
// Posición
obj.pos = vec2(100, 200);
obj.moveTo(300, 400);
obj.moveBy(50, -25);

// Escala
obj.scale = vec2(2, 2); // Doble tamaño
obj.scaleTo(1.5); // Escala uniforme

// Rotación
obj.angle = 45; // Grados
obj.rotateTo(90);
obj.rotateBy(15);

// Opacidad
obj.opacity = 0.5; // Semi-transparente
obj.fadeIn(1); // Aparecer en 1 segundo
obj.fadeOut(0.5); // Desaparecer en 0.5 segundos
```

### Física
```javascript
// Cuerpo físico
obj.use(body({
    jumpForce: 640,
    maxVel: 2400,
    gravityScale: 1,
    isStatic: false
}));

// Movimiento
obj.jump(); // Saltar
obj.jump(800); // Saltar con fuerza específica
obj.vel = vec2(200, 0); // Velocidad directa
obj.move(100, 0); // Mover por frame

// Gravedad
obj.gravityScale = 0.5; // Gravedad reducida
obj.gravityScale = 0; // Sin gravedad
```

### Colisiones
```javascript
// Área de colisión
obj.use(area({
    width: 32,
    height: 32,
    offset: vec2(0, 0)
}));

// Sólido (no atravesable)
obj.use(solid());

// Eventos de colisión
obj.onCollide("enemy", (enemy) => {
    // Colisión con enemigo
    player.hurt(10);
});

obj.onCollideUpdate("platform", (platform) => {
    // Mientras está en contacto con plataforma
    player.grounded = true;
});

obj.onCollideEnd("powerup", (powerup) => {
    // Al dejar de tocar powerup
    powerup.destroy();
});
```

## Sistema de Entrada

### Teclado
```javascript
// Eventos de teclas
onKeyPress("space", () => {
    player.jump();
});

onKeyDown("left", () => {
    player.move(-200, 0);
});

onKeyRelease("right", () => {
    player.vel.x = 0;
});

// Múltiples teclas
onKeyPress(["w", "up"], () => {
    player.jump();
});

// Verificar estado de tecla
if (isKeyDown("a")) {
    player.move(-speed, 0);
}
```

### Mouse
```javascript
// Eventos de mouse
onMousePress(() => {
    const mousePos = mousePos();
    shoot(mousePos);
});

onMouseMove(() => {
    cursor.pos = mousePos();
});

// Botones específicos
onMousePress("left", () => {
    // Clic izquierdo
});

onMousePress("right", () => {
    // Clic derecho
});
```

### Gamepad
```javascript
// Eventos de gamepad
onGamepadPress("south", () => {
    player.jump();
});

onGamepadStick("left", (stick) => {
    player.move(stick.x * 200, 0);
});
```

## Animaciones

### Animaciones de Sprite
```javascript
// Reproducir animación
player.play("walk");
player.play("idle");

// Eventos de animación
player.onAnimEnd("attack", () => {
    player.play("idle");
});

// Control de animación
player.animSpeed = 0.5; // Velocidad reducida
player.flipX = true; // Voltear horizontalmente
player.flipY = false; // No voltear verticalmente
```

### Tweening
```javascript
// Mover suavemente
tween(obj.pos.x, 300, 1, (val) => {
    obj.pos.x = val;
}, easings.easeOutBounce);

// Escalar
tween(obj.scale, vec2(2, 2), 0.5, (val) => {
    obj.scale = val;
});

// Rotar
tween(obj.angle, 360, 2, (val) => {
    obj.angle = val;
}, easings.linear);
```

## Audio

### Reproducción de Sonidos
```javascript
// Reproducir sonido
play("jump");

// Con configuración
play("music", {
    volume: 0.8,
    speed: 1.2,
    loop: true
});

// Control de audio
const music = play("theme");
music.pause();
music.resume();
music.stop();
music.volume = 0.5;
```

### Audio Espacial
```javascript
// Sonido posicional
play("explosion", {
    pos: enemy.pos,
    volume: 0.7
});
```

## Escenas

### Gestión de Escenas
```javascript
// Definir escena
scene("menu", () => {
    add([
        text("Presiona ENTER para jugar"),
        pos(center()),
        anchor("center")
    ]);
    
    onKeyPress("enter", () => {
        go("game");
    });
});

scene("game", () => {
    // Lógica del juego
    const player = add([
        sprite("player"),
        pos(100, 100),
        area(),
        body(),
        "player"
    ]);
});

// Cambiar de escena
go("menu");
go("game", { level: 1, score: 100 }); // Con datos
```

### Datos Entre Escenas
```javascript
scene("game", (data) => {
    const level = data.level || 1;
    const score = data.score || 0;
    
    // Usar datos...
});
```

## Cámara

### Control de Cámara
```javascript
// Seguir objeto
camFollow(player);

// Posición manual
camPos(vec2(400, 300));

// Zoom
camScale(vec2(2, 2)); // Zoom 2x
camScale(1.5); // Zoom uniforme

// Rotación
camRot(45); // Rotar 45 grados

// Límites
camFollow(player, {
    lerpFactor: 0.1, // Suavidad
    offset: vec2(0, -100) // Offset
});
```

### Efectos de Cámara
```javascript
// Shake (temblor)
shake(12); // Intensidad 12
shake(8, 0.5); // Intensidad 8 por 0.5 segundos

// Flash
flash(255, 255, 255, 0.3); // Flash blanco
```

## Efectos Visuales

### Partículas
```javascript
// Sistema de partículas básico
function createExplosion(pos) {
    for (let i = 0; i < 20; i++) {
        add([
            circle(rand(2, 6)),
            pos.add(rand(-10, 10), rand(-10, 10)),
            color(255, rand(100, 255), 0),
            lifespan(rand(0.5, 1.5)),
            move(rand(-200, 200), rand(-300, -100))
        ]);
    }
}
```

### Shaders
```javascript
// Shader personalizado
loadShader("wave", null, `
    uniform float u_time;
    vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
        vec2 offset = vec2(sin(u_time + uv.y * 10.0) * 0.01, 0.0);
        return texture2D(tex, uv + offset) * color;
    }
`);

// Usar shader
obj.use(shader("wave"));
```

## Utilidades

### Matemáticas
```javascript
// Vectores
const v1 = vec2(100, 200);
const v2 = vec2(50, 75);
const sum = v1.add(v2);
const distance = v1.dist(v2);
const normalized = v1.unit();

// Números aleatorios
const randomInt = randi(1, 10); // Entero entre 1 y 10
const randomFloat = rand(0.5, 2.0); // Float entre 0.5 y 2.0
const choice = choose(["red", "blue", "green"]); // Elegir aleatoriamente

// Interpolación
const lerped = lerp(0, 100, 0.5); // 50
const mapped = map(value, 0, 100, 0, 1); // Mapear rango
```

### Tiempo
```javascript
// Tiempo del juego
const currentTime = time();
const deltaTime = dt();

// Temporizadores
wait(2, () => {
    // Ejecutar después de 2 segundos
});

loop(1, () => {
    // Ejecutar cada segundo
});
```

### Geometría
```javascript
// Verificar punto en área
const isInside = testRectPoint(rect, point);
const collision = testRectRect(rect1, rect2);

// Líneas
const intersection = testLineLineIntersection(line1, line2);
```

## Debugging

### Herramientas de Debug
```javascript
// Mostrar información de debug
debug.inspect = true; // Mostrar inspector
debug.timeScale = 0.5; // Ralentizar tiempo
debug.showLog = true; // Mostrar log en pantalla
debug.fps = () => getFPS(); // Mostrar FPS

// Dibujar formas de debug
drawRect({
    width: 100,
    height: 50,
    pos: vec2(200, 200),
    color: rgb(255, 0, 0)
});

drawCircle({
    radius: 30,
    pos: mousePos(),
    color: rgb(0, 255, 0)
});
```

### Logging
```javascript
// Diferentes niveles de log
debug("Información de debug");
warn("Advertencia");
error("Error crítico");

// Log con objetos
debug("Player position:", player.pos);
```

## Optimización

### Mejores Prácticas
```javascript
// Pool de objetos para evitar garbage collection
const bulletPool = [];

function getBullet() {
    if (bulletPool.length > 0) {
        return bulletPool.pop();
    }
    return add([
        circle(3),
        area(),
        move(0, -400),
        "bullet"
    ]);
}

function returnBullet(bullet) {
    bullet.hidden = true;
    bulletPool.push(bullet);
}

// Limitar objetos en pantalla
onUpdate("enemy", (enemy) => {
    if (enemy.pos.y > height() + 100) {
        enemy.destroy();
    }
});

// Usar tags para consultas eficientes
const enemies = get("enemy");
const powerups = get("powerup");
```

### Gestión de Memoria
```javascript
// Destruir objetos cuando no se necesiten
obj.onDestroy(() => {
    // Limpiar referencias
    clearInterval(obj.timer);
});

// Evitar crear objetos en loops
// ❌ Malo
onUpdate(() => {
    const newPos = vec2(x, y); // Crea vector cada frame
});

// ✅ Bueno
const tempPos = vec2(0, 0);
onUpdate(() => {
    tempPos.x = x;
    tempPos.y = y;
});
```

## Ejemplos Completos

### Juego de Plataformas Básico
```javascript
// Configuración
kaplay({
    width: 800,
    height: 600,
    background: [135, 206, 235]
});

// Recursos
loadSprite("player", "sprites/player.png");
loadSprite("platform", "sprites/platform.png");

// Escena principal
scene("game", () => {
    // Jugador
    const player = add([
        sprite("player"),
        pos(100, 100),
        area(),
        body(),
        "player"
    ]);
    
    // Plataformas
    add([
        rect(800, 40),
        pos(0, 560),
        area(),
        solid(),
        color(0, 255, 0)
    ]);
    
    // Controles
    onKeyDown("left", () => {
        player.move(-200, 0);
    });
    
    onKeyDown("right", () => {
        player.move(200, 0);
    });
    
    onKeyPress("space", () => {
        if (player.isGrounded()) {
            player.jump();
        }
    });
    
    // Cámara
    camFollow(player);
});

// Iniciar
go("game");
```

### Sistema de Puntuación
```javascript
let score = 0;

const scoreText = add([
    text("Score: 0"),
    pos(20, 20),
    color(255, 255, 255),
    fixed(), // No se mueve con la cámara
    z(100)
]);

function addScore(points) {
    score += points;
    scoreText.text = `Score: ${score}`;
    
    // Efecto visual
    tween(scoreText.scale, vec2(1.2, 1.2), 0.1, (val) => {
        scoreText.scale = val;
    }).then(() => {
        tween(scoreText.scale, vec2(1, 1), 0.1, (val) => {
            scoreText.scale = val;
        });
    });
}
```

## Conclusión

Kaplay es un motor potente y flexible que permite crear juegos 2D de alta calidad con relativa facilidad. Esta guía cubre los aspectos fundamentales, pero el motor ofrece muchas más funcionalidades avanzadas para explorar.

### Recursos Adicionales
- [Documentación oficial de Kaplay](https://kaplayjs.com)
- [Ejemplos en GitHub](https://github.com/kaplayjs/kaplay/tree/main/examples)
- [Comunidad en Discord](https://discord.gg/kaplay)

### Próximos Pasos
1. Experimenta con los ejemplos básicos
2. Crea tu primer juego simple
3. Explora funcionalidades avanzadas como shaders
4. Únete a la comunidad para obtener ayuda y compartir proyectos