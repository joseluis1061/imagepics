//import os from 'os';
const os = require('os');
//import path from 'path';
const path = require('path');
//import url from 'url';
const url = require('url');

// Función para aplicar filtros
const applyFilter = require('./filters');

// Agrega el evento click a toda la lista de imagenes
function addImagesEvents () {
  // Selecciona todos los elementos lista de imagenes
  const thumbs = document.querySelectorAll('li.list-group-item');
  // Recorre todos los elementos y les agrega el evento click
  for (let i = 0, length = thumbs.length; i < length; i++){
    thumbs[i].addEventListener('click', function(){
      // Al dar click sobre algun elemento de la lista (thumbs[i])
      // Envia como parametro el actual thumbs this
      // A una función encargada de cambiar la imagen
      changeImages(this);
    })
  }
}

// Función para cambiar imagen seleccionada a azul
function changeImages(node){
  if(node){
    // Detectamos el elemnto li con la clase selected 
    const selected = document.querySelector('li.selected')
    // Si hay al menos uno
    if(selected){
      // Le eliminamos la clase
      selected.classList.remove('selected');
    }      
    // Luego se la agregamos al nodo donde dimos click
    node.classList.add('selected');
    // Y cambiamos la imagen que tenemos actualmente en pantalla por la del nodo
    document.getElementById('image-displayed').src = node.querySelector('img').src;
  }else{
    document.getElementById('image-displayed').src = '';
  }
}

//Selecciona la primera imagen que coincida con lo escrito en la barra de busqueda
function selectFirstImage () {
  //Selecciona la imagen que no tenga la clase hidden
  const image = document.querySelector('li.list-group-item:not(.hidden)')
  // Cambia la imagen de la ventana principal
  changeImages(image);
}

//Evento: Selección del filtro al cambiar la etiqueta select
function selectEvent () {
  // Traer el elemento filters
  const select = document.getElementById('filters');
  // Ubicamos la imagen que actualmente esta seleccionada
  const currentImage = document.getElementById('image-displayed');
  // Cuando el usuario elija un filtro
  select.addEventListener('change', function () {
    // Aplicar el filtro elegido a la imagen actual 
    applyFilter.applyFilter(this.value, currentImage)
  });
}

//Función para buscar una imagen especifica
function searchImagesEvent () {
  // Seleccionamos la barra de busqueda
  const searchBox = document.getElementById('search-box');
  // Evento que se ejecuta al presionar y liberar una tecla
  searchBox.addEventListener('keyup', function(){
    // Agregamos una expresión regular para comparar si lo escrito coincide
    // con algún valor.
    // g => global, hace coincidir todas las instancias del patrón en una cadena, no solo una
    // i => no distingue entre mayúsculas y minúsculas (así, por ejemplo, /a/icoincidirá con 
    // la cadena "a"o "A"
    const regex = new RegExp(this.value.toLowerCase(), 'gi')
    if(this.value.length > 0){
      const thumbs = document.querySelectorAll('li.list-group-item img');
      // Mediante este for se oculta o muestra la imagen si coincide o no
      // con la información entregada por el usuario
      for (let i = 0, length1 = thumbs.length; i < length1; i++){
        //Ruta donde se encuentra la imagen
        const fileUrl = url.parse(thumbs[i].src);
        // Solo toma el nombre del archivo
        const fileName = path.basename(fileUrl.pathname);
        // Si el nombre entregado coincide con el nombre del archivo
        if (fileName.match(regex)){
          // Elimina la clase hidden del nodo padre que es la etiqueta li
          thumbs[i].parentNode.classList.remove('hidden');
        }else{
          // Si no coincide agrega la clase hidden para ocultar el elemento
          thumbs[i].parentNode.classList.add('hidden');
        }
      }
      selectFirstImage()
    }
    //Si no hay nada escrito en la barra de busqueda
    else{
      //Buscamos todos los elementos ocultos
      const hidden = document.querySelectorAll('li.hidden');
      // Iteramos sobre ellos
      for (let i = 0, length1 = hidden.length; i < length1; i++){
        // Elimina la clase hidden de la etiqueta li
        hidden[i].classList.remove('hidden');
      }
    }
  });
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

module.exports = {
  addImagesEvents: addImagesEvents,
  changeImages: changeImages,
  clearImages: clearImages, 
  selectFirstImage: selectFirstImage,
  selectEvent: selectEvent, 
  searchImagesEvent: searchImagesEvent
}