const { ipcMain, dialog } = require('electron');
// Rutas de un archivo
const path = require('path');
// File sistem para leer archivos
const fs = require('fs')
// Modulo para verificar si un archivo es de tipo imagen
const isImage = require('is-image');
// Permite traducir información de tamaños a un formato humano
const filesize = require("filesize");

function setMainIpc (win){
    // Evento desde el backend
// Si desde el backend detecto un evento ping en el front
ipcMain.on('ping', (event, arg) => {
    // Verifico la información que me llego desde el frontend
    console.log(`ping recibido en el backend: \n ${arg}`);
  
    // Envia una respuesta del backend al frontend
    event.sender.send('pong', new Date());
  })
  
  // Abrir un directorio con el evento open-directory
  ipcMain.on('open-directory', (event) => {
    // Abro una ventana de dialogo para seleccionar el directorio
    // Requiere la ventana desde donde se llamara y opciones del dialogo
    dialog.showOpenDialog( win, {
      // Titulo de la ventana de dialogo
      title: 'Selecciona un directorio',
      // Texto del botón principal
      buttonLabel: 'Abrir',
      // Que tipo de archivos puede seleccionar
      properties: ['openFile', 'openDirectory']
    }).then(result => {
      // Es una promesa y por lo tanto retorna un resultado con diferente información
      console.log(result.canceled); // si el diálogo fue o no cancelado
      console.log(result.filePaths) // Arreglo rutas a los archivos elegidos
      console.log(result.bookmarks ) // Arreglo rutas a los archivos elegidos en Mac
      const dir = result.filePaths; // Directorios
      console.log("Directorio: ", dir)
      if(result.canceled){
        return;
      }
      // Array con imagenes
      const images = [];
      // Si obtuvimos rutas de archivos
      if (dir.length > 0){
        // Leer el primer directorio elegido
        fs.readdir(dir[0], (err, files) => {
          // Recorrer todos los archivos leidos
          for (let i = 0; i < files.length; i++){
            // Seleccionar solo los que sen de tipo imagen
            if(isImage(files[i])){
              // Me retorna la ruta de la imagen
              let imagesFile = path.join(dir[0], files[i]);
              // Los stats son estadisticas de un archivo
              // Nos intereza su tamaño
              let stats = fs.statSync(imagesFile);
              // Me retorna el tamaño de la imagem en un formato humano
              let size = filesize.filesize( stats.size, {round:0});
              // Agrego la ruta de la imagen y su tamaño al array de imagenes
              images.push({
                filename:files[i], 
                src : `file://${imagesFile}`,
                size: size
              })
            }
          }
          // Enviamos las imagenes cargadas al frontend que esta
          // atento al evento load-images
          event.sender.send('load-images', images);
        });
        console.log(images)
      }
    }).catch(err => {
      console.log(err)
    })  
  })
  
  // Dialogo para guardar imagen
  ipcMain.on('open-save-dialog', (event, ext)=> {
    // Abro una ventana de dialogo para seleccionar el directorio
    // Requiere la ventana desde donde se llamara y opciones del dialogo
    dialog.showSaveDialog( win, {
      // Titulo de la ventana de dialogo
      title: 'Guardar imagen',
      // Texto del botón principal
      buttonLabel: 'Guardar',
      // Que tipo de archivos puede seleccionar
      filters: [{name: 'Images', extensions: [ext.substr(1)]}]
    }).then(result => {
      // Si se cancela el guardado
      if(result.canceled){
        return;
      }
  
      const dir = result.filePath; // Directorio
      console.log("Directorio: ", dir)
      // Si obtuvimos rutas para guardar
      if (dir.length > 0){
        event.sender.send('save-img', dir)
      }
    }).catch(err => {
      console.log(err)
    })  
  })
  
  // Ventanas de mensajes
  ipcMain.on('show-dialog', (event, options)=> {
    dialog.showMessageBox(win, {
      type: options.type,
      title: options.title,
      message: options.message
    })
  })
}

module.exports = setMainIpc;