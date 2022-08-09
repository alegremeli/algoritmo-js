let carrito = [] //Creo un array vacío, que se ira completando con los productos.

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
        <button id="botonCarta${i+1}" type="button" class="btn btn-primary">Agregar</button>
    </div>
    `

    let divCartas = document.getElementById("cartas")
    divCartas.append(divProducto)

})

//Creo una clase para el botón de cada uno de mis productos, así cuando el usuario hace "click",
//puede agregarlo a su carrito.

productos.forEach((producto, i) => {
    let botonCartas = document.getElementById(`botonCarta${i+1}`)
    botonCartas.addEventListener("click", () => {
        let divCarrito = document.getElementById("carrito")
        divCarrito.innerHTML += `
    <div class="card-body bordeCartas">
        <h5 class="card-title">${producto.nombre}</h5>
        <h6 class="card-subtitle mb-2 text-muted">$${producto.precio}</h6>
        <p class="card-text">${producto.tipo}</p>
    </div>
    `
    })
})