
import { db } from "./firebase.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// ================================
// YOAS Smart Cart v2
// Part 1 - Cart System
// ================================


// Load cart from storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Update cart number
function updateCartCount() {

    const count = document.getElementById("cart-count");

    if (count) {

        count.textContent = cart.reduce(
            (sum, item) => sum + item.quantity,
            0
        );

    }

}



// Add product to cart
function addToCart(product) {


    const existing = cart.find(item =>

        item.name === product.name &&
        item.brand === product.brand &&
        item.unit === product.unit

    );


    if (existing) {


        existing.quantity += 1;


        existing.total =
        existing.quantity * existing.price;


    } else {


        cart.push({

            name: product.name,

            brand: product.brand,

            unit: product.unit,

            price: product.price,

            quantity: 1,

            total: product.price

        });


    }



    saveCart();


    alert(
        product.name + " added to cart"
    );


}



// Save cart
function saveCart() {


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();


}



// Increase quantity
function increaseQuantity(index) {


    cart[index].quantity += 1;


    cart[index].total =
    cart[index].quantity *
    cart[index].price;


    saveCart();


    displayCart();


}



// Decrease quantity
function decreaseQuantity(index) {


    if (cart[index].quantity > 1) {


        cart[index].quantity -= 1;


        cart[index].total =
        cart[index].quantity *
        cart[index].price;


    } else {


        cart.splice(index, 1);


    }


    saveCart();


    displayCart();


}



// Remove product
function removeItem(index) {


    cart.splice(index, 1);


    saveCart();


    displayCart();


}
// ================================
// Part 2 - Display, Checkout & Search
// ================================


// Display cart on checkout page
function displayCart() {


    const cartItems =
    document.getElementById("cart-items");


    const totalPrice =
    document.getElementById("total-price");



    if (!cartItems || !totalPrice) return;



    cartItems.innerHTML = "";



    let total = 0;



    if (cart.length === 0) {


        cartItems.innerHTML =
        "<p>ዓረብያኻ ባዶ እዩ (Your cart is empty)</p>";


        totalPrice.textContent = "0";


        return;


    }




    cart.forEach((item, index) => {

    total += item.total;

    cartItems.innerHTML += `

    <div class="cart-product">


        <h3>
        ${item.name}
        </h3>


        <p>
        ${item.brand || ""}
        •
        ${item.unit || ""}
        </p>


        <h4>
        ${item.total} ብር
        </h4>


        <p>
        ብዝሒ (Quantity)
        </p>


        <div class="cart-actions">


            <button 
            class="minus-btn"
            onclick="decreaseQuantity(${index})">
            −
            </button>


            <strong>
            ${item.quantity}
            </strong>


            <button 
            class="plus-btn"
            onclick="increaseQuantity(${index})">
            +
            </button>


            <button 
            class="remove-btn"
            onclick="removeItem(${index})">
            🗑 Remove
            </button>


        </div>


    </div>


   

    `;


});



    totalPrice.textContent = total;



}




// Place order
async function placeOrder() {

    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!name || !phone || !address) {
        alert("Please fill all delivery information");
        return;
    }

    if (cart.length === 0) {
        alert("Your cart is empty");
        return;
    }

    let total = cart.reduce((sum, item) => sum + item.total, 0);

    let order = {
    id: "YOAS-" + Date.now(),

    customer: {
        name: name,
        phone: phone,
        address: address
    },

    items: cart,

    total: total,

    status: "Pending",

    date: new Date().toLocaleString()
};


try {

    await addDoc(collection(db, "orders"), order);

    console.log("Order saved to Firebase");

} catch(error) {

    console.error("Firebase order error:", error);

    alert("Order could not be saved. Please try again.");
    return;

}

// Convert cart items into text
const itemsText = cart.map(item =>
    `${item.name} x${item.quantity} = ${item.total} Birr`
).join("\n");

// Send order to Telegram API
fetch("/api/send-telegram", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: name,
        phone: phone,
        address: address,
        items: itemsText,
        total: total
    })
})
.then(response => response.json())
.then(data => {
    console.log("Telegram notification sent", data);
    
   // Clear cart after successful order
    localStorage.removeItem("cart"); 
    
    window.location.href = "success.html";
})
.catch(error => {
    console.error("Telegram error:", error);
})
.finally(() => {

    localStorage.removeItem("cart");

    window.location.href = "success.html";

});
localStorage.removeItem("cart");
}


// Product filter
function filterProducts(category) {


    const products =
    document.querySelectorAll(".product-card");



    products.forEach(product => {



        if (
        category === "all" ||
        product.dataset.category === category
        ) {


            product.style.display =
            "block";


        } else {


            product.style.display =
            "none";


        }



    });



}






// Search products

const searchBox =
document.getElementById("search");



if (searchBox) {


    searchBox.addEventListener(
    "input",
    function(){


        const text =
        this.value.toLowerCase();



        document
        .querySelectorAll(".product-card")
        .forEach(product => {



            const name =
            product
            .querySelector("h3")
            .textContent
            .toLowerCase();



            product.style.display =
            name.includes(text)
            ? "block"
            : "none";



        });



    });


}






// Start app

updateCartCount();
displayCart();

window.addToCart = addToCart;
window.placeOrder = placeOrder;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.removeItem = removeItem;