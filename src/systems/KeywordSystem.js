/**
 * 🗣️ Sistema de Palabras Clave Humanizadas
 * Traduce comandos en español natural a código del motor gráfico
 */

export default class KeywordSystem {
    constructor(engineSelector) {
        this.engineSelector = engineSelector;
        this.currentEngine = null;
        this.commandHistory = [];
        this.variables = new Map(); // Para almacenar variables del usuario
        
        this.init();
    }

    init() {
        this.setupKeywords();
        this.setupEventListeners();
    }

    setupKeywords() {
        // Palabras clave organizadas por categorías
        this.keywords = {
            // === OBJETOS Y ENTIDADES ===
            creation: {
                patterns: [
                    { regex: /crear (\w+)(?: en (\d+),(\d+))?/i, action: 'createObject' },
                    { regex: /nuevo (\w+)(?: en (\d+),(\d+))?/i, action: 'createObject' },
                    { regex: /añadir (\w+)(?: en (\d+),(\d+))?/i, action: 'createObject' },
                    { regex: /generar (\w+)(?: en (\d+),(\d+))?/i, action: 'createObject' },
                    { regex: /inicializar (\w+)/i, action: 'initializeObject' },
                    { regex: /clonar (\w+) como (\w+)/i, action: 'cloneObject' }
                ]
            },

            // === MOVIMIENTO Y POSICIÓN ===
            movement: {
                patterns: [
                    { regex: /mover (\w+) a (\d+),(\d+)/i, action: 'moveObject' },
                    { regex: /posición (\w+) (\d+),(\d+)/i, action: 'setPosition' },
                    { regex: /ir (\w+) a (\d+),(\d+)/i, action: 'moveObject' },
                    { regex: /teleportar (\w+) a (\d+),(\d+)/i, action: 'teleportObject' },
                    { regex: /centrar (\w+)/i, action: 'centerObject' },
                    { regex: /rotar (\w+) (\d+) grados/i, action: 'rotateObject' },
                    { regex: /escalar (\w+) (\d+(?:\.\d+)?)/i, action: 'scaleObject' }
                ]
            },

            // === APARIENCIA Y VISUAL ===
            appearance: {
                patterns: [
                    { regex: /color (\w+) (\w+)/i, action: 'setColor' },
                    { regex: /tamaño (\w+) (\d+),(\d+)/i, action: 'setSize' },
                    { regex: /sprite (\w+) (\w+)/i, action: 'setSprite' },
                    { regex: /imagen (\w+) (\w+)/i, action: 'setSprite' },
                    { regex: /transparencia (\w+) (\d+(?:\.\d+)?)/i, action: 'setOpacity' },
                    { regex: /ocultar (\w+)/i, action: 'hideObject' },
                    { regex: /mostrar (\w+)/i, action: 'showObject' },
                    { regex: /parpadear (\w+)/i, action: 'blinkObject' }
                ]
            },

            // === FÍSICA ===
            physics: {
                patterns: [
                    { regex: /gravedad (\w+)/i, action: 'addGravity' },
                    { regex: /velocidad (\w+) (\d+)/i, action: 'setVelocity' },
                    { regex: /saltar (\w+)/i, action: 'jumpObject' },
                    { regex: /empujar (\w+) hacia (\w+)/i, action: 'pushObject' },
                    { regex: /fricción (\w+) (\d+(?:\.\d+)?)/i, action: 'setFriction' },
                    { regex: /rebote (\w+) (\d+(?:\.\d+)?)/i, action: 'setBounce' },
                    { regex: /masa (\w+) (\d+)/i, action: 'setMass' },
                    { regex: /detener (\w+)/i, action: 'stopObject' }
                ]
            },

            // === CONTROLES ===
            controls: {
                patterns: [
                    { regex: /tecla (\w+) hacer (\w+) (\w+)/i, action: 'bindKey' },
                    { regex: /cuando presione (\w+) hacer (\w+) (\w+)/i, action: 'bindKey' },
                    { regex: /click en (\w+) hacer (\w+)/i, action: 'bindClick' },
                    { regex: /arrastrar (\w+)/i, action: 'makeDraggable' },
                    { regex: /seguir ratón (\w+)/i, action: 'followMouse' }
                ]
            },

            // === COLISIONES ===
            collisions: {
                patterns: [
                    { regex: /cuando (\w+) toca (\w+) hacer (\w+)/i, action: 'onCollision' },
                    { regex: /colisión (\w+) con (\w+) hacer (\w+)/i, action: 'onCollision' },
                    { regex: /si (\w+) choca con (\w+) entonces (\w+)/i, action: 'onCollision' },
                    { regex: /detectar (\w+) cerca de (\w+)/i, action: 'detectNear' }
                ]
            },

            // === AUDIO ===
            audio: {
                patterns: [
                    { regex: /sonido (\w+)/i, action: 'playSound' },
                    { regex: /música (\w+)(?: loop)?/i, action: 'playMusic' },
                    { regex: /parar sonido/i, action: 'stopSound' },
                    { regex: /volumen (\d+)/i, action: 'setVolume' },
                    { regex: /silenciar/i, action: 'mute' }
                ]
            },

            // === ESCENAS ===
            scenes: {
                patterns: [
                    { regex: /ir a (\w+)/i, action: 'goToScene' },
                    { regex: /escena (\w+)/i, action: 'goToScene' },
                    { regex: /cambiar a (\w+)/i, action: 'goToScene' },
                    { regex: /reiniciar escena/i, action: 'restartScene' },
                    { regex: /pausar juego/i, action: 'pauseGame' },
                    { regex: /reanudar juego/i, action: 'resumeGame' }
                ]
            },

            // === CÁMARA ===
            camera: {
                patterns: [
                    { regex: /cámara seguir (\w+)/i, action: 'cameraFollow' },
                    { regex: /zoom (\d+(?:\.\d+)?)/i, action: 'setZoom' },
                    { regex: /cámara en (\d+),(\d+)/i, action: 'setCameraPosition' },
                    { regex: /centrar cámara/i, action: 'centerCamera' },
                    { regex: /sacudir cámara/i, action: 'shakeCamera' }
                ]
            },

            // === EFECTOS ===
            effects: {
                patterns: [
                    { regex: /efecto (\w+) en (\w+)/i, action: 'addEffect' },
                    { regex: /partículas (\w+) en (\d+),(\d+)/i, action: 'createParticles' },
                    { regex: /explosión en (\d+),(\d+)/i, action: 'createExplosion' },
                    { regex: /destello (\w+)/i, action: 'flashObject' },
                    { regex: /desaparecer (\w+)/i, action: 'fadeOut' },
                    { regex: /aparecer (\w+)/i, action: 'fadeIn' }
                ]
            },

            // === LÓGICA Y VARIABLES ===
            logic: {
                patterns: [
                    { regex: /variable (\w+) = (\d+)/i, action: 'setVariable' },
                    { regex: /si (\w+) > (\d+) entonces (\w+)/i, action: 'ifCondition' },
                    { regex: /repetir (\d+) veces (\w+)/i, action: 'repeat' },
                    { regex: /cada (\d+) segundos hacer (\w+)/i, action: 'setInterval' },
                    { regex: /esperar (\d+) segundos/i, action: 'wait' },
                    { regex: /eliminar (\w+)/i, action: 'destroyObject' }
                ]
            },

            // === JUEGO ===
            game: {
                patterns: [
                    { regex: /inicializar juego/i, action: 'initGame' },
                    { regex: /empezar juego/i, action: 'startGame' },
                    { regex: /terminar juego/i, action: 'endGame' },
                    { regex: /puntuación \+(\d+)/i, action: 'addScore' },
                    { regex: /vida \+(\d+)/i, action: 'addLife' },
                    { regex: /vida -(\d+)/i, action: 'removeLife' },
                    { regex: /guardar juego/i, action: 'saveGame' },
                    { regex: /cargar juego/i, action: 'loadGame' }
                ]
            }
        };

        // Colores en español
        this.colorMap = {
            'rojo': 'red', 'azul': 'blue', 'verde': 'green', 'amarillo': 'yellow',
            'negro': 'black', 'blanco': 'white', 'gris': 'gray', 'rosa': 'pink',
            'morado': 'purple', 'naranja': 'orange', 'marrón': 'brown', 'violeta': 'violet'
        };

        // Direcciones
        this.directionMap = {
            'arriba': 'up', 'abajo': 'down', 'izquierda': 'left', 'derecha': 'right',
            'norte': 'up', 'sur': 'down', 'este': 'right', 'oeste': 'left'
        };

        // Teclas
        this.keyMap = {
            'espacio': 'space', 'enter': 'enter', 'escape': 'escape',
            'flecha_arriba': 'up', 'flecha_abajo': 'down', 
            'flecha_izquierda': 'left', 'flecha_derecha': 'right',
            'shift': 'shift', 'ctrl': 'ctrl', 'alt': 'alt'
        };
    }

