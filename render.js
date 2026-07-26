function getAllProducts(){

    return JSON.parse(
        localStorage.getItem("yoasProducts")
    ) || [];

}



function displayProducts() {

    const productContainer =
    document.getElementById("products");

    if (!productContainer) return;

    productContainer.innerHTML = "";

    let allProducts = getAllProducts();

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

<img src="${product.image}" alt="${product.name}" class="product-image">

<h3>
${product.name} / ${product.tigrinya}
</h3>

<p>
${product.brand}
</p>

<select id="product-${product.id}">

${optionsHTML}

</select>

<button onclick="addDynamicProduct(${product.id})">

Add to Cart / ወስኽ

</button>

</div>

`;

    });

}



function addDynamicProduct(id) {

    let allProducts = getAllProducts();

    let product =
    allProducts.find(p => p.id === id);

    if (!product) return;

    let select =
    document.getElementById("product-" + id);

    let option =
    select.options[select.selectedIndex];

    addToCart({

        name: product.name + " / " + product.tigrinya,

        brand: product.brand,

        unit: option.text,

        price: Number(option.value)

    });

}



// Display products when page loads
displayProducts();