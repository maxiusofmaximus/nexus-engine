/**
 * 🎮 Sistema Selector de Motores Gráficos
 * 
 * Permite seleccionar entre diferentes motores gráficos:
 * - Kaplay Engine (requiere internet)
 * - Motor Propio (fallback offline)
 * - Phaser (próximamente)
 * - PixiJS (próximamente)
 */

class EngineSelector {
    constructor() {
        this.availableEngines = new Map();
        this.currentEngine = null;
        this.isOnline = navigator.onLine;
        this.fallbackEngine = 'custom';
        
        this.initializeEngines();
        this.setupNetworkListeners();
    }

    /**
     * 🔧 Inicializa todos los motores disponibles
     */
    initializeEngines() {
        // Kaplay Engine (requiere internet)
        this.availableEngines.set('kaplay', {
            name: 'Kaplay Engine',
            version: '3000.1.17',
            type: 'online',
            description: 'Motor 2D completo con física y audio',
            features: ['2D Graphics', 'Physics', 'Audio', 'Input', 'Scenes'],
            cdnUrl: 'https://unpkg.com/kaplay@3000.1.17/dist/kaplay.js',
            documentation: 'https://kaplayjs.com/docs/',
            status: 'available',
            priority: 1
        });

        // Motor Propio (fallback offline)
        this.availableEngines.set('custom', {
            name: 'Motor Propio',
            version: '1.0.0',
            type: 'offline',
            description: 'Motor básico personalizado para uso offline',
            features: ['2D Graphics', 'Basic Physics', 'Input'],
            localPath: './engines/CustomEngine.js',
            documentation: './Guide.md#motor-propio',
            status: 'available',
            priority: 10 // Fallback priority
        });

        // Phaser (próximamente)
        this.availableEngines.set('phaser', {
            name: 'Phaser',
            version: '3.70.0',
            type: 'online',
            description: 'Motor 2D robusto para juegos web',
            features: ['2D Graphics', 'Physics', 'Audio', 'WebGL'],
            cdnUrl: 'https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js',
            documentation: 'https://phaser.io/docs',
            status: 'coming_soon',
            priority: 2
        });

        // PixiJS (próximamente)
        this.availableEngines.set('pixijs', {
            name: 'PixiJS',
            version: '7.3.2',
            type: 'online',
            description: 'Renderer 2D ultra rápido',
            features: ['2D Graphics', 'WebGL', 'Canvas', 'Filters'],
            cdnUrl: 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.min.js',
            documentation: 'https://pixijs.com/docs',
            status: 'coming_soon',
            priority: 3
        });
    }

