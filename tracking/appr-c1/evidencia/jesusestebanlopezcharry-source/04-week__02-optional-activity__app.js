// ==========================================
// API PÚBLICA REAL
// OPEN FOOD FACTS
// ==========================================

const API_URL =
    "https://world.openfoodfacts.org/api/v2/search";


// ==========================================
// API PÚBLICA DE PRECIOS
// OPEN PRICES
// ==========================================

const PRICE_API_URL =
    "https://prices.openfoodfacts.org/api/v1/prices";


// ==========================================
// VARIABLES
// ==========================================

let productos = [];

let paginaActual = 1;

const productosPorPagina = 10;

let cargando = false;

let hayMasProductos = true;


// ==========================================
// ELEMENTOS DEL HTML
// ==========================================

const tablaProductos =
    document.getElementById("tablaProductos");

const contador =
    document.getElementById("contador");

const btnCargarMas =
    document.getElementById("btnCargarMas");

const btnNuevo =
    document.getElementById("btnNuevo");

const formularioProducto =
    document.getElementById("formularioProducto");

const btnCancelar =
    document.getElementById("btnCancelar");

const btnGuardar =
    document.getElementById("btnGuardar");

const nombreProducto =
    document.getElementById("nombreProducto");

const precioProducto =
    document.getElementById("precioProducto");

const stockProducto =
    document.getElementById("stockProducto");

const buscar =
    document.getElementById("buscar");

const btnBuscar =
    document.getElementById("btnBuscar");


// ==========================================
// OBTENER PRECIO REAL
// DESDE OPEN PRICES
// ==========================================

async function obtenerPrecioReal(codigoBarras) {

    try {

        // ------------------------------------------
        // Validar código de barras
        // ------------------------------------------

        if (!codigoBarras) {

            return null;

        }


        const url =
            PRICE_API_URL +
            "?product_code=" +
            encodeURIComponent(
                codigoBarras
            );


        console.log(
            "Consultando precio:",
            url
        );


        const respuesta =
            await fetch(url);


        console.log(
            "Estado Open Prices:",
            respuesta.status
        );


        if (!respuesta.ok) {

            console.warn(
                "No se encontró precio para:",
                codigoBarras
            );

            return null;

        }


        const datos =
            await respuesta.json();


        console.log(
            "Respuesta Open Prices:",
            datos
        );


        // ------------------------------------------
        // Verificar resultados
        // ------------------------------------------

        if (

            !datos.items ||

            !Array.isArray(
                datos.items
            ) ||

            datos.items.length === 0

        ) {

            return null;

        }


        // ------------------------------------------
        // Filtrar precios válidos
        // ------------------------------------------

        const preciosValidos =
            datos.items.filter(
                function(item) {

                    return (

                        item.price !== null &&

                        item.price !== undefined &&

                        !isNaN(
                            Number(
                                item.price
                            )
                        ) &&

                        Number(
                            item.price
                        ) > 0

                    );

                }
            );


        if (
            preciosValidos.length === 0
        ) {

            return null;

        }


        // ------------------------------------------
        // Ordenar por fecha
        // Más reciente primero
        // ------------------------------------------

        preciosValidos.sort(
            function(a, b) {

                return (

                    new Date(
                        b.date
                    ) -

                    new Date(
                        a.date
                    )

                );

            }
        );


        // ------------------------------------------
        // Tomar precio más reciente
        // ------------------------------------------

        const precio =
            Number(
                preciosValidos[0].price
            );


        if (

            isNaN(precio) ||

            precio <= 0

        ) {

            return null;

        }


        return precio;

    }

    catch (error) {

        console.error(
            "Error obteniendo precio:",
            error
        );


        return null;

    }

}


// ==========================================
// GENERAR STOCK INICIAL
// ==========================================
//
// IMPORTANTE:
// Open Food Facts NO proporciona el stock
// de nuestro inventario.
//
// Por eso generamos un stock inicial
// de ejemplo entre 1 y 50.
//
// Después puede modificarse con EDITAR.
//

