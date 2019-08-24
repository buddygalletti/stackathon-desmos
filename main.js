const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

app.on('ready', () => {
  // Create the browser window.
  win = new BrowserWindow({
    width: 750,
    height: 1000,
    webPreferences: {
      nodeIntegration: true
    }
  });
  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);

  win.loadFile('index.html');

  win.webContents.enableDeviceEmulation({
    screenPosition: 'mobile'
  });

  win.on('closed', () => {
    win = null;
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// Create Menu Template
const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Graph',
        accelerator: process.platform === 'darwin' ? 'Command+N' : 'Ctrl+N',
        click() {}
      },
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  }
];

if (process.platform === 'darwin') {
  mainMenuTemplate.unshift({ label: '' });
}
