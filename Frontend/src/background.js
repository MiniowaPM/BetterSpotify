'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import fs from 'fs' // Import fs module
import path from 'path' // Import path module


const isDevelopment = process.env.NODE_ENV !== 'production'

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

let mainWindow
let loginWindow

async function createLoginWindow() {
  loginWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    icon: path.join(__dirname, '../src/assets/icon_onsite.ico'),
    title: 'Reptilia',
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await loginWindow.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}#/login`)
  } else {
    createProtocol('app')
    loginWindow.loadURL('app://./index.html#/login')
  }

  loginWindow.on('closed', () => {
    loginWindow = null
  })
}

async function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    frame: false,
    icon: path.join(__dirname, '../src/assets/icon_onsite.ico'),
    title: 'Reptilia',
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools()
  } else {
    createProtocol('app')
    mainWindow.loadURL('app://./index.html')
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}


let userToken = null;

ipcMain.on("login-success", (event, token) => {
    userToken = token;

    if (loginWindow) {
        loginWindow.close();
    }
    createMainWindow();
});

ipcMain.handle("read-terms-file", async () => {
  try {
    const filePath = path.join(__dirname,'terms.txt');
      return fs.promises.readFile(filePath, "utf-8");
  } catch (error) {
      console.error("Error reading terms file:", error);
      return "Error loading Terms of Use.";
  }
});

ipcMain.handle("get-login-token", () => {
  return userToken; 
});

ipcMain.on('register-success', () => {
  if (loginWindow) {
    loginWindow.close();
  }
  createMainWindow();
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createLoginWindow() 
  }
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createLoginWindow() 
})


if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.on("go-back", (event) => {
  const focusedWindow = BrowserWindow.getFocusedWindow()
  if (focusedWindow) {
    focusedWindow.webContents.goBack()
  }
})

ipcMain.on("go-forward", (event) => {
  const focusedWindow = BrowserWindow.getFocusedWindow()
  if (focusedWindow) {
    focusedWindow.webContents.goForward()
  }
})

ipcMain.on("toggle-maximize", (event) => {
  const focusedWindow = BrowserWindow.getFocusedWindow()
  if (focusedWindow) {
    if (focusedWindow.isMaximized()) {
      focusedWindow.unmaximize()
    } else {
      focusedWindow.maximize()
    }
  }
})

ipcMain.on("minimize", (event) => {
  const focusedWindow = BrowserWindow.getFocusedWindow()
  if (focusedWindow) {
    focusedWindow.minimize()
  }
})

ipcMain.on("close-app", (event) => {
  const focusedWindow = BrowserWindow.getFocusedWindow()
  if (focusedWindow) {
    focusedWindow.close()
  }
})
