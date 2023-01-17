'use strict'
const path = require('path');

const { app, BrowserWindow, ipcMain } = require('electron');

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

// Evento desde el backend
// Si desde el backend detecto un evento ping en el front
ipcMain.on('ping', (event, arg) => {
  // Verifico la información que me llego desde el frontend
  console.log(`ping recibido en el backend: \n ${arg}`);

  // Envia una respuesta del backend al frontend
  event.sender.send('pong', new Date());
})