function generarStockInicial() {

    return Math.floor(
        Math.random() * 50
    ) + 1;

}


// ==========================================
// CARGAR PRODUCTOS DE LA API
// ==========================================

async function cargarProductos() {

    // ------------------------------------------
    // Evitar solicitudes duplicadas
    // ------------------------------------------

    if (cargando) {

        return;

    }


    // ------------------------------------------
    // Verificar si existen más productos
    // ------------------------------------------

    if (!hayMasProductos) {

        return;

    }


    cargando = true;


    // ==========================================
    // ESTADO DE CARGA
    // ==========================================

    contador.textContent =
        "⏳ Cargando productos desde la API...";


    btnCargarMas.disabled =
        true;


    btnCargarMas.textContent =
        "⏳ Cargando...";


    // ==========================================
    // URL OPEN FOOD FACTS
    // ==========================================

    const url =
        API_URL +
        "?page=" +
        paginaActual +
        "&page_size=" +
        productosPorPagina +
        "&fields=code,product_name,brands,categories_tags_en,quantity";


    console.log(
        "API Open Food Facts:",
        url
    );


    try {

        // ==========================================
        // CONSULTAR OPEN FOOD FACTS
        // ==========================================

        const respuesta =
            await fetch(url);


        console.log(
            "Estado HTTP:",
            respuesta.status
        );


        if (!respuesta.ok) {

            throw new Error(
                "HTTP " +
                respuesta.status
            );

        }


        const datos =
            await respuesta.json();


        console.log(
            "Respuesta Open Food Facts:",
            datos
        );


        // ==========================================
        // PRODUCTOS RECIBIDOS
        // ==========================================

        const nuevosProductos =
            datos.products || [];


        // ==========================================
        // SI NO LLEGARON PRODUCTOS
        // ==========================================

        if (
            nuevosProductos.length === 0
        ) {

            hayMasProductos =
                false;


            actualizarBoton();

            actualizarContador();

            return;

        }


        // ==========================================
        // MENSAJE
        // ==========================================

        contador.textContent =
            "💰 Consultando precios reales...";


        // ==========================================
        // OBTENER PRECIOS
        // ==========================================

        const productosConPrecio =
            await Promise.all(

                nuevosProductos.map(
                    async function(producto) {

                        // ------------------------------------------
                        // Obtener precio
                        // ------------------------------------------

                        const precioReal =
                            await obtenerPrecioReal(
                                producto.code
                            );


                        // ------------------------------------------
                        // Generar stock inicial
                        // ------------------------------------------

                        const stockInicial =
                            generarStockInicial();


                        console.log(
                            "Producto:",
                            producto.product_name,

                            "| Código:",
                            producto.code,

                            "| Precio:",
                            precioReal,

                            "| Stock:",
                            stockInicial
                        );


                        // ------------------------------------------
                        // Crear producto
                        // ------------------------------------------

                        return {

                            id:
                                producto.code ||
                                (
                                    Date.now() +
                                    Math.random()
                                ),

                            title:
                                producto.product_name ||
                                "Producto sin nombre",

                            price:
                                precioReal,

                            stock:
                                stockInicial,

                            brand:
                                producto.brands ||
                                "Sin marca",

                            category:

                                producto.categories_tags_en &&

                                producto.categories_tags_en.length > 0

                                    ? producto.categories_tags_en[0]

                                    : "Sin categoría",

                            quantity:
                                producto.quantity ||
                                ""

                        };

                    }
                )

            );


        // ==========================================
        // AGREGAR PRODUCTOS
        // ==========================================

        productosConPrecio.forEach(
            function(producto) {

                productos.push(
                    producto
                );

            }
        );


        // ==========================================
        // SIGUIENTE PÁGINA
        // ==========================================

        paginaActual++;


        // ==========================================
        // COMPROBAR SI HAY MÁS
        // ==========================================

        if (

            nuevosProductos.length <
            productosPorPagina

        ) {

            hayMasProductos =
                false;

        }


        // ==========================================
        // MOSTRAR
        // ==========================================

        mostrarProductos(
            productos
        );


        actualizarContador();

        actualizarBoton();

    }

    catch (error) {

        console.error(
            "ERROR API:",
            error
        );


        contador.textContent =
            "❌ Error al cargar los productos.";


        btnCargarMas.disabled =
            false;


        btnCargarMas.textContent =
            "🔄 Intentar nuevamente";

    }

    finally {

        cargando =
            false;

    }

}


