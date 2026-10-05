const express = require("express");

const app = express();

const PORT = 3000;

const productos = [
    { id: 1, nombre: "Arroz Diana 1kg", precio: 5000, codigoBarras: "7701234560011", familia: "Granos" },
    { id: 2, nombre: "Arroz Roa 1kg", precio: 5200, codigoBarras: "7701234560028", familia: "Granos" },
    { id: 3, nombre: "Lentejas 500g", precio: 4500, codigoBarras: "7701234560035", familia: "Granos" },
    { id: 4, nombre: "Frijol 500g", precio: 5500, codigoBarras: "7701234560042", familia: "Granos" },
    { id: 5, nombre: "Garbanzo 500g", precio: 4800, codigoBarras: "7701234560059", familia: "Granos" },

    { id: 6, nombre: "Leche Entera 1L", precio: 4500, codigoBarras: "7701234560066", familia: "Lácteos" },
    { id: 7, nombre: "Leche Deslactosada 1L", precio: 5200, codigoBarras: "7701234560073", familia: "Lácteos" },
    { id: 8, nombre: "Yogur Natural 1L", precio: 7500, codigoBarras: "7701234560080", familia: "Lácteos" },
    { id: 9, nombre: "Queso Campesino 500g", precio: 11000, codigoBarras: "7701234560097", familia: "Lácteos" },
    { id: 10, nombre: "Mantequilla 250g", precio: 8500, codigoBarras: "7701234560103", familia: "Lácteos" },

    { id: 11, nombre: "Pan Tajado", precio: 6500, codigoBarras: "7701234560110", familia: "Panadería" },
    { id: 12, nombre: "Pan Hamburguesa", precio: 5500, codigoBarras: "7701234560127", familia: "Panadería" },
    { id: 13, nombre: "Pan Integral", precio: 7000, codigoBarras: "7701234560134", familia: "Panadería" },
    { id: 14, nombre: "Galletas Saltinas", precio: 4500, codigoBarras: "7701234560141", familia: "Panadería" },
    { id: 15, nombre: "Galletas Chocolate", precio: 5000, codigoBarras: "7701234560158", familia: "Panadería" },

    { id: 16, nombre: "Aceite Vegetal 1L", precio: 8500, codigoBarras: "7701234560165", familia: "Aceites" },
    { id: 17, nombre: "Aceite de Oliva 500ml", precio: 18000, codigoBarras: "7701234560172", familia: "Aceites" },
    { id: 18, nombre: "Azúcar 1kg", precio: 4000, codigoBarras: "7701234560189", familia: "Endulzantes" },
    { id: 19, nombre: "Panela 1kg", precio: 5500, codigoBarras: "7701234560196", familia: "Endulzantes" },
    { id: 20, nombre: "Miel 500g", precio: 12000, codigoBarras: "7701234560202", familia: "Endulzantes" },

    { id: 21, nombre: "Café 250g", precio: 7500, codigoBarras: "7701234560219", familia: "Bebidas" },
    { id: 22, nombre: "Chocolate de Mesa 250g", precio: 8500, codigoBarras: "7701234560226", familia: "Bebidas" },
    { id: 23, nombre: "Té Negro 20 Sobres", precio: 6500, codigoBarras: "7701234560233", familia: "Bebidas" },
    { id: 24, nombre: "Jugo de Mango 1L", precio: 5000, codigoBarras: "7701234560240", familia: "Bebidas" },
    { id: 25, nombre: "Agua Mineral 600ml", precio: 2500, codigoBarras: "7701234560257", familia: "Bebidas" },

    { id: 26, nombre: "Pasta Spaghetti 500g", precio: 3500, codigoBarras: "7701234560264", familia: "Pastas" },
    { id: 27, nombre: "Pasta Macarrones 500g", precio: 3600, codigoBarras: "7701234560271", familia: "Pastas" },
    { id: 28, nombre: "Pasta Tornillos 500g", precio: 3800, codigoBarras: "7701234560288", familia: "Pastas" },
    { id: 29, nombre: "Salsa de Tomate 400g", precio: 5500, codigoBarras: "7701234560295", familia: "Salsas" },
    { id: 30, nombre: "Mayonesa 400g", precio: 6500, codigoBarras: "7701234560301", familia: "Salsas" },

    { id: 31, nombre: "Atún en Agua 160g", precio: 6500, codigoBarras: "7701234560318", familia: "Enlatados" },
    { id: 32, nombre: "Atún en Aceite 160g", precio: 7000, codigoBarras: "7701234560325", familia: "Enlatados" },
    { id: 33, nombre: "Maíz Dulce 300g", precio: 5000, codigoBarras: "7701234560332", familia: "Enlatados" },
    { id: 34, nombre: "Arvejas 300g", precio: 4500, codigoBarras: "7701234560349", familia: "Enlatados" },
    { id: 35, nombre: "Sardinas 425g", precio: 6500, codigoBarras: "7701234560356", familia: "Enlatados" },

    { id: 36, nombre: "Jabón de Baño", precio: 3500, codigoBarras: "7701234560363", familia: "Aseo Personal" },
    { id: 37, nombre: "Shampoo 400ml", precio: 12000, codigoBarras: "7701234560370", familia: "Aseo Personal" },
    { id: 38, nombre: "Crema Dental 100ml", precio: 7500, codigoBarras: "7701234560387", familia: "Aseo Personal" },
    { id: 39, nombre: "Desodorante 150ml", precio: 9500, codigoBarras: "7701234560394", familia: "Aseo Personal" },
    { id: 40, nombre: "Papel Higiénico x4", precio: 8500, codigoBarras: "7701234560400", familia: "Aseo Personal" },

    { id: 41, nombre: "Jabón para Ropa 1kg", precio: 9000, codigoBarras: "7701234560417", familia: "Aseo Hogar" },
    { id: 42, nombre: "Suavizante 1L", precio: 8500, codigoBarras: "7701234560424", familia: "Aseo Hogar" },
    { id: 43, nombre: "Lavaloza 500ml", precio: 5500, codigoBarras: "7701234560431", familia: "Aseo Hogar" },
    { id: 44, nombre: "Limpiador Multiusos 1L", precio: 7000, codigoBarras: "7701234560448", familia: "Aseo Hogar" },
    { id: 45, nombre: "Cloro 1L", precio: 4500, codigoBarras: "7701234560455", familia: "Aseo Hogar" },

    { id: 46, nombre: "Huevos x12", precio: 12000, codigoBarras: "7701234560462", familia: "Huevos" },
    { id: 47, nombre: "Huevos x30", precio: 28000, codigoBarras: "7701234560479", familia: "Huevos" },
    { id: 48, nombre: "Sal 500g", precio: 2500, codigoBarras: "7701234560486", familia: "Condimentos" },
    { id: 49, nombre: "Pimienta 50g", precio: 3500, codigoBarras: "7701234560493", familia: "Condimentos" },
    { id: 50, nombre: "Comino 50g", precio: 3000, codigoBarras: "7701234560509", familia: "Condimentos" }
];

app.get("/", (req, res) => {
    res.json({
        mensaje: "Mi API está funcionando correctamente"
    });
});

app.get("/productos", (req, res) => {
    res.json(productos);
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});