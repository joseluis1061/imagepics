//import { ipcRenderer } from "electron";

const { contextBridge, ipcRenderer } = require('electron')

// Recibe un mensaje desde el backend de node JS
function setIpc () {
    // Si se produce un evento pong recibira el evento y un argumento
    // El argumento esperado es la fecha desde el backend
    ipcRenderer.on('pong', (event, arg) => {
        console.log(`pong recibido en el frontend \n${arg}`);
    })
}

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

module.exports={
    setIpc: setIpc,
    sendIpc: sendIpc,
    openDirectory: openDirectory
}