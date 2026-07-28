import { db } from "./firebase.js";
import {
    doc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

async function deleteProduct(id){

    if(!confirm("Are you sure you want to delete this product?")){
        return;
    }

    await deleteDoc(doc(db, "products", id));

    alert("Product deleted successfully.");

    location.reload();

}
function editProduct(id){

    localStorage.setItem("editingProductId", id);

    window.location.href = "admin-product-form.html";

}
window.deleteProduct = deleteProduct;
window.editProduct = editProduct;