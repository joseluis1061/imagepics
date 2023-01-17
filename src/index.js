'use strict'
const path = require('path');
const { app, BrowserWindow } = require('electron');

// Detecta si la app corre sobre una Mac
const isMac = process.platform === 'darwin';
// Detectar si estamos en modo de desarrollo
const isDev = process.env.NODE_ENV !== 'production';

function createMainWindow() {
  const win = new BrowserWindow({
    title: 'Images Resizes',
    width: isDev ? 800:1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  if(isDev){
    win.webContents.openDevTools();
  }


  win.loadFile(path.join(__dirname, './renderer/index.html'));
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
})

// Evento: Verificar si todas la ventanas estan cerradas al cerrar la aplicación
app.on('window-all-closed', ()=>{
  // Si no corre en Mac
  if(!isMac){
    app.quit(); //Cerrar todas las ventanas
  }
});

