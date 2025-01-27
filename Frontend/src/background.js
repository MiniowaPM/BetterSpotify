'use strict';

import { app, protocol, BrowserWindow, ipcMain } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer';
const isDevelopment = process.env.NODE_ENV !== 'production';

const path = require('path');

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
      webPreferences: {
        nodeIntegration: true, // Set to true for testing
        contextIsolation: false // Set to false for testing
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
      width: 400,
      height: 600,
      minWidth: 300,
      minHeight: 400,
      webPreferences: {
        nodeIntegration: true, // Set to true for testing
        contextIsolation: false // Set to false for testing
      }
    });

    loginWindow.loadFile(path.join(__dirname, '../src/login.html')); // Load the login page

    ipcMain.on("login-success", () => {
      loginWindow.close();
      createWindow(); // Show the main window on successful login
    });
  } catch (error) {
    console.error('Error creating login window:', error);
  }
}

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
