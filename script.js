function regresar() {
    window.history.back();
}

async function mostrarCantidadArticulos() {
    const response = await fetch('https://my-json-server.typicode.com/agustinruatta/fake_json_server_db/statistics');
    const datos = await response.json();
    const cantidadArticulos = datos.amount_of_products;

    document.getElementById('cantidad-articulos').textContent = "CANTIDAD DE ARTICULOS DISPONIBLES: " + cantidadArticulos;
}

async function mostrarArticulos() {
    const response = await fetch('https://my-json-server.typicode.com/agustinruatta/fake_json_server_db/products/');
const datos = await response.json();

for (const notebook of datos) {
    const producto = document.createElement('div');
    producto.className = "producto";

    const figure = document.createElement('figure');
    figure.className = "img-producto";

    const imagenNotebook = document.createElement('img');
    imagenNotebook.src = notebook.image_url;

    figure.appendChild(imagenNotebook);
    producto.appendChild(figure);

    const infoProducto = document.createElement('div');
    infoProducto.className = "infoProducto";

    const nombreProducto = document.createElement('p');
    nombreProducto.className = "nombreProducto";
    nombreProducto.textContent = notebook.title;
    infoProducto.appendChild(nombreProducto);

    for (const tipoNotebook of notebook.notebooksTypes) {
        const precioProducto = document.createElement('li');
        precioProducto.className = "precioProducto";
        
        precioProducto.textContent = `Ram: ${tipoNotebook.ramAmount} | $${tipoNotebook.price}`;

        infoProducto.appendChild(precioProducto);
    }

    const link = document.createElement('a');
    link.href = "index-producto.html";
    link.className = "masInfo";

    const button = document.createElement('button');
    button.className = "btnMasInfo";
    button.textContent = "Más Información";

    const icon = document.createElement('i');
    icon.className = "fa-solid fa-plus";
    button.appendChild(icon);

    link.appendChild(button);
    infoProducto.appendChild(link);

    producto.appendChild(infoProducto);
    productosContainer.appendChild(producto);

    }
}

mostrarCantidadArticulos();
mostrarArticulos();