window.onload = iniciar;

function iniciar() {
    // Agrego que el botón "Publicar" escuche el click
    document.getElementById("btn-publicar").addEventListener("click", publicarComentario);
    mostrarComentarios();
}

function publicarComentario() {
    // Obtengo el contenido en el textarea comentario
    let comentario = document.getElementById("comentario").value.trim();

    // Valido que el comentario no este vacio
    if (comentario === "") {
        alert("Por favor, escribe un comentario antes de publicar.");
        return;
    }

    // Obtener la valoracion en estrellas seleccionada por el usuario
    let valoracion = obtenerValoracion();

    // Validar que haya valoracion
    if (valoracion === 0) {
        alert("Por favor, queremos saber que tan buena fue tu experiencia. Califica con estrellas.");
        return;
    }

    // Obtengo los comentarios y valoraciones guardados en el localStorage (? es operador ternario)
    let comentariosGuardados = localStorage.getItem("comentarios");
    let comentarios = comentariosGuardados ? JSON.parse(comentariosGuardados) : [];

    let valoracionesGuardadas = localStorage.getItem("valoraciones");
    let valoraciones = valoracionesGuardadas ? JSON.parse(valoracionesGuardadas) : [];

    // Agregar el nuevo comentario y valoración a los arrays correspondientes
    comentarios.push(comentario);
    valoraciones.push(valoracion);

    // Guardo los comentarios y valoraciones actualizados en localStorage
    localStorage.setItem("comentarios", JSON.stringify(comentarios));
    localStorage.setItem("valoraciones", JSON.stringify(valoraciones));

    // Limpiar el area de texto despues de publicar el comentario
    document.getElementById("comentario").value = "";

    // Actualizoar lista de comentarios
    mostrarComentarios();
}

function obtenerValoracion() {
    let estrellas = document.getElementsByName("rating");
    let valoracion = 0;
    for (let i = 0; i < estrellas.length; i++) {
        if (estrellas[i].checked) {
            valoracion = 5 - i;
            break;
        }
    }
    return valoracion;
}

function mostrarComentarios() {
    let comentariosGuardados = localStorage.getItem("comentarios");
    let comentarios = comentariosGuardados ? JSON.parse(comentariosGuardados) : [];

    let valoracionesGuardadas = localStorage.getItem("valoraciones");
    let valoraciones = valoracionesGuardadas ? JSON.parse(valoracionesGuardadas) : [];

    let divComentarios = document.getElementById("divComentarios");
    divComentarios.textContent = ""; // Limpiar los comentarios anteriores

    // Agregar cada comentario y su valoración al div de comentarios
    for (let i = 0; i < comentarios.length; i++) {
        let nuevoComentario = document.createElement("div");
        nuevoComentario.classList.add("comentario"); // Agregar la clase "comentario" al nuevo comentario

        let usuario = document.createElement("h4");
        usuario.classList.add("UsuarioComentario");
        usuario.textContent = "Desconocido";

        // Crear elementos para la valoración y el contenido del comentario
        let valoracionIngresada = document.createElement("p");
        valoracionIngresada.textContent = "Valoración: " + valoraciones[i] + " estrellas";

        let contenidoIngesado = document.createElement("p");
        contenidoIngesado.textContent = comentarios[i];

        // Crear un botón de eliminar para cada comentario
        let botonEliminar = document.createElement("button");
        botonEliminar.classList.add("btnEliminarComentario");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.dataset.index = i; // Almacenar el índice del comentario en el atributo data-index
        botonEliminar.addEventListener("click", function () {
            let index = parseInt(this.dataset.index);
            eliminarComentario(index);
        });

        // Agregar elementos de valoración, contenido y botón eliminar al nuevo comentario
        nuevoComentario.appendChild(usuario);
        nuevoComentario.appendChild(valoracionIngresada);
        nuevoComentario.appendChild(contenidoIngesado);
        nuevoComentario.appendChild(botonEliminar);

        // Agregar el nuevo comentario al div de comentarios
        divComentarios.appendChild(nuevoComentario);
    }
}

function eliminarComentario(index) {
    let comentariosGuardados = localStorage.getItem("comentarios");
    let valoracionesGuardadas = localStorage.getItem("valoraciones");

    if (comentariosGuardados && valoracionesGuardadas) {
        let comentarios = JSON.parse(comentariosGuardados);
        let valoraciones = JSON.parse(valoracionesGuardadas);

        // Eliminar el comentario y la valoración correspondientes al índice dado
        comentarios.splice(index, 1);
        valoraciones.splice(index, 1);

        // Actualizar los comentarios y valoraciones en el localStorage
        localStorage.setItem("comentarios", JSON.stringify(comentarios));
        localStorage.setItem("valoraciones", JSON.stringify(valoraciones));

        // Volver a mostrar los comentarios actualizados
        mostrarComentarios();
    }
}