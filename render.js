import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// Keep products in memory
// Firestore will only be read once per shop-page visit
let allProducts = [];


// Load products from Firebase once
async function getAllProducts() {

    if (allProducts.length > 0) {
        return allProducts;
    }

    const snapshot = await getDocs(
        collection(db, "products")
    );

    allProducts = [];

    snapshot.forEach(doc => {

        allProducts.push({

            id: doc.id,

            ...doc.data()

        });

    });

    return allProducts;
}


// Display all products
async function displayProducts() {

    const productContainer =
        document.getElementById("products");

    if (!productContainer) return;


    // Show loading message
    productContainer.innerHTML =
        '<p class="products-loading">Loading products... / እቃታት ይጽዓኑ ኣለዉ...</p>';


    try {

        const products = await getAllProducts();


        if (products.length === 0) {

            productContainer.innerHTML =
                '<p class="products-loading">No products found. / እቃ ኣይተረኽበን።</p>';

            return;

        }


        // Build the whole product list first
        // Then put it into the page only once
        let productsHTML = "";


        products.forEach(product => {

            let optionsHTML = "";


            (product.options || []).forEach(option => {

                optionsHTML += `

                    <option value="${option.price}">

                        ${option.unit} - ${option.price} Birr

                    </option>

                `;

            });


            productsHTML += `

                <div class="product-card"
                     data-category="${product.category || ""}">

                    <img
                        src="${product.image || ""}"
                        alt="${product.name || "Product"}"
                        class="product-image"
                        loading="lazy"
                    >

                    <h3>
                        ${product.name || ""} /
                        ${product.tigrinya || ""}
                    </h3>

                    <p>
                        ${product.brand || ""}
                    </p>

                    <select id="product-${product.id}">

                        ${optionsHTML}

                    </select>

                    <button
                        onclick="addDynamicProduct('${product.id}')">

                        Add to Cart / ወስኽ

                    </button>

                </div>

            `;

        });


        // Render everything at once
        productContainer.innerHTML = productsHTML;


    } catch (error) {

        console.error("Error loading products:", error);

        productContainer.innerHTML = `

            <p class="products-loading">

                Unable to load products.<br>

                እቃታት ክጽዓኑ ኣይከኣሉን።<br>

                Please check your internet connection and try again.

            </p>

        `;

    }

}


// Add product to cart
// IMPORTANT: This no longer downloads
// all products from Firestore again
function addDynamicProduct(id) {

    const product =
        allProducts.find(
            p => String(p.id) === String(id)
        );


    if (!product) {

        console.error("Product not found:", id);

        return;

    }


    const select =
        document.getElementById("product-" + id);


    if (!select) return;


    const option =
        select.options[select.selectedIndex];


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


// Make Add to Cart available to buttons
window.addDynamicProduct = addDynamicProduct;


// Start loading products
displayProducts();