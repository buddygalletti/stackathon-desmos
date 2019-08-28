const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;

let win;

app.on('ready', () => {
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
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
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
      { role: 'togglefullscreen' },
      { role: 'hide' }
    ]
  }
];

if (process.platform === 'darwin') {
  mainMenuTemplate.unshift({ label: '' });
}
