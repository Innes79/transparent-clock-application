const { app, BrowserWindow, ipcMain } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 600,
        height: 300,
        x: 10,
        y: 10,
        frame: false,
        transparent: true,
        
        // 1. DISABLING ALWAYS ON TOP
        // This ensures it doesn't cover your browser or other apps.
        alwaysOnTop: false, 

        // 2. DESKTOP BEHAVIOR
        // Prevents the clock from stealing focus while you are typing elsewhere.
        focusable: false, 
        // Hides the clock from the Taskbar/Dock for a cleaner "widget" feel.
        skipTaskbar: true, 
        
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('index.html');

    // 3. PLATFORM SPECIFIC STICKINESS
    if (process.platform === 'darwin') {
        // On macOS, this pins the window to the desktop layer
        win.setWindowLevel('desktop');
    } else if (process.platform === 'win32') {
        // On Windows, this ensures it stays behind other windows
        win.on('blur', () => {
            win.lower(); 
        });
    }

    // 4. MOUSE INTERACTION (Optional)
    // If you want to be able to click "through" the clock to files on your 
    // desktop, uncomment the line below. 
    // Note: This will make your "Minimize" button unclickable.
    // win.setIgnoreMouseEvents(true, { forward: true });

    // Listen for minimize event
    ipcMain.on('minimize-window', () => {
        win.minimize();
    });
}

// Hide dock icon on macOS
if (process.platform === 'darwin') {
    app.dock.hide();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
