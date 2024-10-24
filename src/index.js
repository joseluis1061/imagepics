'use strict'
// Rutas de un archivo
const path = require('path');
const setupErrors = require('./handle-errors');
const setMainIpc = require('./ipcMainEvents');

// Ventana principal
let win

const { app, BrowserWindow } = require('electron');
// Detecta si la app corre sobre una Mac
const isMac = process.platform === 'darwin';
// Detectar si estamos en modo de desarrollo
const isDev = process.env.NODE_ENV !== 'production';


function createMainWindow() {
  win = new BrowserWindow({
    title: 'Images Resizes',
    width: isDev ? 800:1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true, // Habilitando remote module
    }
  });

  if(isDev){
    win.webContents.openDevTools();
  }
  win.loadFile(path.join(__dirname, './renderer/main-window/index.html'));
};

app.whenReady().then(() => {
  createMainWindow();
  // Este fragmento me garantiza que si no tengo ninguna ventana
  // Se cree una al activar la aplicación.
  app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0){
    createMainWindow();
  }
  });

  // Habilitar remote para esta ventana
  require('@electron/remote/main').initialize();
  require("@electron/remote/main").enable(win.webContents)

  setupErrors(win);
  setMainIpc(win);
})

// Evento: Verificar si todas la ventanas estan cerradas al cerrar la aplicación
app.on('window-all-closed', ()=>{
  // Si no corre en Mac
  if(!isMac){
    app.quit(); //Cerrar todas las ventanas
  }
});
