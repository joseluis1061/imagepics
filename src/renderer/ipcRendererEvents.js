//import { ipcRenderer } from "electron";

const { contextBridge, ipcRenderer } = require('electron')

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

// Función que elimina todas las imagenes cargadas en la lista
// Sirve para actualizar los datos al seleccionar un nuevo directorio
function clearImages () {
    // Selecciono el contenedor de las imagenes
    const oldImages = document.querySelectorAll('li.list-group-item');
    // Borro los hijos de los nodos para quitar las imagenes
    for (let i = 0; i < oldImages.length; i ++){
      oldImages[i].parentNode.removeChild(oldImages[i])
    }
}

// Función para crear los nodos html con las imagenes cuando se 
// actualiza un directorio
function  loadImages (images) {
    // Seleccionamos el nodo padre donde ingresaremos las imagenes
    const imagesList = document.querySelector('ul.list-group');

    // Crea los nodos para cada imagene en la lista
    for (let i = 0; i < images.length; i ++){        
        const node =`
            <li class="list-group-item">
                <img class="media-object pull-left" src=${images[i].src} height="32">
                <div class="media-body">
                <strong>${ images[i].filename }</strong>
                <p>${ images[i].size }</p>
                </div>
            </li>
        `
        // Le agrego como nodos hijos las imagenes que hemos creado
        imagesList.insertAdjacentHTML('beforeend', node);
    }
    
}

// Recibe las imagenes que se cargan desde el backend al seleccionar un directorio
function setIpc () {
    // Si se produce un evento load-images recibimos las imagenes
    ipcRenderer.on('load-images', (event, images) => {
        // Borrar la lista anterior
        clearImages();
        // Agregamos la nueva lista de imagenes
        loadImages (images)
    })
}

module.exports={
    setIpc: setIpc,
    sendIpc: sendIpc,
    openDirectory: openDirectory
}