const form = document.getElementById("formProducto");
const inputs = form.querySelectorAll("input, textarea");

let productos = JSON.parse(localStorage.getItem("productos")) || [
    {
        id: 1,
        nombre: "Pelota de Rugby",
        marca: "Gilbert",
        precio: 25000,
        descripcion: "Pelota oficial para entrenamiento"
    },
    {
        id: 2,
        nombre: "Pelota de Rugby",
        marca: "Adidas",
        precio: 24000,
        descripcion: "Pelota oficial para entrenamiento"
    },
    {
        id: 3,
        nombre: "Pelota de Rugby",
        marca: "Canterbury",
        precio: 23000,
        descripcion: "Pelota oficial para entrenamiento"
    },
    {
        id: 4,
        nombre: "Pelota de Rugby",
        marca: "Flash",
        precio: 22000,
        descripcion: "Pelota oficial para entrenamiento"
    },
    {
        id: 5,
        nombre: "Pelota de Rugby",
        marca: "-",
        precio: 21000,
        descripcion: "Pelota oficial para entrenamiento"
    },
    {
        id: 6,
        nombre: "Camiseta de Rugby",
        marca: "Gilbert",
        precio: 30000,
        descripcion: "Camiseta resistente para entrenamiento o partido"
    },
    {
        id: 7,
        nombre: "Camiseta de Rugby",
        marca: "Adidas",
        precio: 29000,
        descripcion: "Camiseta resistente para entrenamiento o partido"
    },
    {
        id: 8,
        nombre: "Camiseta de Rugby",
        marca: "Canterbury",
        precio: 28000,
        descripcion: "Camiseta resistente para entrenamiento o partido"
    },
    {
        id: 9,
        nombre: "Camiseta de Rugby",
        marca: "Flash",
        precio: 27000,
        descripcion: "Camiseta resistente para entrenamiento o partido"
    },
    {
        id: 10,
        nombre: "Camiseta de Rugby",
        marca: "-",
        precio: 26000,
        descripcion: "Camiseta resistente para entrenamiento o partido"
    },
    {
        id: 11,
        nombre: "Short de Rugby",
        marca: "Gilbert",
        precio: 19000,
        descripcion: "Short de entrenamiento"
    },
    {
        id: 12,
        nombre: "Short de Rugby",
        marca: "Adidas",
        precio: 18000,
        descripcion: "Short de entrenamiento"
    },
    {
        id: 13,
        nombre: "Short de Rugby",
        marca: "Canterbury",
        precio: 17000,
        descripcion: "Short de entrenamiento"
    },
    {
        id: 14,
        nombre: "Short de Rugby",
        marca: "Canterbury",
        precio: 17000,
        descripcion: "Short de entrenamiento"
    },
    {
        id: 15,
        nombre: "Short de Rugby",
        marca: "Flash",
        precio: 16000,
        descripcion: "Short de entrenamiento"
    },
    {
        id: 16,
        nombre: "Bucal de Rugby",
        marca: "Gilbert",
        precio: 5000,
        descripcion: "Bucal de entrenamiento o partido"
    },
    {
        id: 17,
        nombre: "Bucal de Rugby",
        marca: "Adidas",
        precio: 4500,
        descripcion: "Bucal de entrenamiento o partido"
    },
    {
        id: 18,
        nombre: "Bucal de Rugby",
        marca: "Canterbury",
        precio: 4000,
        descripcion: "Bucal de entrenamiento o partido"
    },
    {
        id: 19,
        nombre: "Bucal de Rugby",
        marca: "Flash",
        precio: 3500,
        descripcion: "Bucal de entrenamiento o partido"
    },
    {
        id: 20,
        nombre: "Bucal de Rugby",
        marca: "-",
        precio: 3000,
        descripcion: "Bucal de entrenamiento o partido"
    },
    {
        id: 21,
        nombre: "Tee de Rugby",
        marca: "Gilbert",
        precio: 8000,
        descripcion: "Tee para patear"
    },
    {
        id: 21,
        nombre: "Tee de Rugby",
        marca: "Canterbury",
        precio: 7500,
        descripcion: "Tee para patear"
    },
    {
        id: 21,
        nombre: "Tee de Rugby",
        marca: "Flash",
        precio: 7000,
        descripcion: "Tee para patear"
    },
    {
        id: 21,
        nombre: "Tee de Rugby",
        marca: "-",
        precio: 6500,
        descripcion: "Tee para patear"
    }
];

const tablaProductos = document.querySelector("tbody");

function mostrarProductos() {
    tablaProductos.innerHTML = "";

    productos.forEach(producto => {
        tablaProductos.innerHTML += `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.marca}</td>
                <td>$${producto.precio}</td>
                <td>${producto.descripcion}</td>
                <td>
                    <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
    
    localStorage.setItem("productos", JSON.stringify(productos));
}

mostrarProductos();

function eliminarProducto(id) {
    productos = productos.filter(producto => producto.id !== id);
    mostrarProductos();
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (
        inputs[0].value === "" ||
        inputs[1].value === "" ||
        inputs[2].value === "" ||
        inputs[3].value === ""
    ) {
        alert("Todos los campos son obligatorios");
        return;
    }

    const nuevoProducto = {
        id: Date.now(),
        nombre: inputs[0].value,
        marca: inputs[1].value,
        precio: inputs[2].value,
        descripcion: inputs[3].value
    };

    productos.push(nuevoProducto);
    mostrarProductos();
    form.reset();
});