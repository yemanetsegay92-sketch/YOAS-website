import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// Load products from Firebase

async function getAllProducts(){

    let products = [];

    const snapshot = await getDocs(
        collection(db, "products")
    );

    snapshot.forEach(doc => {

        products.push({

            id: doc.id,

            ...doc.data()

        });

    });

    return products;

}





async function displayProducts() {

    const productContainer =
    document.getElementById("products");

    if (!productContainer) return;


    productContainer.innerHTML = "";


    let allProducts = await getAllProducts();



    allProducts.forEach(product => {


        let optionsHTML = "";


        product.options.forEach(option => {


            optionsHTML += `

            <option value="${option.price}">

            ${option.unit} - ${option.price} Birr

            </option>

            `;


        });



        productContainer.innerHTML += `

        <div class="product-card" data-category="${product.category}">


        <img src="${product.image}" 
        alt="${product.name}" 
        class="product-image">


        <h3>
        ${product.name} / ${product.tigrinya || ""}
        </h3>


        <p>
        ${product.brand}
        </p>



        <select id="product-${product.id}">

        ${optionsHTML}

        </select>



        <button onclick="addDynamicProduct('${product.id}')">

        Add to Cart / ወስኽ

        </button>


        </div>

        `;


    });


}







async function addDynamicProduct(id){

    let allProducts = await getAllProducts();


let product = allProducts.find(p => String(p.id) === String(id));


    if (!product) return;

    let select = document.getElementById("product-" + id);

    let option = select.options[select.selectedIndex];

console.log(window.addToCart);
    window.addToCart({

        name: product.name + " / " + (product.tigrinya || ""),

        brand: product.brand,

        unit: option.text,

        price: Number(option.value)

    });

}





displayProducts();

window.addDynamicProduct = addDynamicProduct;