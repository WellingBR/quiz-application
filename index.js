const { app, BrowserWindow } = require('electron')

app.on("ready", () => {
    const window = new BrowserWindow({
        width: 700,
        height: 400,
        resizable: false
    });

    window.setMenu(null)
    window.loadFile('index.html');
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});