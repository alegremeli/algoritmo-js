let n
let repetir = true
do {
    n = parseInt(prompt("Ingrese la cantidad de productos que desea comprar")) // Pide un número
    if (isNaN(n)) {
        alert("Por favor, ingrese un número válido") 
    } else {
        repetir = false
    }
} while(repetir == true)

for (let i = 0; i < n; i = i + 1) { // Me aseguro de que el ciclo se repita n veces
    alert(`El producto ${i+1} se ingresó al carrito`)
}

