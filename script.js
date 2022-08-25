// Optimicé el if/else anterior convirtiendolo en un operador ternario
localStorage.getItem("claveCarrito") ? document.getElementById("carrito").innerHTML = JSON.parse(localStorage.getItem("claveCarrito")).elementosCarrito : localStorage.setItem("claveCarrito", JSON.stringify({
    elementosCarrito: ""
}))

// Sabemos que después del if/else el objeto con clave "claveCarrito" ya está creado así que lo llamo y guardo en una variable llamada "carrito"
let carrito = JSON.parse(localStorage.getItem("claveCarrito"))

let producto1 = {
    nombre: "Budín",
    precio: 400,
    tipo: "Sin Tacc"
}

let producto2 = {
    nombre: "Muffin",
    precio: 200,
    tipo: "Vegano"
}

let producto3 = {
    nombre: "Torta",
    precio: 1000,
    tipo: "Común"
}

let producto4 = {
    nombre: "Donas",
    precio: 500,
    tipo: "Sin Tacc"
}

let productos = [producto1, producto2, producto3, producto4]

//Creo las cards de todos los productos que tenga, de manera general.
productos.forEach((producto, i) => {

    let divProducto = document.createElement("div");
    divProducto.innerHTML = `
    <div>
        <div id="cartaP${i+1}" class="card bordeCartas" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
            <h6 class="card-subtitle mb-2 text-muted">$${producto.precio}</h6>
            <p class="card-text">${producto.tipo}</p>
        </div>
        <button id="botonCarta${i+1}" type="button" class="btn btn-secondary">Agregar</button>
    </div>
    `

    let divCartas = document.getElementById("cartas")
    divCartas.append(divProducto)

})

//Creo una clase para el botón de cada uno de mis productos, así cuando el usuario hace "click",
//puede agregarlo a su carrito.

let botonCartas
let divCarrito = document.getElementById("carrito") // Saqué el divCarrito para poder usarlo más adelante

productos.forEach((producto, i) => {
    botonCartas = document.getElementById(`botonCarta${i+1}`)
    botonCartas.addEventListener("click", () => {
        divCarrito.innerHTML += `
        <div class="card-body bordeCartas">
            <h5 class="card-title">${producto.nombre}</h5>
            <h6 class="card-subtitle mb-2 text-muted">$${producto.precio}</h6>
            <p class="card-text">${producto.tipo}</p>
            <button id="botonEliminar${i+1}" type="button" class="btn btn-secondary">🗑️</button>
        </div>
        `
        // Esto actualiza el objeto con clave "claveCarrito" guardado en el localstorage
        carrito.elementosCarrito += `
        <div class="card-body bordeCartas">
            <h5 class="card-title">${producto.nombre}</h5>
            <h6 class="card-subtitle mb-2 text-muted">$${producto.precio}</h6>
            <p class="card-text">${producto.tipo}</p>
            <button id="botonEliminar${i+1}" type="button" class="btn btn-secondary">🗑️</button>
        </div>
        `

        localStorage.setItem("claveCarrito", JSON.stringify(carrito))

        Toastify({ //   Alerta 
            text: "Agregado al carrito",
            duration: 3000,
            gravity: 'top',
            position: 'right',
            style: {
                background: '#f3969a'
            }
        }).showToast();
    })
})




let botonComprar = document.getElementById("botonComprar")

botonComprar.addEventListener("click", () => { // Defino el comportamiento del botón con id"botonComprar"
    Swal.fire({
        title: '¿Está seguro de confirmar la compra?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, seguro',
        cancelButtonText: 'No, no quiero'
    }).then((result) => {

        if (result.isConfirmed) { //Si el usuario acepta, finalizamos la compra
            Swal.fire({
                title: 'Compra exitosa',
                icon: 'success',
            })
            divCarrito.innerHTML = "" // Borra el carrito del HTML
            carrito = {
                elementosCarrito: ""
            } // Redefine la variable "carrito"
            localStorage.setItem("claveCarrito", JSON.stringify(carrito)) // Redefinimos el objeto con clave "claveCarrito"        
        }
    })


})

const divPerros = document.getElementById("divPerros")
function mostrarPerros() {
    fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json())
    .then(({message}) => {
        divPerros.innerHTML = `
            <div>
                <h3>Perritos de la Tienda</h2>
                <p>c: ${message}</p>

            <div>
        `
    })
}
mostrarPerros()