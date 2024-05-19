function regresar() {
    window.history.back();
}

async function mostrarCantidadArticulos() {
    const response = await fetch('https://my-json-server.typicode.com/agustinruatta/fake_json_server_db/statistics');
    const datos = await response.json();
    const cantidadArticulos = datos.amount_of_products;

    document.getElementById('cantidad-articulos').textContent = "CANTIDAD DE ARTICULOS DISPONIBLES: " + cantidadArticulos;
}

Vue.createApp({
    data() {
        return {
            id: 1,
            title: "Notebook HP 14-dq2024la",
            image_url: "https://ar-media.hptiendaenlinea.com/catalog/product/8/V/8VW01LA-1_T1615590539.png",
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
    }
}).mount('#productosContainer')


mostrarCantidadArticulos();


