const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  getConfigPath: () => ipcRenderer.invoke('get-config-path'),
  readConfig: () => ipcRenderer.invoke('read-config'),
  writeConfig: (config) => ipcRenderer.invoke('write-config', config),
  generateBuddy: (filters) => ipcRenderer.invoke('generate-buddy', filters),
  onGenerationProgress: (callback) => {
    ipcRenderer.on('generation-progress', (event, data) => callback(data))
  }
})
