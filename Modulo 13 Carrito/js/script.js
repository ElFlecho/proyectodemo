const carrito = document.querySelector("#carrito");
const listaPlaystation = document.querySelector('#lista-productos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoT = document.querySelector('#vaciar-carrito');

let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    listaPlaystation.addEventListener("click", agregar);
    carrito.addEventListener("click", eliminar);
    vaciarCarritoT.addEventListener("click", vaciarCarrito);
}

function agregar(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const consola = e.target.parentElement.parentElement;
        leerDatosConsolas(consola);
    }
}

function leerDatosConsolas(consola) {
    const infoConsola = {
        imagen: consola.querySelector('img').src,
        titulo: consola.querySelector('h4').textContent,
        precio: consola.querySelector('.precio').textContent,
        id: consola.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    if (articulosCarrito.some(consola => consola.id === infoConsola.id)) {
        const consolas = articulosCarrito.map(consola => {
            if (consola.id === infoConsola.id) {
                consola.cantidad++;
                return consola;
            } else {
                return consola;
            }
        });
        articulosCarrito = [...consolas];
    } else {
        articulosCarrito = [...articulosCarrito, infoConsola];
    }

    carritoHTML();
}

function carritoHTML() {
    contenedorCarrito.innerHTML = ''; // Limpiar HTML previo
    articulosCarrito.forEach(consola => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${consola.imagen}" width="100">
        </td>
        <td>${consola.titulo}</td>
        <td>${consola.precio}</td>
        <td>${consola.cantidad}</td>
        <td>
            <a href="#" class="borrar-consola" data-id="${consola.id}">X</a>
        </td>
        `;
        contenedorCarrito.appendChild(row);
    });
}

function eliminar(e) {
    if (e.target.classList.contains('borrar-consola')) {
        const consolaId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(consola => consola.id !== consolaId);
        carritoHTML();
    }
}

function vaciarCarrito() {
    articulosCarrito = [];
    carritoHTML();
}
