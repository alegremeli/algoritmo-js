let carrito = [] //Creo un array vacío, que se ira completando con los productos.

let producto1 = {
    nombre: "Budín",
    precio: 400,
    tipo: "sinTacc"
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
    tipo: "sinTacc"
}

let productos = [producto1, producto2, producto3, producto4]

let ofertas = productos.filter(producto => producto.precio < 500) //Filtra entre los productos, para saber el mejor precio, que luego sera una oferta.
console.log(ofertas)

let productosSinTacc = productos.filter((el) => el.tipo.includes('sinTacc')) //Filtra entre los productos dependiendo su tipo.
console.log(productosSinTacc)

let nombreProductos = ""

for (let elemento of productos) {
    nombreProductos = nombreProductos + elemento.nombre + "/"
}

function elegir() { // Sólo funciona si los productos ingresados están bien escritos
    let eleccion = prompt(`Que producto desea agregar?\n${nombreProductos.slice(0, -1)} \n Budínes y Donas sin Tacc. Muffins veganos. :)`)

    for (let elemento of productos) {
        if (elemento.nombre == eleccion) {
            carrito.push(elemento)
        }
    }
}

let repetir

do { // Sólo funciona si en el prompt se responde "si" o "no" 
    elegir()

    let respuesta = prompt("¿Desea agregar otro producto? (si/no)")

    if (respuesta == "si") { //Vuelve al principio.
        repetir = true
    } else if (respuesta == "no") { //Retorna el nombre del producto y su valor.
        repetir = false
    }
} while (repetir)

console.log(carrito)

let i = 1 // Reemplacé los tres for tradicionales por for...of
for (let producto of carrito) { //Retorna el nombre del producto y su valor.
    let compra = document.createElement("div");
    compra.innerHTML = `<h2>El producto elegido N°${i} es ${producto.nombre}, y vale $${producto.precio}</h2>`;
    document.body.appendChild(compra);
    i = i + 1
}