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
// Exportar el modelo
//module.exports.applyFilter = applyFilter
module.exports = {applyFilter:applyFilter}


// import fs from 'fs-extra'
// function applyFilter(filter,currentImage){
//   let imgObj=new Image()
//   imgObj.src=currentImage.dataset.original

//   filterous.importImage(imgObj,{})
//   .applyInstaFilter(filter)
//   .renderHtml(currentImage)
// }

// function saveImage(fileName,callback){
//   let fileSrc=document.getElementById('image-displayed').src
//   if(fileSrc.indexOf(';base64,')!==-1){
//     fileSrc=fileSrc.replace(/^data:([A-Za-z-+/]+);base64,/,'')
//     fs.writeFile(fileName,fileSrc,'base64',callback)}else{fileSrc=fileSrc.replace('plp://','')
//     fs.copy(fileSrc,fileName,callback)
//   }
// }

// module.exports={applyFilter:applyFilter,saveImage:saveImage}