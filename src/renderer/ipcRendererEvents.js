//import { ipcRenderer } from "electron";

const { contextBridge, ipcRenderer } = require('electron');
const { addImagesEvents, selectFirstImage, clearImages, loadImages } = require('./images-ui');

// Recibe un mensaje desde el backend de node JS
// function setIpc () {
//     // Si se produce un evento pong recibira el evento y un argumento
//     // El argumento esperado es la fecha desde el backend
//     ipcRenderer.on('pong', (event, arg) => {
//         console.log(`pong recibido en el frontend \n${arg}`);
//     })
// }

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

// Recibe las imagenes que se cargan desde el backend al seleccionar un directorio
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
}

module.exports={
    setIpc: setIpc,
    sendIpc: sendIpc,
    openDirectory: openDirectory
}