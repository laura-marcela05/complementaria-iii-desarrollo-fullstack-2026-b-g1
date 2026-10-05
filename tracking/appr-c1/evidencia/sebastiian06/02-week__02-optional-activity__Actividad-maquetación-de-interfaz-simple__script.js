// Estado de la aplicación
let productos = [];
let contador = 0;

// Lista de productos de ejemplo (simulando datos de API)
const catalogoProductos = [
    { id: 1, nombre: "Laptop Pro", precio: "$1,299" },
    { id: 2, nombre: "Mouse Inalámbrico", precio: "$49" },
    { id: 3, nombre: "Teclado Mecánico", precio: "$89" },
    { id: 4, nombre: "Monitor 4K", precio: "$599" },
    { id: 5, nombre: "Audífonos Bluetooth", precio: "$79" },
    { id: 6, nombre: "Cargador Rápido", precio: "$29" },
    { id: 7, nombre: "Funda para Laptop", precio: "$39" },
    { id: 8, nombre: "SSD 1TB", precio: "$129" }
];

// Función para cargar productos (simula llamada a API)
function cargarProductos() {
    // Limpiamos la lista primero
    const lista = document.getElementById('listaProductos');
    lista.innerHTML = '';
    
    // Simulamos que los productos vienen de una API
    // En un caso real sería: fetch('/api/productos')
    setTimeout(() => {
        // Agregamos los productos del catálogo
        catalogoProductos.forEach(producto => {
            agregarProductoALista(producto);
        });
        
        // Actualizamos el contador
        actualizarContador();
        
        // Mensaje de éxito (opcional)
        console.log('✅ Productos cargados exitosamente');
        
        // Feedback visual (opcional)
        const boton = document.getElementById('cargarProductos');
        const textoOriginal = boton.textContent;
        boton.textContent = '✓ Productos Cargados';
        setTimeout(() => {
            boton.textContent = textoOriginal;
        }, 2000);
        
    }, 500); // Simulamos delay de red
}

// Función para agregar un producto a la lista
function agregarProductoALista(producto) {
    const lista = document.getElementById('listaProductos');
    
    // Crear elemento li
    const li = document.createElement('li');
    li.dataset.id = producto.id;
    
    // Crear span para el nombre
    const nombreSpan = document.createElement('span');
    nombreSpan.textContent = producto.nombre;
    nombreSpan.className = 'producto-nombre';
    
    // Crear span para el precio
    const precioSpan = document.createElement('span');
    precioSpan.textContent = producto.precio;
    precioSpan.className = 'producto-precio';
    precioSpan.style.color = '#764ba2';
    precioSpan.style.fontWeight = 'bold';
    
    // Agregar elementos al li
    li.appendChild(nombreSpan);
    li.appendChild(precioSpan);
    
    // Agregar evento de click al producto (muestra detalles)
    li.addEventListener('click', function() {
        alert(`📦 Producto: ${producto.nombre}\n💰 Precio: ${producto.precio}\n🆔 ID: ${producto.id}`);
    });
    
    // Agregar el li a la lista
    lista.appendChild(li);
}

// Función para limpiar la lista
function limpiarLista() {
    const lista = document.getElementById('listaProductos');
    lista.innerHTML = '';
    
    // Mostrar mensaje de lista vacía
    const mensajeVacio = document.createElement('li');
    mensajeVacio.textContent = 'La lista está vacía. Haz clic en "Cargar Productos"';
    mensajeVacio.className = 'empty-message';
    lista.appendChild(mensajeVacio);
    
    // Actualizar contador
    actualizarContador();
    
    // Feedback
    console.log('🗑️ Lista limpiada');
}

// Función para actualizar el contador
function actualizarContador() {
    const lista = document.getElementById('listaProductos');
    // Contamos solo los elementos li que no son el mensaje vacío
    const items = lista.querySelectorAll('li:not(.empty-message)');
    const total = items.length;
    
    document.getElementById('totalProductos').textContent = total;
}

// Función para inicializar la aplicación
function init() {
    console.log('🚀 Aplicación inicializada');
    
    // Obtener referencias a los botones
    const btnCargar = document.getElementById('cargarProductos');
    const btnLimpiar = document.getElementById('limpiarLista');
    
    // Agregar event listeners
    btnCargar.addEventListener('click', cargarProductos);
    btnLimpiar.addEventListener('click', limpiarLista);
    
    // Inicializar contador
    actualizarContador();
    
    // Agregar efecto de teclado (accesibilidad)
    document.addEventListener('keydown', function(e) {
        // Tecla 'C' para cargar (Ctrl/Cmd + C)
        if (e.key === 'c' && (e.ctrlKey || e.metaKey)) {
            // Prevenir el comportamiento por defecto del navegador
            e.preventDefault();
            cargarProductos();
        }
        // Tecla 'L' para limpiar (Ctrl/Cmd + L)
        if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            limpiarLista();
        }
    });
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', init);