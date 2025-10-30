/**
 * 🎮 Motor Gráfico Propio - Fallback Offline
 * 
 * Motor básico personalizado que funciona sin conexión a internet.
 * Incluye funcionalidades esenciales para desarrollo de juegos 2D.
 */

class CustomEngine {
    constructor(config = {}) {
        this.config = {
            width: config.width || 800,
            height: config.height || 600,
            background: config.background || '#2d3748',
            debug: config.debug || false,
            fps: config.fps || 60,
            ...config
        };

        this.canvas = null;
        this.ctx = null;
        this.gameObjects = new Map();
        this.scenes = new Map();
        this.currentScene = null;
        this.isRunning = false;
        this.lastTime = 0;
        this.deltaTime = 0;
        this.frameCount = 0;
        
        // Sistemas
        this.input = new InputSystem();
        this.physics = new PhysicsSystem();
        this.audio = new AudioSystem();
        this.camera = new CameraSystem();
        
        this.init();
    }

    /**
     * 🔧 Inicializa el motor
     */
    init() {
        this.createCanvas();
        this.setupEventListeners();
        console.log('✅ Motor Propio inicializado');
    }

    /**
     * 🖼️ Crea el canvas principal
     */
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.config.width;
        this.canvas.height = this.config.height;
        this.canvas.style.background = this.config.background;
        this.canvas.style.border = '1px solid #4a5568';
        this.canvas.id = 'custom-engine-canvas';
        
        this.ctx = this.canvas.getContext('2d');
        