// ==========================================
// ACTUALIZAR BOTÓN
// ==========================================

function actualizarBoton() {

    if (!hayMasProductos) {

        btnCargarMas.disabled =
            true;


        btnCargarMas.textContent =
            "✓ No hay más productos";

    }

    else {

        btnCargarMas.disabled =
            false;


        btnCargarMas.textContent =
            "➕ Cargar más productos";

    }

}


// ==========================================
// BOTÓN CARGAR MÁS
// ==========================================

btnCargarMas.addEventListener(
    "click",
    function() {

        cargarProductos();

    }
);


// ==========================================
// MOSTRAR PRODUCTOS
// ==========================================

function mostrarProductos(
    listaProductos
) {

    tablaProductos.innerHTML =
        "";


    // ==========================================
    // SIN PRODUCTOS
    // ==========================================

    if (
        listaProductos.length === 0
    ) {

        tablaProductos.innerHTML =

            "<tr>" +

                "<td colspan='5'>" +

                    "No hay productos."

                + "</td>" +

            "</tr>";

        return;

    }


    // ==========================================
    // RECORRER PRODUCTOS
    // ==========================================

    listaProductos.forEach(
        function(producto) {

            const fila =
                document.createElement("tr");


            // ==========================================
            // CÓDIGO
            // ==========================================

            const codigo =
                "P" +
                String(
                    producto.id
                ).padStart(
                    8,
                    "0"
                );


            // ==========================================
            // PRECIO
            // ==========================================

            let precioMostrar =
                "Precio no disponible";


            if (

                producto.price !== null &&

                producto.price !== undefined &&

                !isNaN(
                    Number(
                        producto.price
                    )
                ) &&

                Number(
                    producto.price
                ) > 0

            ) {

                precioMostrar =
                    "$" +
                    Number(
                        producto.price
                    ).toFixed(2);

            }


            // ==========================================
            // STOCK
            // ==========================================

            let stockMostrar =
                producto.stock;


            if (

                stockMostrar === null ||

                stockMostrar === undefined ||

                isNaN(
                    Number(
                        stockMostrar
                    )
                )

            ) {

                stockMostrar =
                    0;

            }


            // ==========================================
            // CREAR FILA
            // ==========================================

            fila.innerHTML =

                "<td>" +

                    codigo +

                "</td>" +


                "<td>" +

                    "<strong>" +

                        producto.title +

                    "</strong>" +

                    "<br>" +

                    "<small>" +

                        producto.brand +

                    "</small>" +

                "</td>" +


                "<td>" +

                    precioMostrar +

                "</td>" +


                "<td>" +

                    stockMostrar +

                "</td>" +


                "<td>" +

                    "<button " +

                        "type='button' " +

                        "class='btn-ver'>" +

                        "👁️" +

                    "</button>" +


                    "<button " +

                        "type='button' " +

                        "class='btn-editar'>" +

                        "✏️" +

                    "</button>" +


                    "<button " +

                        "type='button' " +

                        "class='btn-eliminar'>" +

                        "🗑️" +

                    "</button>" +

                "</td>";


            // ==========================================
            // VER
            // ==========================================

            fila
                .querySelector(
                    ".btn-ver"
                )
                .addEventListener(
                    "click",
                    function() {

                        verProducto(
                            producto.id
                        );

                    }
                );


            // ==========================================
            // EDITAR
            // ==========================================

            fila
                .querySelector(
                    ".btn-editar"
                )
                .addEventListener(
                    "click",
                    function() {

                        editarProducto(
                            producto.id
                        );

                    }
                );


            // ==========================================
            // ELIMINAR
            // ==========================================

            fila
                .querySelector(
                    ".btn-eliminar"
                )
                .addEventListener(
                    "click",
                    function() {

                        eliminarProducto(
                            producto.id
                        );

                    }
                );


            // ==========================================
            // AGREGAR FILA
            // ==========================================

            tablaProductos.appendChild(
                fila
            );

        }
    );

}


