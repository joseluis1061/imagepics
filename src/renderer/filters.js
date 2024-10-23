// const fs = require('node:fs');
const fs = require('fs-extra');

// Función para aplicar un filtro a una imagen
// filter: Filtro seleccionado
// currentImage: Imagen a la que se le aplica el filtro (Pantalla principal)
function applyFilter(filter, currentImage){
  // Crea una nueva imagen (paquete filtered)
  let imgObj = new Image(); // eslint-disable-line
  // Ubicación de la imagen objetivo
  imgObj.src = currentImage.src;
  
  // Proceso de aplicación de filtro a la imagen 
  filterous.importImage(imgObj, {})  // eslint-disable-line
  .applyInstaFilter(filter)
  .renderHtml(currentImage);
}

function saveImage(fileName, callback){
  // Leemos la imagen
  let fileSrc = document.getElementById('image-displayed').src;
  
  //Verificar si es una imagen con filtro o sin el
  if(fileSrc.indexOf(';base64,')!==-1){
    // Obtenemos la información eb base 64 de esta imagen
    fileSrc = fileSrc.replace(/^data:([A-Za-z-+/]+);base64,/,'');
    // Guardamos la imagen en la direccion fileName con la información de fileSrc
    fs.writeFile(fileName, fileSrc, 'base64', callback);
  }else{
    console.log("FILESRC: ", fileSrc);
    fileSrc=fileSrc.replace('file:///','');
    fs.copy(fileSrc, fileName, callback);
  }


}

// function saveImage(fileName,callback){
//   let fileSrc = document.getElementById('image-displayed').src
//   if(fileSrc.indexOf(';base64,')!==-1){
//     fileSrc=fileSrc.replace(/^data:([A-Za-z-+/]+);base64,/,'')
//     fs.writeFile(fileName,fileSrc,'base64',(err)=> {
//       if(err) return showDialog('error', 'ImaegePicks Error', 'Error al guardar la imagen');
//       showDialog('success', 'ImaegePicks Success', 'La imagen fue guardada correctamente');
//   })
//   }else{
//     fileSrc=fileSrc.replace('plp://','')
//     fs.copy(fileSrc,fileName,callback)
//   }
// }


// Exportar el modelo
//module.exports.applyFilter = applyFilter
module.exports = {
  applyFilter:applyFilter,
  saveImage: saveImage
}


// import fs from 'fs-extra'
// function applyFilter(filter,currentImage){
//   let imgObj=new Image()
//   imgObj.src=currentImage.dataset.original

//   filterous.importImage(imgObj,{})
//   .applyInstaFilter(filter)
//   .renderHtml(currentImage)
// }



// module.exports={applyFilter:applyFilter,saveImage:saveImage}