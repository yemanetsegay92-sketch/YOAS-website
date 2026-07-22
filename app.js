// Load cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count
function updateCartCount() {
    const count = document.getElementById("cart-count");
    if (count) {
        count.textContent = cart.length;
    }
}

// Add to cart
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(name + " added to cart!");
}

// Show cart on checkout page
function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    if (!cartItems || !totalPrice) return;

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        totalPrice.textContent = "0";
        return;
    }

    cart.forEach(item => {
        total += item.price;

        cartItems.innerHTML += `
            <p>${item.name} - ${item.price} Birr</p>
        `;
    });

    totalPrice.textContent = total;
}

// Filter products
function filterProducts(category) {
    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        if (category === "all" || product.dataset.category === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

// Place order
function placeOrder() {
    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!name || !phone || !address) {
        alert("Please fill all delivery information.");
        return;
    }

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    localStorage.removeItem("cart");

    alert("✅ Order received successfully!");

    window.location.href = "success.html";
}

// Run automatically
updateCartCount();
displayCart();
// Product search
const searchBox = document.getElementById("search");

if (searchBox) {
    searchBox.addEventListener("input", function () {

        const searchText = this.value.toLowerCase();

        const products = document.querySelectorAll(".product-card");

        products.forEach(product => {

            const productName = product.querySelector("h3").textContent.toLowerCase();

            if (productName.includes(searchText)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }

        });

    });
}