/**
 * Arranque de Nexus Engine en el navegador/Electron.
 * Solo módulos locales: sin CDN ni peticiones de red.
 */
import EngineSelector from './engines/EngineSelector.js';
import CustomEngine from './engines/CustomEngine.js';
import KeywordSystem from './systems/KeywordSystem.js';
import EngineSelectorUI from './components/EngineSelector.js';
// AIChat se crea solo en DOMContentLoaded (src/components/AIChat.js): no instanciar aquí o habría dos barras.
import './components/AIChat.js';

async function main() {
    const engineSelector = new EngineSelector();
    window.engineSelector = engineSelector;

    const keywordSystem = new KeywordSystem(engineSelector);
    window.keywordSystem = keywordSystem;

    window.engineSelectorUI = new EngineSelectorUI(engineSelector);

    // Motor por defecto: offline. selectEngine() dispara 'engineChanged' para KeywordSystem.
    const selection = await engineSelector.selectEngine('custom');
    window.game = new selection.instance();
    window.game.start();
}

main().catch(error => console.error('Error al arrancar Nexus Engine:', error));
