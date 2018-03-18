const electron = require('electron');

// Module to create native browser window.
const {app, BrowserWindow, ipcMain } = electron;

const path = require('path');
const url = require('url');

const shell = require('shelljs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1780, height: 1024});

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('exec', (event, arg) => {
  console.log('Executing command on main process: ' + arg);

  const child = shell.exec(arg, {async: true});

  // Send data back when we have some
  child.stdout.on('data', function (data) {
    console.log('Sending data from main process: ' + data);
    event.sender.send('exec-data', data);
  });

  // Send errors back
  child.stderr.on('data', function (data) {
    console.log('Sending error from main process: ' + data);
    event.sender.send('exec-error', data);
  });

  // Finish running command
  child.on('exit', function (code, signal) {
    console.log('exec exited with code ' + code +
      ' and signal ' + signal);
    event.sender.send('exec-exit', code, signal);
  });
});
