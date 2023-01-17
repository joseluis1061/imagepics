//import { ipcRenderer } from "electron";

const { contextBridge, ipcRenderer } = require('electron')

// contextBridge.exposeInIsolatedWorld(
//   1004,
//   'electron',
//   {
//     doThing: () => ipcRenderer.send('do-a-thing')
//   }
// )



function setIpc () {
    ipcRenderer.on('pong', (event, arg) => {
        console.log(`Pong recibido -- {arg}`);
    })
}

// Desde el frontend vamos a enviar una fecha
function sendIpc () {
    ipcRenderer.send('ping', new Date());
}

module.exports={
    setIpc: setIpc,
    sendIpc: sendIpc
}