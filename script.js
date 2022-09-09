let arrayCarrito = []
if (localStorage.getItem("carritoStorage") != null) {
    arrayCarrito = JSON.parse(localStorage.getItem("carritoStorage"))
}
// Después del if, el array con clave "carritoStorage" ya está creado y guardado en la variable llamada "arrayCarrito"

let divCartas = document.getElementById("cartas")
let divCarrito = document.getElementById("carrito") // Saqué el divCarrito para poder usarlo más adelante

fetch("./json/productos.json")
    .then(response => response.json())
    .then(productos => {

        //Creo las cards de todos los productos que tenga, de manera general.
        productos.forEach((producto, i) => {
            const divProducto = `
        <div id="cartaProd${i+1}" class="card bordeCartas" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <h6 class="card-subtitle mb-2 text-muted">$${producto.precio}</h6>
                <img class="imgBordado" src="./img/${producto.img}" alt="">
            </div>
            <button type="button" class="btn btn-secondary">Agregar</button>
        </div>
        `
            divCartas.innerHTML += divProducto
        })

// "Si hay cosas en el carrito, se van a "pintar" en el DOM 
        if (arrayCarrito.length > 0) {
        // "Se pintaran en el carrito del DOM, los productos cuyo id están en el arrayCarrito"
            productos.forEach((elemento, i) => {
                if (arrayCarrito.some(elementoCarrito => elementoCarrito.id == elemento.id)) {
                    let a = arrayCarrito.find((elementoCarrito) => elementoCarrito.id == elemento.id)
                    divCarrito.innerHTML += `
                <div id="cartaProd${i+1}-carrito" class="card-body">
                    <h5 class="card-title">${elemento.nombre}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">$${elemento.precio}</h6>
                    <img class="imgBordado2" src="./img/${elemento.img}" alt="">
                    <p class="card-text">${a.cantidad}</p>

                </div>
                `
                }
            })
        }

        //Llamamos a cada botón creado, así cuando el usuario hace "click" puede agregar un producto a su carrito

        productos.forEach((producto, i) => {
            const cartaProducto = document.getElementById(`cartaProd${i+1}`)
            const botonAgregar = cartaProducto.children[1]
            botonAgregar.addEventListener("click", () => {
                if (!arrayCarrito.some(elemento => elemento.id == producto.id)) { // Si el producto no está en arrayCarrito, lo agrega
                    // Agrega cartas del carrito del DOM
                    divCarrito.innerHTML += `
                <div id="cartaProd${i+1}-carrito" class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">$${producto.precio}</h6>
                    <img class="imgBordado2" src="./img/${producto.img}" alt="">
                    <p class="card-text">1</p>
                </div>
                `
                    // Agregar productos en el arrayCarrito
                    arrayCarrito.push({
                        id: producto.id,
                        cantidad: 1
                    })

                    // Actualizar el carrito en el localstorage
                    localStorage.setItem("carritoStorage", JSON.stringify(arrayCarrito))
                } else {
                    let a = arrayCarrito.find((elementoCarrito) => elementoCarrito.id == producto.id)
                    if (a.cantidad < producto.stock) {
                        // Actualizamos el número que representa la cantidad de productos del mismo tipo 
                        let cartaProductos = document.getElementById(`cartaProd${i+1}-carrito`)
                        let cantidadProductos = cartaProductos.children[3]
                        cantidadProductos.innerText = parseInt(cantidadProductos.innerText) + 1

                        // Actualizamos la cantidad de productos en el carrito
                        let productoClickeado = arrayCarrito.find((elemento) => elemento.id == producto.id) // Devuelve el objeto que representa al producto que agregamos por segunda vez o más
                        productoClickeado.cantidad += 1 // Acá se actualiza el arrayCarrito

                        // Actualizamos el localstorage
                        localStorage.setItem("carritoStorage", JSON.stringify(arrayCarrito))

                        Toastify({ //   Alerta 
                            text: "Agregado al carrito",
                            duration: 3000,
                            gravity: 'top',
                            position: 'right',
                            style: {
                                background: '#f3969a'
                            }
                        }).showToast();

                    } else if ((a.cantidad = producto.stock)) { //Alerta para decirle al usuario que no hay más stock 
                        Swal.fire(
                            '🥺',
                            '¡Se acabo el stock de este producto! ',
                            'error',
                        )
                    }

                }
            })
        })
    })

let borrarCarrito = document.getElementById("borrarCarrito") //Defino el comportamiento del botón con id "borrarCarrito"

borrarCarrito.addEventListener("click", () => {
    arrayCarrito = [] //Se redefine el array de productos
    divCarrito.innerHTML = "" // Borra el carrito del HTML
    localStorage.setItem("carritoStorage", JSON.stringify([])) //Redefine el carrito en localstorage
})

let botonComprar = document.getElementById("botonComprar")

botonComprar.addEventListener("click", () => { // Defino el comportamiento del botón con id"botonComprar"
    Swal.fire({
        title: '¿Quiere confirmar su compra?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, quiero',
        cancelButtonText: 'No, no quiero'
    }).then((result) => {

        if (result.isConfirmed) { //Si el usuario acepta, finalizamos la compra
            Swal.fire({
                title: 'Compra exitosa',
                icon: 'success',
            })
            divCarrito.innerHTML = "" // Borra el carrito del HTML
            localStorage.setItem("carritoStorage", JSON.stringify([])) // Redefinimos el objeto "carritoStorage"      
        }
    })
})