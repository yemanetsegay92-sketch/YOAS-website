import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// ======================================
// YOAS Product Loading
// ======================================

let allProducts = [];

let productsLoaded = false;

let productsLoading = false;


// Load products from Firebase
async function getAllProducts() {

    // Already loaded
    if (productsLoaded) {
        return allProducts;
    }


    // Prevent two requests at the same time
    if (productsLoading) {
        return allProducts;
    }


    productsLoading = true;


    try {

        const startTime = performance.now();

const snapshot = await getDocs(
    collection(db, "products")
);

const endTime = performance.now();

console.log(
    "🔥 Firestore loading time:",
    Math.round(endTime - startTime),
    "ms"
);
let totalImageCharacters = 0;
let totalDocumentCharacters = 0;

snapshot.forEach(doc => {

    const data = doc.data();

    totalDocumentCharacters +=
        JSON.stringify(data).length;

    if (data.image) {

        totalImageCharacters +=
            data.image.length;

    }

});

console.log(
    "📦 Total product data:",
    Math.round(totalDocumentCharacters / 1024),
    "KB"
);

console.log(
    "🖼 Image data:",
    Math.round(totalImageCharacters / 1024),
    "KB"
);

console.log(
    "📦 Products:",
    snapshot.size
);

        allProducts = [];


        snapshot.forEach(doc => {

            allProducts.push({

                id: doc.id,

                ...doc.data()

            });

        });


        productsLoaded = true;


        console.log(
            "YOAS products loaded:",
            allProducts.length
        );


        return allProducts;


    } catch (error) {

        console.error(
            "Error loading products:",
            error
        );


        throw error;


    } finally {

        productsLoading = false;

    }

}



// ======================================
// Display Products
// ======================================

async function displayProducts() {

    const productContainer =
        document.getElementById("products");


    if (!productContainer) return;


    // Loading message
    productContainer.innerHTML = `

        <p class="products-loading">

            Loading products...<br>

            ምህርቲ ይጽዓኑ ኣለዉ...

        </p>

    `;


    try {

        const products =
            await getAllProducts();


        // No products in Firestore
        if (!products.length) {

            productContainer.innerHTML = `

                <p class="products-loading">

                    No products found.<br>

                    ምህርቲ ኣይተረኽበን።

                </p>

            `;

            return;

        }


        let productsHTML = "";


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


            productsHTML += `

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


        // Render once
        productContainer.innerHTML =
            productsHTML;


    } catch (error) {


        productContainer.innerHTML = `

            <div class="products-loading">

                <p>

                    Unable to load products.<br>

                    ምህርቲ ክጽዓኑ ኣይከኣሉን።

                </p>


                <button
                    onclick="retryProducts()"
                >

                    🔄 Retry / እንደገና ፈትን

                </button>

            </div>

        `;

    }

}



// ======================================
// Retry Product Loading
// ======================================

async function retryProducts() {

    allProducts = [];

    productsLoaded = false;

    productsLoading = false;


    await displayProducts();

}


window.retryProducts = retryProducts;



// ======================================
// Add Product To Cart
// ======================================

function addDynamicProduct(id) {


    const product =
        allProducts.find(
            p => String(p.id) === String(id)
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



// Make Add to Cart available
window.addDynamicProduct =
    addDynamicProduct;


// Start loading
displayProducts();