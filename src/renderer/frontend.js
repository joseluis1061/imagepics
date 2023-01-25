// Comunicación entre procesos Frontend / Backend
const { setIpc, sendIpc, openDirectory } = require('./ipcRendererEvents');

//import imagesUi from './images-ui';
// Importar modulo de funciones del renderer
const { addImagesEvents, selectEvent, serchImagesEvent } = require('./images-ui');

window.addEventListener('load', () => {
  setIpc(); //Comunicación entre eventos
  addImagesEvents();
  serchImagesEvent();
  selectEvent();
  buttonEvent('open-directory', openDirectory);
})

// Comunicación entre procesos frontend a backend
// function openDirectory () {
//   // Detectamos el botón
//   const openDirectory = document.getElementById('open-directory')
//   // Si damos click sobre el 
//   openDirectory.addEventListener('click', () => {
//     // Enviamos un mensaje desde el frontend al backend
//     sendIpc();
//   })
// }

// Este boton puede recibir múltiples eventos.
// Requiere:
// id: Elemento del frontend que llama la función
// func: acción que ejecutará
// 1. Abrir un directorio mendiante una ventan de dialogo
function buttonEvent (id, func) {
  // Detectamos el elemento mediante su id de etiqueta
  const openDirectory = document.getElementById(id);
  // Al dar click ejecutará la función que se pasa como parametro
  // 1. 'open-directory': Abrir un directorio
  openDirectory.addEventListener('click', func)
}

