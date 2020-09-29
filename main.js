// Modules to control application life and create native browser window
const electron = require('electron');
const path = require('path');
const url = require('url');

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