// import { ipcRenderer } from "electron";

const { contextBridge, ipcRenderer } = require('electron');
const { addImagesEvents, selectFirstImage, clearImages, loadImages } = require('./images-ui');
const { saveImage }  = require('./filters');
const path = require('node:path');
const { error } = require('node:console');


function setIpc () {
    // Si se produce un evento load-images recibimos las imagenes
    ipcRenderer.on('load-images', (event, images) => {
        // Borrar la lista anterior
        clearImages();
        // Agregamos la nueva lista de imagenes
        loadImages (images);
        // Agregar los eventos de selección a una imagen
        addImagesEvents();
        // La primer imagen de la lista quedara seleccionada
        selectFirstImage();
    })

    // Detectar el directorio para guardar una imagen
    ipcRenderer.on('save-img', (event, dir) => {
        saveImage(dir, (err) => {
            if (err) {
              showDialog('error', 'ImaegePicks', 'Error al guardar la imagen');
            } else {
              showDialog('info', 'ImaegePicks', 'La imagen fue guardada correctamente');
            }
          });
    })
}

// ENVIO DE EVENTOS DEL FRONTEND AL BACKEND

// Envia un mensaje al backend con la fecha como dato adicional
function sendIpc () {
    console.log('sendIpc')
    // Al ejecutar esta función desencadeno el evento ping y envio la fecha
    ipcRenderer.send('ping', new Date());
}

// Abrir un directorio
function openDirectory () {
  // Al ejecutar esta función se desencadena el evento open-directory
  ipcRenderer.send('open-directory');
}

// Abrir ventana para obtener dirección de guardado
function saveFile (){
    // Obtenemos la imagen que esta en pantalla principal
    const image = document.getElementById('image-displayed').dataset.original;
    // extensión de la imagen
    const ext = path.extname(image);
    ipcRenderer.send('open-save-dialog', ext);
}

// Abrir ventanas de dialogos
function showDialog (type, title, msg) {
    ipcRenderer.send('show-dialog', {
        type: type,
        title: title,
        message: msg
    });
}

// Ventana de configuraciones
function openPreferences() {
    console.log("openPreferences");
    const { BrowserWindow } = window.require("@electron/remote");  
    const preferencesWindow = new BrowserWindow({
      width: 400,
      height: 300,
      title: "Preferencias",
      center: true,
      modal: true,
      frame: true,
      show: false,
    });
    preferencesWindow.show();
    preferencesWindow.loadURL(`file://${path.join(__dirname, '../prefs-window/preferences.html')}`);
}
// Escucha los eventos que se producen en el backend de node js
module.exports={
    setIpc: setIpc,
    sendIpc: sendIpc,
    openDirectory: openDirectory,
    openPreferences:openPreferences,
    saveFile: saveFile
}