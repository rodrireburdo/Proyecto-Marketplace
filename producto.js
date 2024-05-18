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

Vue.createApp({
    data() {
        return {
            id: 1,
            title: "Notebook HP 14-dq2024la",
            description: "Computadora HP orientado para gama media. Procesador Intel® Core™ i3 de 11.ª generación.  Windows 10 Home 64.  Unidad de estado sólido PCIe® NVMe™ M.2 de 256 GB . Pantalla de 14 pulgadas.",
            imagenes: [
                'https://ar-media.hptiendaenlinea.com/catalog/product/8/V/8VW01LA-1_T1615590539.png',
                'https://www.pcstore.ae/wp-content/uploads/2022/03/2031-3-e1650022838582.jpg',
                'https://fercomse.com.do/wp-content/uploads/2023/08/c08393101.png',
            ],
            factory_url: "https://www.hp.com/ar-es/shop/notebook-hp-14-dq2024la-3v8j6la.html",
            carroDeCompras: [],
            indiceImagen: 0,
            indiceTipoNotebook: 0,
            notebooksTypes: [
                {
                    ramAmount: "8 GB",
                    price: 98038
                },
                {
                    ramAmount: "16 GB",
                    price: 122547
                }
            ],
        }
    },

    created() {
        this.cargarCarroDeCompras(); // Cargar datos del carrito al crear la instancia de Vue
    },

    computed: {

        urlImagen() {
            return this.imagenes[this.indiceImagen];
        },

        precioNotebook() {
            return this.notebooksTypes[this.indiceTipoNotebook].price;
        },

        descriptionItems() {
            return this.description.split('. ').filter(item => item.trim() !== '');
        }

    },

    methods: {
        cambiarImagen(indice) {
            this.indiceImagen = indice;
        },
        aniadirCarrito() {
            const cantidad = document.getElementById("input-cantidad").value;
            for (let i = 0; i < cantidad; i++) {
                const notebookSeleccionada = this.notebooksTypes[this.indiceTipoNotebook];
                const item = {
                    img: this.imagenes[0],
                    title: this.title,
                    ramAmount: notebookSeleccionada.ramAmount,
                    price: notebookSeleccionada.price
                };
                this.carroDeCompras.push(item);
                this.guardarCarroDeCompras();
            }
        },
        removerDelCarro(index) {
            this.carroDeCompras.splice(index, 1);
            this.guardarCarroDeCompras();
        },
        vaciarCarro() {
            this.carroDeCompras = [];
            this.guardarCarroDeCompras();
        },
        guardarCarroDeCompras() {
            localStorage.setItem('carroDeCompras', JSON.stringify(this.carroDeCompras));
        },
        cargarCarroDeCompras() {
            const carroGuardado = localStorage.getItem('carroDeCompras');
            if (carroGuardado) {
                this.carroDeCompras = JSON.parse(carroGuardado);
            }
        }
    },
}).mount('#aplicacion')