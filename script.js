0// Esperar a que el documento se cargue completamente
window.onload = function() {
    // Obtén una referencia a la imagen por su ID
    var imagen = document.getElementById("logo-img");
    
    // Agrega un evento de clic a la imagen
    imagen.addEventListener("click", function() {
        // Redirige a otra página al hacer clic en la imagen
        window.parent.location.href = "index.html";
    });
};