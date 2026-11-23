// Cáscara de escritorio de Nexus Engine (Electron). Sin red ni DevTools.
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 800,
        title: 'Nexus Engine',
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win.loadFile(path.join(__dirname, '..', 'index.html'));
}

app.whenReady().then(() => {
    Menu.setApplicationMenu(null); // sin menú por defecto (File/Edit/View/Window)
    createWindow();
});

app.on('window-all-closed', () => app.quit());
