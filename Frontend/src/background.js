'use strict';

import { app, protocol, BrowserWindow, ipcMain, nativeImage } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer';
const isDevelopment = process.env.NODE_ENV !== 'production';

const path = require('path');
const fs = require('fs');

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
]);

let mainWindow;
let loginWindow;

async function createWindow() {
  try {
    mainWindow = new BrowserWindow({
      width: 1600,
      height: 900,
      minWidth: 800,
      minHeight: 600,
      frame: false,
      icon: path.join(__dirname, '../src/assets/icon_onsite.ico'),
      title: 'Reptillia',
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false 
      }
    });

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
      if (!process.env.IS_TEST) mainWindow.webContents.openDevTools();
    } else {
      createProtocol('app');
      await mainWindow.loadURL('app://./index.html');
    }
  } catch (error) {
    console.error('Error creating main window:', error);
  }
}

function createAnotherWindow() {
  try {
    loginWindow = new BrowserWindow({
      width: 800,
      height: 500,
      titleBarStyle: 'hidden',
      icon: path.join(__dirname, '../src/assets/icon_onsite.ico'),
      devTools: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false 
      }
    });

    loginWindow.loadFile(path.join(__dirname, '../src/login.html')); // Load the login page
    
    if (process.env.NODE_ENV === 'development') {
      loginWindow.webContents.openDevTools();
    }
    ipcMain.on("login-success", () => {
      loginWindow.close();
      createWindow(); // Show the main window on successful login
    });
  } catch (error) {
    console.error('Error creating login window:', error);
  }
}




const RulesFile = '../src/components/rules.txt'
fs.writeFile(RulesFile, 'Rules', () => {
  app.addRecentDocument(path.join(__dirname, RulesFile))
})
// Open only the login window on application startup
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  createAnotherWindow(); // Open the login window first
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});






// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}

ipcMain.on("go-back", (event) => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    focusedWindow.webContents.goBack();
  }
});

ipcMain.on("go-forward", (event) => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    focusedWindow.webContents.goForward();
  }
});

ipcMain.on("toggle-maximize", (event) => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    if (focusedWindow.isMaximized()) {
      focusedWindow.unmaximize();
    } else {
      focusedWindow.maximize();
    }
  }
});

ipcMain.on("minimize", (event) => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    focusedWindow.minimize();
  }
});

ipcMain.on("close-app", (event) => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (focusedWindow) {
    focusedWindow.close();
  }
});