// ==========================================
// CONTADOR
// ==========================================

function actualizarContador() {

    contador.textContent =
        "Productos cargados desde Open Food Facts: " +
        productos.length;

}


// ==========================================
// BUSCADOR
// ==========================================

btnBuscar.addEventListener(
    "click",
    buscarProductos
);


buscar.addEventListener(
    "input",
    buscarProductos
);


function buscarProductos() {

    const texto =
        buscar.value
            .trim()
            .toLowerCase();


    // ==========================================
    // MOSTRAR TODOS
    // ==========================================

    if (
        texto === ""
    ) {

        mostrarProductos(
            productos
        );

        return;

    }


    // ==========================================
    // FILTRAR
    // ==========================================

    const resultados =
        productos.filter(
            function(producto) {

                return (

                    producto.title
                        .toLowerCase()
                        .includes(
                            texto
                        )

                    ||

                    producto.brand
                        .toLowerCase()
                        .includes(
                            texto
                        )

                );

            }
        );


    mostrarProductos(
        resultados
    );

}


// ==========================================
// NUEVO PRODUCTO
// ==========================================

btnNuevo.addEventListener(
    "click",
    function() {

        formularioProducto.style.display =
            "block";


        nombreProducto.value =
            "";


        precioProducto.value =
            "";


        stockProducto.value =
            "";


        nombreProducto.focus();

    }
);


// ==========================================
// CANCELAR
// ==========================================

btnCancelar.addEventListener(
    "click",
    function() {

        formularioProducto.style.display =
            "none";

    }
);


// ==========================================
// GUARDAR PRODUCTO
// ==========================================

btnGuardar.addEventListener(
    "click",
    function() {

        const nombre =
            nombreProducto.value.trim();


        const precio =
            Number(
                precioProducto.value
            );


        const stock =
            Number(
                stockProducto.value
            );


        // ==========================================
        // VALIDAR NOMBRE
        // ==========================================

        if (
            nombre === ""
        ) {

            alert(
                "Escribe el nombre del producto."
            );

            return;

        }


        // ==========================================
        // VALIDAR PRECIO
        // ==========================================

        if (

            isNaN(precio) ||

            precio <= 0

        ) {

            alert(
                "Escribe un precio válido."
            );

            return;

        }


        // ==========================================
        // VALIDAR STOCK
        // ==========================================

        if (

            isNaN(stock) ||

            stock < 0

        ) {

            alert(
                "Escribe un stock válido."
            );

            return;

        }


        // ==========================================
        // CREAR PRODUCTO
        // ==========================================

        const nuevoProducto = {

            id:
                "LOCAL-" +
                Date.now(),

            title:
                nombre,

            price:
                precio,

            stock:
                stock,

            brand:
                "Producto propio",

            category:
                "Inventario",

            quantity:
                ""

        };


        // ==========================================
        // AGREGAR PRODUCTO
        // ==========================================

        productos.unshift(
            nuevoProducto
        );


        // ==========================================
        // ACTUALIZAR TABLA
        // ==========================================

        mostrarProductos(
            productos
        );


        actualizarContador();


        // ==========================================
        // CERRAR FORMULARIO
        // ==========================================

        formularioProducto.style.display =
            "none";


        nombreProducto.value =
            "";


        precioProducto.value =
            "";


        stockProducto.value =
            "";


        alert(
            "✅ Producto agregado correctamente."
        );

    }
);