    /**
     * 🌐 Configura listeners para cambios de conectividad
     */
    setupNetworkListeners() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.updateEngineAvailability();
            this.notifyNetworkChange('online');
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.updateEngineAvailability();
            this.notifyNetworkChange('offline');
        });
    }

    /**
     * 📋 Obtiene lista de motores disponibles según conectividad
     */
    getAvailableEngines() {
        const engines = Array.from(this.availableEngines.values())
            .filter(engine => {
                // Si está offline, solo mostrar motores offline
                if (!this.isOnline && engine.type === 'online') {
                    return false;
                }
                // Solo mostrar motores disponibles
                return engine.status === 'available';
            })
            .sort((a, b) => a.priority - b.priority);

        return engines;
    }

    /**
     * 🎯 Selecciona un motor específico
     */
    async selectEngine(engineId) {
        try {
            const engine = this.availableEngines.get(engineId);
            
            if (!engine) {
                throw new Error(`Motor ${engineId} no encontrado`);
            }

            if (engine.status !== 'available') {
                throw new Error(`Motor ${engineId} no está disponible`);
            }

            // Si es un motor online y estamos offline, usar fallback
            if (engine.type === 'online' && !this.isOnline) {
                console.warn(`Motor ${engineId} requiere internet. Usando fallback.`);
                return await this.selectEngine(this.fallbackEngine);
            }

            // Cargar el motor
            const loadedEngine = await this.loadEngine(engine);
            this.currentEngine = {
                id: engineId,
                config: engine,
                instance: loadedEngine
            };

            this.notifyEngineChange(engineId);
            return this.currentEngine;

        } catch (error) {
            console.error('Error al seleccionar motor:', error);
            
            // Si falla, intentar con fallback
            if (engineId !== this.fallbackEngine) {
                console.log('Intentando con motor fallback...');
                return await this.selectEngine(this.fallbackEngine);
            }
            
            throw error;
        }
    }

    /**
     * 📦 Carga un motor específico
     */
    async loadEngine(engineConfig) {
        switch (engineConfig.type) {
            case 'online':
                return await this.loadOnlineEngine(engineConfig);
            case 'offline':
                return await this.loadOfflineEngine(engineConfig);
            default:
                throw new Error(`Tipo de motor desconocido: ${engineConfig.type}`);
        }
    }

    /**
     * 🌐 Carga motor online desde CDN
     */
    async loadOnlineEngine(engineConfig) {
        return new Promise((resolve, reject) => {
            // Verificar si ya está cargado
            if (this.isEngineLoaded(engineConfig.name)) {
                resolve(window[this.getEngineGlobalName(engineConfig.name)]);
                return;
            }

            const script = document.createElement('script');
            script.src = engineConfig.cdnUrl;
            script.async = true;
            
            script.onload = () => {
                console.log(`✅ Motor ${engineConfig.name} cargado exitosamente`);
                resolve(window[this.getEngineGlobalName(engineConfig.name)]);
            };
            
            script.onerror = () => {
                reject(new Error(`❌ Error al cargar ${engineConfig.name} desde ${engineConfig.cdnUrl}`));
            };
            
            document.head.appendChild(script);
        });
    }

    /**
     * 💾 Carga motor offline local
     */
    async loadOfflineEngine(engineConfig) {
        try {
            const module = await import(engineConfig.localPath);
            console.log(`✅ Motor offline ${engineConfig.name} cargado exitosamente`);
            return module.default || module;
        } catch (error) {
            throw new Error(`❌ Error al cargar motor offline: ${error.message}`);
        }
    }

    /**
     * 🔍 Verifica si un motor ya está cargado
     */
    isEngineLoaded(engineName) {
        const globalName = this.getEngineGlobalName(engineName);
        return typeof window[globalName] !== 'undefined';
    }

    /**
     * 🌍 Obtiene el nombre global del motor
     */
    getEngineGlobalName(engineName) {
        const globalNames = {
            'Kaplay Engine': 'kaplay',
            'Phaser': 'Phaser',
            'PixiJS': 'PIXI',
            'Motor Propio': 'CustomEngine'
        };
        return globalNames[engineName] || engineName.toLowerCase();
    }

    /**
     * 🔄 Actualiza disponibilidad de motores según conectividad
     */
    updateEngineAvailability() {
        this.availableEngines.forEach((engine, id) => {
            if (engine.type === 'online' && !this.isOnline) {
                // Motor online pero sin internet
                engine.status = 'unavailable';
            } else if (engine.status === 'unavailable' && this.isOnline) {
                // Restaurar disponibilidad si vuelve internet
                engine.status = 'available';
            }
        });
    }

    /**
     * 🎯 Obtiene motor actual
     */
    getCurrentEngine() {
        return this.currentEngine;
    }

    /**
     * 🔧 Obtiene configuración de motor
     */
    getEngineConfig(engineId) {
        return this.availableEngines.get(engineId);
    }

    /**
     * 📊 Obtiene estadísticas del selector
     */
    getStats() {
        const total = this.availableEngines.size;
        const available = this.getAvailableEngines().length;
        const online = Array.from(this.availableEngines.values())
            .filter(e => e.type === 'online').length;
        const offline = Array.from(this.availableEngines.values())
            .filter(e => e.type === 'offline').length;

        return {
            total,
            available,
            online,
            offline,
            isOnline: this.isOnline,
            currentEngine: this.currentEngine?.id || null
        };
    }

    /**
     * 🔄 Cambia a motor fallback
     */
    async switchToFallback() {
        console.log('🔄 Cambiando a motor fallback...');
        return await this.selectEngine(this.fallbackEngine);
    }

    /**
     * 📢 Notifica cambio de motor
     */
    notifyEngineChange(engineId) {
        const event = new CustomEvent('engineChanged', {
            detail: {
                engineId,
                engine: this.currentEngine,
                timestamp: Date.now()
            }
        });
        window.dispatchEvent(event);
    }

    /**
     * 📢 Notifica cambio de conectividad
     */
    notifyNetworkChange(status) {
        const event = new CustomEvent('networkChanged', {
            detail: {
                status,
                isOnline: this.isOnline,
                availableEngines: this.getAvailableEngines(),
                timestamp: Date.now()
            }
        });
        window.dispatchEvent(event);
    }

    /**
     * 🧹 Limpia recursos
     */
    destroy() {
        if (this.currentEngine?.instance?.destroy) {
            this.currentEngine.instance.destroy();
        }
        this.currentEngine = null;
    }
}

// 🌍 Instancia global del selector
window.EngineSelector = EngineSelector;

export default EngineSelector;