    setupEventListeners() {
        // Escuchar cambios de motor
        window.addEventListener('engineChanged', (event) => {
            this.currentEngine = event.detail.engine;
        });
    }

    /**
     * Procesa un comando en lenguaje natural y lo convierte a código
     * @param {string} input - Comando en español
     * @returns {Object} - Resultado del procesamiento
     */
    processCommand(input) {
        const normalizedInput = this.normalizeInput(input);
        
        // Buscar coincidencias en todas las categorías
        for (const [category, categoryData] of Object.entries(this.keywords)) {
            for (const pattern of categoryData.patterns) {
                const match = normalizedInput.match(pattern.regex);
                if (match) {
                    return this.executeAction(pattern.action, match, category);
                }
            }
        }

        return {
            success: false,
            error: 'Comando no reconocido',
            suggestion: this.getSuggestion(normalizedInput)
        };
    }

    normalizeInput(input) {
        return input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, ' ') // Múltiples espacios a uno
            .replace(/[áàäâ]/g, 'a')
            .replace(/[éèëê]/g, 'e')
            .replace(/[íìïî]/g, 'i')
            .replace(/[óòöô]/g, 'o')
            .replace(/[úùüû]/g, 'u')
            .replace(/ñ/g, 'n');
    }

    executeAction(action, match, category) {
        if (!this.currentEngine) {
            return {
                success: false,
                error: 'No hay motor gráfico seleccionado',
                code: null
            };
        }

        try {
            const result = this[action](match);
            
            // Agregar al historial
            this.commandHistory.push({
                input: match[0],
                action,
                category,
                result,
                timestamp: Date.now()
            });

            return {
                success: true,
                action,
                category,
                code: result.code,
                description: result.description,
                executed: result.executed || false
            };

        } catch (error) {
            return {
                success: false,
                error: error.message,
                action,
                category
            };
        }
    }

    // === ACCIONES DE CREACIÓN ===
    createObject(match) {
        const [, objectType, x = 100, y = 100] = match;
        const objectName = this.generateObjectName(objectType);
        
        const code = this.generateCode('createObject', {
            name: objectName,
            type: objectType,
            x: parseInt(x),
            y: parseInt(y)
        });

        return {
            code,
            description: `Crear ${objectType} llamado "${objectName}" en posición (${x}, ${y})`,
            executed: this.executeEngineCommand(code)
        };
    }

    initializeObject(match) {
        const [, objectType] = match;
        
        const code = this.generateCode('initGame', { type: objectType });
        
        return {
            code,
            description: `Inicializar ${objectType}`,
            executed: this.executeEngineCommand(code)
        };
    }

    cloneObject(match) {
        const [, sourceObject, newName] = match;
        
        const code = this.generateCode('cloneObject', {
            source: sourceObject,
            name: newName
        });

        return {
            code,
            description: `Clonar ${sourceObject} como ${newName}`,
            executed: this.executeEngineCommand(code)
        };
    }

    // === ACCIONES DE MOVIMIENTO ===
    moveObject(match) {
        const [, objectName, x, y] = match;
        
        const code = this.generateCode('moveObject', {
            name: objectName,
            x: parseInt(x),
            y: parseInt(y)
        });

        return {
            code,
            description: `Mover ${objectName} a posición (${x}, ${y})`,
            executed: this.executeEngineCommand(code)
        };
    }

    setPosition(match) {
        return this.moveObject(match);
    }

    teleportObject(match) {
        const [, objectName, x, y] = match;
        
        const code = this.generateCode('teleportObject', {
            name: objectName,
            x: parseInt(x),
            y: parseInt(y)
        });

        return {
            code,
            description: `Teleportar ${objectName} a (${x}, ${y})`,
            executed: this.executeEngineCommand(code)
        };
    }

    centerObject(match) {
        const [, objectName] = match;
        
        const code = this.generateCode('centerObject', { name: objectName });

        return {
            code,
            description: `Centrar ${objectName} en pantalla`,
            executed: this.executeEngineCommand(code)
        };
    }

    rotateObject(match) {
        const [, objectName, degrees] = match;
        
        const code = this.generateCode('rotateObject', {
            name: objectName,
            angle: parseInt(degrees)
        });

        return {
            code,
            description: `Rotar ${objectName} ${degrees} grados`,
            executed: this.executeEngineCommand(code)
        };
    }

    scaleObject(match) {
        const [, objectName, scale] = match;
        
        const code = this.generateCode('scaleObject', {
            name: objectName,
            scale: parseFloat(scale)
        });

        return {
            code,
            description: `Escalar ${objectName} a ${scale}x`,
            executed: this.executeEngineCommand(code)
        };
    }

    // === ACCIONES DE APARIENCIA ===
    setColor(match) {
        const [, objectName, colorName] = match;
        const color = this.colorMap[colorName] || colorName;
        
        const code = this.generateCode('setColor', {
            name: objectName,
            color: color
        });

        return {
            code,
            description: `Cambiar color de ${objectName} a ${colorName}`,
            executed: this.executeEngineCommand(code)
        };
    }

    setSize(match) {
        const [, objectName, width, height] = match;
        
        const code = this.generateCode('setSize', {
            name: objectName,
            width: parseInt(width),
            height: parseInt(height)
        });

        return {
            code,
            description: `Cambiar tamaño de ${objectName} a ${width}x${height}`,
            executed: this.executeEngineCommand(code)
        };
    }

    setSprite(match) {
        const [, objectName, spriteName] = match;
        
        const code = this.generateCode('setSprite', {
            name: objectName,
            sprite: spriteName
        });

        return {
            code,
            description: `Cambiar sprite de ${objectName} a ${spriteName}`,
            executed: this.executeEngineCommand(code)
        };
    }

    setOpacity(match) {
        const [, objectName, opacity] = match;
        
        const code = this.generateCode('setOpacity', {
            name: objectName,
            opacity: parseFloat(opacity)
        });

        return {
            code,
            description: `Cambiar transparencia de ${objectName} a ${opacity}`,
            executed: this.executeEngineCommand(code)
        };
    }

    hideObject(match) {
        const [, objectName] = match;
        
        const code = this.generateCode('hideObject', { name: objectName });

        return {
            code,
            description: `Ocultar ${objectName}`,
            executed: this.executeEngineCommand(code)
        };
    }

    showObject(match) {
        const [, objectName] = match;
        
        const code = this.generateCode('showObject', { name: objectName });

        return {
            code,
            description: `Mostrar ${objectName}`,
            executed: this.executeEngineCommand(code)
        };
    }

    // === ACCIONES DE FÍSICA ===
    addGravity(match) {
        const [, objectName] = match;
        
        const code = this.generateCode('addGravity', { name: objectName });

        return {
            code,
            description: `Aplicar gravedad a ${objectName}`,
            executed: this.executeEngineCommand(code)
        };
    }

    setVelocity(match) {
        const [, objectName, velocity] = match;
        
        const code = this.generateCode('setVelocity', {
            name: objectName,
            velocity: parseInt(velocity)
        });

        return {
            code,
            description: `Establecer velocidad de ${objectName} a ${velocity}`,
            executed: this.executeEngineCommand(code)
        };
    }

    jumpObject(match) {
        const [, objectName] = match;
        
        const code = this.generateCode('jumpObject', { name: objectName });

        return {
            code,
            description: `Hacer saltar a ${objectName}`,
            executed: this.executeEngineCommand(code)
        };
    }

    // === ACCIONES DE CONTROLES ===
    bindKey(match) {
        const [, keyName, action, objectName] = match;
        const key = this.keyMap[keyName] || keyName;
        
        const code = this.generateCode('bindKey', {
            key: key,
            action: action,
            object: objectName
        });

        return {
            code,
            description: `Asignar tecla ${keyName} para ${action} ${objectName}`,
            executed: this.executeEngineCommand(code)
        };
    }

    bindClick(match) {
        const [, objectName, action] = match;
        
        const code = this.generateCode('bindClick', {
            object: objectName,
            action: action
        });

        return {
            code,
            description: `Asignar click en ${objectName} para ${action}`,
            executed: this.executeEngineCommand(code)
        };
    }

    // === ACCIONES DE COLISIONES ===
    onCollision(match) {
        const [, object1, object2, action] = match;
        
        const code = this.generateCode('onCollision', {
            object1: object1,
            object2: object2,
            action: action
        });

        return {
            code,
            description: `Cuando ${object1} toque ${object2}, ejecutar ${action}`,
            executed: this.executeEngineCommand(code)
        };
    }

    // === ACCIONES DE AUDIO ===
    playSound(match) {
        const [, soundName] = match;
        
        const code = this.generateCode('playSound', { sound: soundName });

        return {
            code,
            description: `Reproducir sonido ${soundName}`,
            executed: this.executeEngineCommand(code)
        };
    }

    playMusic(match) {
        const [, musicName] = match;
        const loop = match[0].includes('loop');
        
        const code = this.generateCode('playMusic', {
            music: musicName,
            loop: loop
        });

        return {
            code,
            description: `Reproducir música ${musicName}${loop ? ' en bucle' : ''}`,
            executed: this.executeEngineCommand(code)
        };
    }

    // === ACCIONES DE ESCENAS ===
    goToScene(match) {
        const [, sceneName] = match;
        
        const code = this.generateCode('goToScene', { scene: sceneName });

        return {
            code,
            description: `Ir a escena ${sceneName}`,
            executed: this.executeEngineCommand(code)
        };
    }

    // === ACCIONES DE CÁMARA ===
    cameraFollow(match) {
        const [, objectName] = match;
        
        const code = this.generateCode('cameraFollow', { object: objectName });

        return {
            code,
            description: `Cámara seguir a ${objectName}`,
            executed: this.executeEngineCommand(code)
        };
    }

    setZoom(match) {
        const [, zoomLevel] = match;
        
        const code = this.generateCode('setZoom', { zoom: parseFloat(zoomLevel) });

        return {
            code,
            description: `Establecer zoom a ${zoomLevel}x`,
            executed: this.executeEngineCommand(code)
        };
    }

    // === ACCIONES DE VARIABLES ===
    setVariable(match) {
        const [, varName, value] = match;
        this.variables.set(varName, parseInt(value));
        
        const code = this.generateCode('setVariable', {
            name: varName,
            value: parseInt(value)
        });

        return {
            code,
            description: `Establecer variable ${varName} = ${value}`,
            executed: this.executeEngineCommand(code)
        };
    }

    // === ACCIONES DE JUEGO ===
    initGame(match) {
        const code = this.generateCode('initGame', {});

        return {
            code,
            description: 'Inicializar juego',
            executed: this.executeEngineCommand(code)
        };
    }

    destroyObject(match) {
        const [, objectName] = match;
        
        const code = this.generateCode('destroyObject', { name: objectName });

        return {
            code,
            description: `Eliminar ${objectName}`,
            executed: this.executeEngineCommand(code)
        };
    }

    // === UTILIDADES ===
    generateCode(action, params) {
        if (!this.currentEngine) {
            return '// No hay motor seleccionado';
        }

        const engineType = this.currentEngine.config.name.toLowerCase();
        
        // Generar código específico del motor
        switch (engineType) {
            case 'kaplay':
                return this.generateKaplayCode(action, params);
            case 'custom':
                return this.generateCustomCode(action, params);
            default:
                return this.generateGenericCode(action, params);
        }
    }

    generateKaplayCode(action, params) {
        const codeMap = {
            createObject: `const ${params.name} = add([
    sprite("${params.type}"),
    pos(${params.x}, ${params.y}),
    area(),
    body()
]);`,
            moveObject: `${params.name}.pos = vec2(${params.x}, ${params.y});`,
            setColor: `${params.name}.color = Color.${params.color.toUpperCase()};`,
            addGravity: `${params.name}.use(body());`,
            playSound: `play("${params.sound}");`,
            goToScene: `go("${params.scene}");`,
            bindKey: `onKeyPress("${params.key}", () => {
    ${params.object}.${params.action}();
});`,
            onCollision: `${params.object1}.onCollide("${params.object2}", () => {
    ${params.action}();
});`,
            setZoom: `camScale(${params.zoom});`,
            cameraFollow: `${params.object}.onUpdate(() => {
    camPos(${params.object}.pos);
});`
        };

        return codeMap[action] || `// Acción ${action} no implementada para Kaplay`;
    }

    generateCustomCode(action, params) {
        const codeMap = {
            createObject: `const ${params.name} = engine.createObject({
    type: "${params.type}",
    x: ${params.x},
    y: ${params.y}
});`,
            moveObject: `${params.name}.setPosition(${params.x}, ${params.y});`,
            setColor: `${params.name}.setColor("${params.color}");`,
            addGravity: `${params.name}.addComponent("gravity");`,
            playSound: `engine.audio.play("${params.sound}");`,
            goToScene: `engine.scene.load("${params.scene}");`
        };

        return codeMap[action] || `// Acción ${action} no implementada para motor custom`;
    }

    generateGenericCode(action, params) {
        return `// ${action}(${JSON.stringify(params)})`;
    }

    executeEngineCommand(code) {
        try {
            if (this.currentEngine && this.currentEngine.executeCode) {
                this.currentEngine.executeCode(code);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error ejecutando comando:', error);
            return false;
        }
    }

    generateObjectName(type) {
        const existing = this.commandHistory.filter(cmd => 
            cmd.action === 'createObject' && cmd.result.code.includes(type)
        ).length;
        
        return `${type}${existing > 0 ? existing + 1 : ''}`;
    }

    getSuggestion(input) {
        const suggestions = [
            'crear jugador en 100,200',
            'mover jugador a 300,400',
            'color jugador rojo',
            'gravedad jugador',
            'tecla espacio hacer saltar jugador',
            'sonido explosion',
            'ir a menu_principal'
        ];

        // Buscar sugerencia más similar
        const words = input.split(' ');
        for (const suggestion of suggestions) {
            if (words.some(word => suggestion.includes(word))) {
                return `¿Quisiste decir: "${suggestion}"?`;
            }
        }

        return 'Intenta comandos como: "crear jugador", "mover objeto", "color rojo"';
    }

    // === API PÚBLICA ===
    getAvailableCommands() {
        const commands = [];
        
        for (const [category, categoryData] of Object.entries(this.keywords)) {
            for (const pattern of categoryData.patterns) {
                commands.push({
                    category,
                    pattern: pattern.regex.source,
                    example: this.getExampleForPattern(pattern.regex)
                });
            }
        }

        return commands;
    }

    // Method to get help for a specific command
    getCommandHelp(command) {
        for (const [categoryName, categoryData] of Object.entries(this.keywords)) {
            for (const pattern of categoryData.patterns) {
                if (pattern.action === command) {
                    return {
                        command,
                        category: categoryName,
                        pattern: pattern.regex.source,
                        description: `Acción: ${command}`,
                        example: this.getExampleForPattern(pattern.regex)
                    };
                }
            }
        }
        return null;
    }

    // Method to get commands by category
    getCommandsByCategory(categoryName) {
        if (this.keywords[categoryName]) {
            return this.keywords[categoryName].patterns.map(pattern => ({
                action: pattern.action,
                pattern: pattern.regex.source,
                example: this.getExampleForPattern(pattern.regex)
            }));
        }
        return [];
    }

    // Method to search commands by keyword
    searchCommands(searchTerm) {
        const results = [];
        const term = searchTerm.toLowerCase();
        
        for (const [categoryName, categoryData] of Object.entries(this.keywords)) {
            for (const pattern of categoryData.patterns) {
                if (pattern.action.toLowerCase().includes(term) || 
                    categoryName.toLowerCase().includes(term)) {
                    results.push({
                        action: pattern.action,
                        category: categoryName,
                        pattern: pattern.regex.source,
                        example: this.getExampleForPattern(pattern.regex)
                    });
                }
            }
        }
        return results;
    }

    getExampleForPattern(regex) {
        const examples = {
            'crear': 'crear jugador en 100,200',
            'mover': 'mover jugador a 300,400',
            'color': 'color jugador rojo',
            'gravedad': 'gravedad jugador',
            'tecla': 'tecla espacio hacer saltar jugador',
            'sonido': 'sonido explosion'
        };

        for (const [key, example] of Object.entries(examples)) {
            if (regex.source.includes(key)) {
                return example;
            }
        }

        return 'Ejemplo no disponible';
    }

    getCommandHistory() {
        return this.commandHistory;
    }

    clearHistory() {
        this.commandHistory = [];
        this.variables.clear();
    }

    exportCommands() {
        return {
            history: this.commandHistory,
            variables: Object.fromEntries(this.variables),
            timestamp: Date.now()
        };
    }
}

// Export para uso en módulos
export { KeywordSystem };