        // Agregar al DOM
        const container = document.getElementById('game-container') || document.body;
        container.appendChild(this.canvas);
    }

    /**
     * 🎮 Configura event listeners
     */
    setupEventListeners() {
        // Input del teclado
        window.addEventListener('keydown', (e) => this.input.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.input.handleKeyUp(e));
        
        // Input del mouse
        this.canvas.addEventListener('mousedown', (e) => this.input.handleMouseDown(e));
        this.canvas.addEventListener('mouseup', (e) => this.input.handleMouseUp(e));
        this.canvas.addEventListener('mousemove', (e) => this.input.handleMouseMove(e));
        
        // Redimensionamiento
        window.addEventListener('resize', () => this.handleResize());
    }

    /**
     * 📦 Crea un objeto de juego
     */
    add(components = []) {
        const id = this.generateId();
        const gameObject = new GameObject(id, components);
        this.gameObjects.set(id, gameObject);
        return gameObject;
    }

    /**
     * 🗑️ Elimina un objeto de juego
     */
    destroy(gameObject) {
        if (typeof gameObject === 'string') {
            this.gameObjects.delete(gameObject);
        } else if (gameObject && gameObject.id) {
            this.gameObjects.delete(gameObject.id);
        }
    }

    /**
     * 🎬 Crea una escena
     */
    scene(name, setupFunction) {
        this.scenes.set(name, setupFunction);
    }

    /**
     * 🎯 Cambia a una escena
     */
    go(sceneName) {
        if (this.scenes.has(sceneName)) {
            // Limpiar objetos actuales
            this.gameObjects.clear();
            
            // Ejecutar setup de la nueva escena
            this.currentScene = sceneName;
            this.scenes.get(sceneName)();
            
            console.log(`🎬 Cambiado a escena: ${sceneName}`);
        } else {
            console.error(`❌ Escena '${sceneName}' no encontrada`);
        }
    }

    /**
     * ▶️ Inicia el loop del juego
     */
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.lastTime = performance.now();
        this.gameLoop();
        
        console.log('🚀 Motor iniciado');
    }

    /**
     * ⏸️ Pausa el juego
     */
    pause() {
        this.isRunning = false;
        console.log('⏸️ Motor pausado');
    }

    /**
     * 🔄 Loop principal del juego
     */
    gameLoop() {
        if (!this.isRunning) return;

        const currentTime = performance.now();
        this.deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        this.frameCount++;

        // Actualizar sistemas
        this.update();
        this.render();

        // Continuar loop
        requestAnimationFrame(() => this.gameLoop());
    }

    /**
     * 🔄 Actualiza la lógica del juego
     */
    update() {
        // Actualizar física
        this.physics.update(this.deltaTime);
        
        // Actualizar objetos
        this.gameObjects.forEach(obj => {
            if (obj.update) {
                obj.update(this.deltaTime);
            }
        });
        
        // Actualizar input
        this.input.update();
    }

    /**
     * 🎨 Renderiza el juego
     */
    render() {
        // Limpiar canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Aplicar transformaciones de cámara
        this.ctx.save();
        this.camera.apply(this.ctx);
        
        // Renderizar objetos
        this.gameObjects.forEach(obj => {
            if (obj.render) {
                obj.render(this.ctx);
            }
        });
        
        this.ctx.restore();
        
        // Debug info
        if (this.config.debug) {
            this.renderDebugInfo();
        }
    }

    /**
     * 🐛 Renderiza información de debug
     */
    renderDebugInfo() {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '12px monospace';
        this.ctx.fillText(`FPS: ${Math.round(1 / this.deltaTime)}`, 10, 20);
        this.ctx.fillText(`Objects: ${this.gameObjects.size}`, 10, 35);
        this.ctx.fillText(`Scene: ${this.currentScene || 'None'}`, 10, 50);
    }

    /**
     * 📏 Maneja redimensionamiento
     */
    handleResize() {
        // Mantener aspect ratio si es necesario
        // Por ahora, mantener tamaño fijo
    }

    /**
     * 🆔 Genera ID único
     */
    generateId() {
        return `obj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * 🧹 Limpia recursos
     */
    destroy() {
        this.pause();
        this.gameObjects.clear();
        this.scenes.clear();
        
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        
        console.log('🧹 Motor destruido');
    }
}

/**
 * 🎮 Objeto de Juego
 */
class GameObject {
    constructor(id, components = []) {
        this.id = id;
        this.pos = { x: 0, y: 0 };
        this.scale = { x: 1, y: 1 };
        this.angle = 0;
        this.color = '#ffffff';
        this.visible = true;
        this.components = new Map();
        
        // Agregar componentes
        components.forEach(comp => this.addComponent(comp));
    }

    addComponent(component) {
        if (component.type) {
            this.components.set(component.type, component);
            component.gameObject = this;
        }
    }

    getComponent(type) {
        return this.components.get(type);
    }

    update(deltaTime) {
        this.components.forEach(comp => {
            if (comp.update) {
                comp.update(deltaTime);
            }
        });
    }

    render(ctx) {
        if (!this.visible) return;

        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.angle);
        ctx.scale(this.scale.x, this.scale.y);

        this.components.forEach(comp => {
            if (comp.render) {
                comp.render(ctx);
            }
        });

        ctx.restore();
    }
}

/**
 * 🎮 Sistema de Input
 */
class InputSystem {
    constructor() {
        this.keys = new Set();
        this.mouse = { x: 0, y: 0, buttons: new Set() };
    }

    handleKeyDown(e) {
        this.keys.add(e.code);
    }

    handleKeyUp(e) {
        this.keys.delete(e.code);
    }

    handleMouseDown(e) {
        this.mouse.buttons.add(e.button);
        this.updateMousePos(e);
    }

    handleMouseUp(e) {
        this.mouse.buttons.delete(e.button);
        this.updateMousePos(e);
    }

    handleMouseMove(e) {
        this.updateMousePos(e);
    }

    updateMousePos(e) {
        const rect = e.target.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
    }

    isKeyPressed(key) {
        return this.keys.has(key);
    }

    isMousePressed(button = 0) {
        return this.mouse.buttons.has(button);
    }

    update() {
        // Limpiar eventos de un frame
    }
}

/**
 * ⚡ Sistema de Física Básica
 */
class PhysicsSystem {
    constructor() {
        this.gravity = { x: 0, y: 980 }; // pixels/s²
        this.bodies = new Set();
    }

    addBody(gameObject) {
        if (!gameObject.velocity) {
            gameObject.velocity = { x: 0, y: 0 };
        }
        this.bodies.add(gameObject);
    }

    removeBody(gameObject) {
        this.bodies.delete(gameObject);
    }

    update(deltaTime) {
        this.bodies.forEach(body => {
            // Aplicar gravedad
            body.velocity.y += this.gravity.y * deltaTime;
            
            // Actualizar posición
            body.pos.x += body.velocity.x * deltaTime;
            body.pos.y += body.velocity.y * deltaTime;
        });
    }
}

/**
 * 🔊 Sistema de Audio Básico
 */
class AudioSystem {
    constructor() {
        this.sounds = new Map();
        this.volume = 1.0;
    }

    loadSound(name, url) {
        const audio = new Audio(url);
        this.sounds.set(name, audio);
    }

    play(name) {
        const sound = this.sounds.get(name);
        if (sound) {
            sound.volume = this.volume;
            sound.currentTime = 0;
            sound.play().catch(e => console.warn('Error playing sound:', e));
        }
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }
}

/**
 * 📷 Sistema de Cámara
 */
class CameraSystem {
    constructor() {
        this.pos = { x: 0, y: 0 };
        this.scale = 1;
        this.angle = 0;
    }

    apply(ctx) {
        ctx.translate(-this.pos.x, -this.pos.y);
        ctx.scale(this.scale, this.scale);
        ctx.rotate(this.angle);
    }

    moveTo(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }

    zoom(scale) {
        this.scale = scale;
    }
}

/**
 * 🧩 Componentes Básicos
 */

// Componente Sprite
class SpriteComponent {
    constructor(imageSrc, width = 32, height = 32) {
        this.type = 'sprite';
        this.image = new Image();
        this.image.src = imageSrc;
        this.width = width;
        this.height = height;
        this.loaded = false;
        
        this.image.onload = () => {
            this.loaded = true;
        };
    }

    render(ctx) {
        if (this.loaded) {
            ctx.drawImage(
                this.image, 
                -this.width / 2, 
                -this.height / 2, 
                this.width, 
                this.height
            );
        } else {
            // Placeholder mientras carga
            ctx.fillStyle = '#ff6b6b';
            ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        }
    }
}

// Componente Rectángulo
class RectComponent {
    constructor(width = 32, height = 32, color = '#4ecdc4') {
        this.type = 'rect';
        this.width = width;
        this.height = height;
        this.color = color;
    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    }
}

// Componente Círculo
class CircleComponent {
    constructor(radius = 16, color = '#45b7d1') {
        this.type = 'circle';
        this.radius = radius;
        this.color = color;
    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Funciones de utilidad estilo Kaplay
function pos(x, y) {
    return { type: 'pos', x, y };
}

function rect(width, height, color) {
    return new RectComponent(width, height, color);
}

function circle(radius, color) {
    return new CircleComponent(radius, color);
}

function sprite(src, width, height) {
    return new SpriteComponent(src, width, height);
}

// Exportar motor y utilidades
window.CustomEngine = CustomEngine;
window.pos = pos;
window.rect = rect;
window.circle = circle;
window.sprite = sprite;

export default CustomEngine;