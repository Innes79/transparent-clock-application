const { app, BrowserWindow, ipcMain } = require('electron');

function createWindow () {
    const win = new BrowserWindow({
        width: 600,
        height: 300,
        x: 10,
        y: 10,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        minimizable: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('index.html');

    // Listen for minimize event from renderer
    ipcMain.on('minimize-window', () => {
        win.minimize();
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

