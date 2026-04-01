const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')
const os = require('os')
const { generateBuddy } = require('./generator')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173')
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// IPC handlers
ipcMain.handle('get-config-path', () => {
  return path.join(os.homedir(), '.claude.json')
})

ipcMain.handle('read-config', async () => {
  const configPath = path.join(os.homedir(), '.claude.json')
  try {
    const data = fs.readFileSync(configPath, 'utf8')
    return { success: true, data: JSON.parse(data) }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('write-config', async (event, config) => {
  const configPath = path.join(os.homedir(), '.claude.json')
  try {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8')
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
})

ipcMain.handle('generate-buddy', async (event, filters) => {
  return await generateBuddy(filters)
})
