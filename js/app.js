const form = document.getElementById("formProducto");
const inputs = form.querySelectorAll("input, textarea");
const tablaProductos = document.getElementById("tabla-productos");

const STORAGE_KEY = "productosRugby";

const productosIniciales = [
    { id: 1, nombre: "Pelota de Rugby", marca: "Gilbert", precio: 25000, descripcion: "Pelota oficial para entrenamiento" },
    { id: 2, nombre: "Pelota de Rugby", marca: "Adidas", precio: 24000, descripcion: "Pelota oficial para entrenamiento" },
    { id: 3, nombre: "Pelota de Rugby", marca: "Canterbury", precio: 23000, descripcion: "Pelota oficial para entrenamiento" },
    { id: 4, nombre: "Pelota de Rugby", marca: "Flash", precio: 22000, descripcion: "Pelota oficial para entrenamiento" },
    { id: 5, nombre: "Pelota de Rugby", marca: "-", precio: 21000, descripcion: "Pelota oficial para entrenamiento" },

    { id: 6, nombre: "Camiseta de Rugby", marca: "Gilbert", precio: 30000, descripcion: "Camiseta resistente para entrenamiento o partido" },
    { id: 7, nombre: "Camiseta de Rugby", marca: "Adidas", precio: 29000, descripcion: "Camiseta resistente para entrenamiento o partido" },
    { id: 8, nombre: "Camiseta de Rugby", marca: "Canterbury", precio: 28000, descripcion: "Camiseta resistente para entrenamiento o partido" },
    { id: 9, nombre: "Camiseta de Rugby", marca: "Flash", precio: 27000, descripcion: "Camiseta resistente para entrenamiento o partido" },
    { id: 10, nombre: "Camiseta de Rugby", marca: "-", precio: 26000, descripcion: "Camiseta resistente para entrenamiento o partido" },

    { id: 11, nombre: "Short de Rugby", marca: "Gilbert", precio: 19000, descripcion: "Short de entrenamiento" },
    { id: 12, nombre: "Short de Rugby", marca: "Adidas", precio: 18000, descripcion: "Short de entrenamiento" },
    { id: 13, nombre: "Short de Rugby", marca: "Canterbury", precio: 17000, descripcion: "Short de entrenamiento" },
    { id: 14, nombre: "Short de Rugby", marca: "Flash", precio: 16000, descripcion: "Short de entrenamiento" },
    { id: 15, nombre: "Short de Rugby", marca: "-", precio: 15000, descripcion: "Short de entrenamiento" },

    { id: 16, nombre: "Bucal de Rugby", marca: "Gilbert", precio: 5000, descripcion: "Bucal de entrenamiento o partido" },
    { id: 17, nombre: "Bucal de Rugby", marca: "Adidas", precio: 4500, descripcion: "Bucal de entrenamiento o partido" },
    { id: 18, nombre: "Bucal de Rugby", marca: "Canterbury", precio: 4000, descripcion: "Bucal de entrenamiento o partido" },
    { id: 19, nombre: "Bucal de Rugby", marca: "Flash", precio: 3500, descripcion: "Bucal de entrenamiento o partido" },
    { id: 20, nombre: "Bucal de Rugby", marca: "-", precio: 3000, descripcion: "Bucal de entrenamiento o partido" },

    { id: 21, nombre: "Tee de Rugby", marca: "Gilbert", precio: 8000, descripcion: "Tee para patear" },
    { id: 22, nombre: "Tee de Rugby", marca: "Canterbury", precio: 7500, descripcion: "Tee para patear" },
    { id: 23, nombre: "Tee de Rugby", marca: "Flash", precio: 7000, descripcion: "Tee para patear" },
    { id: 24, nombre: "Tee de Rugby", marca: "-", precio: 6500, descripcion: "Tee para patear" }
];

function cargarProductos() {
    try {
        const guardados = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (Array.isArray(guardados)) {
            return guardados;
        }
    } catch (error) {
        console.error("No se pudieron leer los productos guardados:", error);
    }
    return productosIniciales;
}

function guardarProductos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
}

let productos = cargarProductos();

// Se usa textContent (y no innerHTML) para que lo que escribe el usuario
// se muestre como texto y nunca se interprete como HTML.
function crearCelda(texto) {
    const celda = document.createElement("td");
    celda.textContent = texto;
    return celda;
}

function mostrarProductos() {
    tablaProductos.innerHTML = "";

    productos.forEach(producto => {
        const fila = document.createElement("tr");

        fila.appendChild(crearCelda(producto.nombre));
        fila.appendChild(crearCelda(producto.marca));
        fila.appendChild(crearCelda("$" + Number(producto.precio).toLocaleString("es-AR")));
        fila.appendChild(crearCelda(producto.descripcion));

        const celdaAcciones = document.createElement("td");
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", () => eliminarProducto(producto.id));
        celdaAcciones.appendChild(botonEliminar);
        fila.appendChild(celdaAcciones);

        tablaProductos.appendChild(fila);
    });
}

function eliminarProducto(id) {
    productos = productos.filter(producto => producto.id !== id);
    guardarProductos();
    mostrarProductos();
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = inputs[0].value.trim();
    const marca = inputs[1].value.trim();
    const precio = Number(inputs[2].value);
    const descripcion = inputs[3].value.trim();

    if (nombre === "" || marca === "" || inputs[2].value === "" || descripcion === "") {
        alert("Todos los campos son obligatorios");
        return;
    }

    if (!Number.isFinite(precio) || precio <= 0) {
        alert("El precio tiene que ser un número mayor a 0");
        return;
    }

    const nuevoProducto = {
        id: Date.now(),
        nombre,
        marca,
        precio,
        descripcion
    };

    productos.push(nuevoProducto);
    guardarProductos();
    mostrarProductos();
    form.reset();
});

mostrarProductos();