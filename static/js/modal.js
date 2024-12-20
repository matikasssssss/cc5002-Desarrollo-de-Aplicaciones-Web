// Referencias a los elementos del modal
let modal = document.getElementById("modal");
let modalImg = document.getElementById("modal-img");
let span = document.getElementsByClassName("close")[0];

// Función para abrir el modal con la imagen y el nombre del dispositivo
const openModal = (elem, deviceName) => {
  modalImg.src = elem.src;  // Asigna el src de la imagen seleccionada al modal
  document.querySelector('.modal-header h2').innerText = deviceName;  // Asigna el nombre del dispositivo al modal
  modal.style.display = "block";  // Muestra el modal
}

// Cerrar el modal cuando se hace clic en la 'X'
span.onclick = () => {
  modal.style.display = "none";  // Oculta el modal
}

// Cerrar el modal si se hace clic fuera de la imagen
modal.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";  // Oculta el modal si se hace clic fuera
  }
}
