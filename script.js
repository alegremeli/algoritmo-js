let carrito = [] //Creo un array vacío, que se ira completando con los productos.

let producto1 = {
    nombre : "Budín",
    precio : 400
}

let producto2 = {
    nombre : "Muffin",
    precio : 200
}

let producto3 = {
    nombre : "Torta",
    precio : 1000
}

let producto4 = {
    nombre : "Donas",
    precio : 500
}

let productos = [producto1, producto2, producto3, producto4]
let nombreProductos = "" 

for(let i=0; i<productos.length; i=i+1) { 
    nombreProductos = nombreProductos + productos[i].nombre + "/"
}

function elegir() { // Sólo funciona si los productos ingresados están bien escritos
    let eleccion = prompt(`Que producto desea agregar?\n${nombreProductos.slice(0, -1)}`)

    for(let i=0; i<productos.length; i=i+1) {
        if (productos[i].nombre == eleccion) { 
            carrito.push(productos[i])
        }
    }
}

let repetir

do{  // Sólo funciona si en el prompt se responde "si" o "no" 
    elegir()
    
    let respuesta = prompt("¿Desea agregar otro producto? (si/no)") 
    
    if(respuesta == "si") { //Vuelve al principio.
        repetir = true
    } else if (respuesta == "no") { //Retorna el nombre del producto y su valor.
        repetir = false
    }
}while(repetir)

console.log(carrito)

let textoDelCarrito = ""

for(let i=0; i<carrito.length; i=i+1) { //Retorna el nombre del producto y su valor.
    textoDelCarrito = textoDelCarrito + `\nEl producto N°${i+1} es ${carrito[i].nombre}, y vale $${carrito[i].precio}\n`
}

alert(textoDelCarrito)