const API_URL =
    "https://dummyjson.com/products?limit=12";


const loading =
    document.getElementById("loading");


const error =
    document.getElementById("error");


const productsContainer =
    document.getElementById(
        "products-container"
    );


const productList =
    document.getElementById(
        "product-list"
    );


const productCount =
    document.getElementById(
        "product-count"
    );


const searchInput =
    document.getElementById(
        "search-input"
    );


const retryButton =
    document.getElementById(
        "retry-button"
    );


let products = [];


/* =========================
   OBTENER PRODUCTOS
========================= */

async function fetchProducts() {

    showLoading();


    try {

        const response =
            await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                "No se pudieron obtener los productos"
            );

        }


        const data =
            await response.json();


        products =
            data.products;


        renderProducts(products);


        showProducts();


    } catch (err) {

        console.error(err);

        showError();

    }

}


/* =========================
   MOSTRAR PRODUCTOS
========================= */

function renderProducts(
    productsToRender
) {

    productList.innerHTML = "";


    productCount.textContent =
        `${productsToRender.length} productos encontrados`;


    if (
        productsToRender.length === 0
    ) {

        productList.innerHTML = `
            <div class="state">
                <p>
                    No se encontraron productos.
                </p>
            </div>
        `;

        return;
    }


    productsToRender.forEach(
        product => {

            const card =
                document.createElement(
                    "article"
                );


            card.classList.add(
                "product-card"
            );


            let stockClass =
                "available";


            let stockText =
                "Disponible";


            if (
                product.stock === 0
            ) {

                stockClass =
                    "empty";

                stockText =
                    "Agotado";

            }

            else if (
                product.stock <= 10
            ) {

                stockClass =
                    "low";

                stockText =
                    "Stock bajo";

            }


            /*
                Conversión aproximada
                de USD a COP para
                representar el proyecto.
            */

            const priceCOP =
                Math.round(
                    product.price * 4000
                );


            const formattedPrice =
                new Intl.NumberFormat(
                    "es-CO"
                ).format(
                    priceCOP
                );


            card.innerHTML = `

                <img
                    src="${product.thumbnail}"
                    alt="${product.title}"
                >


                <h4>
                    ${product.title}
                </h4>


                <p class="category">
                    ${product.category}
                </p>


                <div class="product-info">

                    <span class="price">
                        $${formattedPrice} COP
                    </span>


                    <span
                        class="stock ${stockClass}"
                    >
                        ${stockText}
                    </span>

                </div>


                <div class="product-info">

                    <span>
                        Stock:
                        ${product.stock}
                    </span>

                </div>

            `;


            productList.appendChild(
                card
            );

        }
    );

}


/* =========================
   ESTADO DE CARGA
========================= */

function showLoading() {

    loading.classList.remove(
        "hidden"
    );


    error.classList.add(
        "hidden"
    );


    productsContainer.classList.add(
        "hidden"
    );

}


/* =========================
   ESTADO DE DATOS
========================= */

function showProducts() {

    loading.classList.add(
        "hidden"
    );


    error.classList.add(
        "hidden"
    );


    productsContainer.classList.remove(
        "hidden"
    );

}


/* =========================
   ESTADO DE ERROR
========================= */

function showError() {

    loading.classList.add(
        "hidden"
    );


    productsContainer.classList.add(
        "hidden"
    );


    error.classList.remove(
        "hidden"
    );

}


/* =========================
   BUSCADOR
========================= */

searchInput.addEventListener(
    "input",
    event => {

        const searchTerm =
            event.target.value
                .toLowerCase();


        const filteredProducts =
            products.filter(
                product =>
                    product.title
                        .toLowerCase()
                        .includes(
                            searchTerm
                        )
            );


        renderProducts(
            filteredProducts
        );

    }
);


/* =========================
   REINTENTAR
========================= */

retryButton.addEventListener(
    "click",
    () => {

        fetchProducts();

    }
);


/* =========================
   INICIO
========================= */

fetchProducts();