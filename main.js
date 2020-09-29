// Modules to control application life and create native browser window
const electron = require('electron');
const path = require('path');
const url = require('url');
const { autoUpdater } = require("electron-updater");
const { app, BrowserWindow, Menu } = electron;

let mainWindow;

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        title: 'HELLO WORLD',
        width: 800,
        height: 600,
        webPreferences: {
            webSecurity: false,
        },
    })

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/dist/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('closed', function () {
        app.quit();
    })

    // mainWindow.removeMenu()

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

const mainMenuTemplate = [
    {
        label: 'File'
    }
]

autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
});

autoUpdater.on('update-available', (info) => {
    sendStatusToWindow('Update available.');
});

autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow('Update not available.');
});

autoUpdater.on('error', (err) => {
    sendStatusToWindow('Error in auto-updater. ' + err);
});

autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    sendStatusToWindow(log_message);
});

autoUpdater.on('update-downloaded', (info) => {
    sendStatusToWindow('Update downloaded');
});

app.on('ready', function () {
    autoUpdater.checkForUpdatesAndNotify();
});

ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall();
});
