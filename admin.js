function editProduct(id){

localStorage.setItem("editProductId",id);

window.location.href="admin-product-form.html";

}

function deleteProduct(id){

    if(!confirm("Are you sure you want to delete this product?")){
        return;
    }

    let savedProducts =
    JSON.parse(localStorage.getItem("yoasProducts")) || [];

    savedProducts = savedProducts.filter(product => product.id !== id);

    localStorage.setItem(
        "yoasProducts",
        JSON.stringify(savedProducts)
    );

    alert("Product deleted successfully.");

    location.reload();

}
function editProduct(id){

    localStorage.setItem("editingProductId", id);

    window.location.href = "admin-product-form.html";

}