// ==========================================
// VER PRODUCTO
// ==========================================

function verProducto(id) {

    const producto =
        productos.find(
            function(producto) {

                return producto.id === id;

            }
        );


    if (
        !producto
    ) {

        return;

    }


    // ==========================================
    // PRECIO
    // ==========================================

    let precioMostrar =
        "Precio no disponible";


    if (

        producto.price !== null &&

        producto.price !== undefined &&

        Number(
            producto.price
        ) > 0

    ) {

        precioMostrar =
            "$" +
            Number(
                producto.price
            ).toFixed(2);

    }


    // ==========================================
    // MOSTRAR INFORMACIÓN
    // ==========================================

    alert(

        "📦 PRODUCTO\n\n" +

        "Código: " +
        producto.id +

        "\nProducto: " +
        producto.title +

        "\nMarca: " +
        producto.brand +

        "\nCategoría: " +
        producto.category +

        "\nCantidad: " +
        (
            producto.quantity ||
            "No registrada"
        ) +

        "\nPrecio: " +
        precioMostrar +

        "\nStock: " +
        producto.stock

    );

}


// ==========================================
// EDITAR PRODUCTO
// ==========================================

function editarProducto(id) {

    const producto =
        productos.find(
            function(producto) {

                return producto.id === id;

            }
        );


    if (
        !producto
    ) {

        return;

    }


    // ==========================================
    // EDITAR NOMBRE
    // ==========================================

    const nombre =
        prompt(
            "Nombre:",
            producto.title
        );


    if (
        nombre === null
    ) {

        return;

    }


    // ==========================================
    // EDITAR PRECIO
    // ==========================================

    const precio =
        prompt(
            "Precio:",
            producto.price || ""
        );


    if (
        precio === null
    ) {

        return;

    }


    // ==========================================
    // EDITAR STOCK
    // ==========================================

    const stock =
        prompt(
            "Stock:",
            producto.stock
        );


    if (
        stock === null
    ) {

        return;

    }


    // ==========================================
    // VALIDAR PRECIO
    // ==========================================

    if (

        isNaN(
            Number(precio)
        ) ||

        Number(precio) <= 0

    ) {

        alert(
            "El precio no es válido."
        );

        return;

    }


    // ==========================================
    // VALIDAR STOCK
    // ==========================================

    if (

        isNaN(
            Number(stock)
        ) ||

        Number(stock) < 0

    ) {

        alert(
            "El stock no es válido."
        );

        return;

    }


    // ==========================================
    // ACTUALIZAR
    // ==========================================

    producto.title =
        nombre.trim();


    producto.price =
        Number(precio);


    producto.stock =
        Number(stock);


    // ==========================================
    // ACTUALIZAR TABLA
    // ==========================================

    mostrarProductos(
        productos
    );


    actualizarContador();

}


// ==========================================
// ELIMINAR PRODUCTO
// ==========================================

function eliminarProducto(id) {

    const indice =
        productos.findIndex(
            function(producto) {

                return producto.id === id;

            }
        );


    if (
        indice === -1
    ) {

        return;

    }


    // ==========================================
    // CONFIRMAR
    // ==========================================

    const confirmar =
        confirm(

            "¿Eliminar " +

            productos[indice].title +

            "?"

        );


    if (
        !confirmar
    ) {

        return;

    }


    // ==========================================
    // ELIMINAR
    // ==========================================

    productos.splice(
        indice,
        1
    );


    // ==========================================
    // ACTUALIZAR
    // ==========================================

    mostrarProductos(
        productos
    );


    actualizarContador();

}


// ==========================================
// INICIAR APLICACIÓN
// ==========================================

cargarProductos();