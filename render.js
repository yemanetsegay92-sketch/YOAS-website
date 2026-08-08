import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    limit,
    startAfter,
    where
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// ======================================
// YOAS Progressive Product Loading
// ======================================

const PRODUCTS_PER_BATCH = 8;

let allProducts = [];

let lastDocument = null;

let productsLoading = false;

let allProductsLoaded = false;

let currentCategory = "all";


// ======================================
// Category names
// ======================================

const categoryMap = {

    all: null,

    food: "Food",

    baby: "Baby Products",

    cleaning: "Cleaning",

    cake: "Cake",

    wheatflour: "Wheat Flour",

    cosmetics: "Cosmetics",

    electronics: "Electronics",

    building: "Building"

};


// ======================================
// Get products from Firestore
// ======================================

async function loadProductBatch(reset = false) {

    if (productsLoading) return;

    if (allProductsLoaded && !reset) return;


    productsLoading = true;


    try {

        let productsQuery;


        const productsRef =
            collection(db, "products");


        // First batch
        if (reset || !lastDocument) {

            if (currentCategory === "all") {

                productsQuery = query(
                    productsRef,
                    limit(PRODUCTS_PER_BATCH)
                );

            } else {

                productsQuery = query(
                    productsRef,
                    where(
                        "category",
                        "==",
                        categoryMap[currentCategory]
                    ),
                    limit(PRODUCTS_PER_BATCH)
                );

            }

        }

        // Next batch
        else {

            if (currentCategory === "all") {

                productsQuery = query(
                    productsRef,
                    startAfter(lastDocument),
                    limit(PRODUCTS_PER_BATCH)
                );

            } else {

                productsQuery = query(
                    productsRef,
                    where(
                        "category",
                        "==",
                        categoryMap[currentCategory]
                    ),
                    startAfter(lastDocument),
                    limit(PRODUCTS_PER_BATCH)
                );

            }

        }


        const snapshot =
            await getDocs(productsQuery);


        // No more products
        if (snapshot.empty) {

            allProductsLoaded = true;

            showEndMessage();

            productsLoading = false;

            return;

        }


        // Remember last Firestore document
        lastDocument =
            snapshot.docs[
                snapshot.docs.length - 1
            ];


        let newProducts = [];


        snapshot.forEach(doc => {

            const product = {

                id: doc.id,

                ...doc.data()

            };


            newProducts.push(product);

            allProducts.push(product);

        });


        // Display new products
        renderProducts(newProducts);


        // If fewer than 8 arrived,
        // there are no more products
        if (
            snapshot.docs.length <
            PRODUCTS_PER_BATCH
        ) {

            allProductsLoaded = true;

            showEndMessage();

        }


        console.log(
            "YOAS loaded:",
            newProducts.length,
            "products"
        );


    } catch (error) {

        console.error(
            "YOAS product loading error:",
            error
        );


        showError();


    } finally {

        productsLoading = false;

    }

}



// ======================================
// Render products
// ======================================

function renderProducts(products) {

    const container =
        document.getElementById("products");


    if (!container) return;


    // Remove loading message
    const loading =
        container.querySelector(
            ".products-loading"
        );


    if (loading) {

        loading.remove();

    }


    let html = "";


    products.forEach(product => {

        let optionsHTML = "";


        (product.options || []).forEach(option => {

            optionsHTML += `

                <option value="${option.price}">

                    ${option.unit} -
                    ${option.price} Birr

                </option>

            `;

        });


        html += `

            <div
                class="product-card"
                data-category="${product.category || ""}"
            >

                <img
                    src="${product.image || ""}"
                    alt="${product.name || "Product"}"
                    class="product-image"
                    loading="lazy"
                >


                <h3>

                    ${product.name || ""}

                    /

                    ${product.tigrinya || ""}

                </h3>


                <p>

                    ${product.brand || ""}

                </p>


                <select
                    id="product-${product.id}"
                >

                    ${optionsHTML}

                </select>


                <button
                    onclick="addDynamicProduct('${product.id}')"
                >

                    Add to Cart / ወስኽ

                </button>


            </div>

        `;

    });


    // Add new products without removing
    // products already displayed

    container.insertAdjacentHTML(
        "beforeend",
        html
    );

}



// ======================================
// Start / Reset products
// ======================================

async function displayProducts() {

    const container =
        document.getElementById("products");


    if (!container) return;


    // Reset everything

    allProducts = [];

    lastDocument = null;

    allProductsLoaded = false;

    productsLoading = false;


    container.innerHTML = `

        <p class="products-loading">

            Loading products...<br>

            እቃታት ይጽዓኑ ኣለዉ...

        </p>

    `;


    await loadProductBatch(true);

}



// ======================================
// Category filter
// ======================================

async function filterProducts(category) {

    category =
        String(category)
        .toLowerCase()
        .trim();


    // Reset selected category

    currentCategory = category;


    // Reset product loading

    allProducts = [];

    lastDocument = null;

    allProductsLoaded = false;

    productsLoading = false;


    const container =
        document.getElementById("products");


    if (container) {

        container.innerHTML = `

            <p class="products-loading">

                Loading ${category === "all"
                    ? "products"
                    : category}...

                <br>

                እቃታት ይጽዓኑ ኣለዉ...

            </p>

        `;

    }


    await loadProductBatch(true);

}


window.filterProducts =
    filterProducts;



// ======================================
// Load more when near bottom
// ======================================

window.addEventListener(
    "scroll",
    function() {


        if (productsLoading) return;

        if (allProductsLoaded) return;


        const scrollPosition =
            window.innerHeight +
            window.scrollY;


        const pageHeight =
            document.documentElement
            .scrollHeight;


        // Start loading when
        // customer is about 600px
        // from the bottom

        if (
            scrollPosition >=
            pageHeight - 600
        ) {

            loadProductBatch(false);

        }

    }
);



// ======================================
// End message
// ======================================

function showEndMessage() {

    const container =
        document.getElementById("products");


    if (!container) return;


    const oldMessage =
        container.querySelector(
            ".products-end"
        );


    if (oldMessage) return;


    container.insertAdjacentHTML(
        "beforeend",

        `

        <p
            class="products-end"
            style="
                text-align:center;
                padding:25px;
                width:100%;
            "
        >

            All products loaded
            <br>

            ኩሎም እቃታት ተጻዒኖም

        </p>

        `

    );

}



// ======================================
// Error
// ======================================

function showError() {

    const container =
        document.getElementById("products");


    if (!container) return;


    container.innerHTML = `

        <div
            class="products-loading"
            style="text-align:center;"
        >

            <p>

                Unable to load products.

                <br>

                እቃታት ክጽዓኑ
                ኣይከኣሉን።

            </p>


            <button
                onclick="displayProducts()"
            >

                🔄 Retry / እንደገና ፈትን

            </button>

        </div>

    `;

}



// ======================================
// Add product to cart
// ======================================

function addDynamicProduct(id) {


    const product =
        allProducts.find(
            p =>
            String(p.id) ===
            String(id)
        );


    if (!product) {

        console.error(
            "Product not found:",
            id
        );

        return;

    }


    const select =
        document.getElementById(
            "product-" + id
        );


    if (!select) return;


    const option =
        select.options[
            select.selectedIndex
        ];


    if (!option) return;


    window.addToCart({

        name:
            product.name +
            " / " +
            (product.tigrinya || ""),

        brand:
            product.brand || "",

        unit:
            option.text,

        price:
            Number(option.value)

    });

}


window.addDynamicProduct =
    addDynamicProduct;



// ======================================
// Start
// ======================================

displayProducts();