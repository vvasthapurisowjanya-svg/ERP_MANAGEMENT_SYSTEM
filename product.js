const PRODUCT_API = "http://localhost:8080/api/products";
let editProductId = null;
const loggedInUser =
JSON.parse(localStorage.getItem("loggedInUser"));
function saveProduct() {
    const product = {
        productName: document.getElementById("productName").value,
        category: document.getElementById("category").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        reorderLevel: document.getElementById("reorderLevel").value
    };
    let method = "POST";
    let url = PRODUCT_API;
    if (editProductId !== null) {
        method = "PUT";
        url = `${PRODUCT_API}/${editProductId}`;
    }
    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    })
    .then(() => {
        loadProducts();
        clearProductForm();
        editProductId = null;
        document.getElementById("productBtn").innerText = "Save Product";
    });
}
function loadProducts() {
    fetch(PRODUCT_API)
        .then(res => res.json())
        .then(products => {
            let table = document.getElementById("productTable");
            table.innerHTML = "";
            products.forEach(product => {
                table.innerHTML += `
                    <tr>
                        <td>${product.productId}</td>
                        <td>${product.productName}</td>
                        <td>${product.category}</td>
                        <td>${product.price}</td>
                        <td>${product.reorderLevel}</td>
                        <td>
                            ${
currentUser &&
currentUser.role.toUpperCase() === "ADMIN"
?
`
<button onclick="editProduct(${product.productId})">
Edit
</button>
<button onclick="deleteProduct(${product.productId})">
Delete
</button>`:`<span>View Only</span>`
}
                        </td>
                    </tr>`;
            });
        });
}
function editProduct(id) {
    fetch(PRODUCT_API)
        .then(res => res.json())
        .then(products => {
            const product = products.find(
                p => p.productId === id
            );
            document.getElementById("productName").value = product.productName;
            document.getElementById("category").value = product.category;
            document.getElementById("description").value = product.description;
            document.getElementById("price").value = product.price;
            document.getElementById("reorderLevel").value = product.reorderLevel;
            editProductId = id;
            document.getElementById("productBtn").innerText =
                "Update Product";
        });
}
function deleteProduct(id) {
    if (confirm("Delete Product ?")) {
        fetch(`${PRODUCT_API}/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            loadProducts();
        });
    }
}
if(
loggedInUser &&
loggedInUser.role !== "Admin"
){
document.getElementById(
"productForm"
).style.display="none";
}
function clearProductForm() {
    document.getElementById("productName").value = "";
    document.getElementById("category").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("reorderLevel").value = "";
}
loadProducts();
profile.js :
let profileUser =
JSON.parse(
    localStorage.getItem("loggedInUser")
);
if(profileUser){
    const profileName =
    document.getElementById(
        "profileName"
    );
    const profileRole =
    document.getElementById(
        "profileRole"
    );
    if(profileName){
        profileName.innerText =
        profileUser.username;
    }
    if(profileRole){
        profileRole.innerText =
        profileUser.role;
    }
}
function logout(){
    const confirmLogout =
    confirm(
        "Are you sure you want to log out from the ERP Management System?"
    );
    if(confirmLogout){
        localStorage.removeItem(
            "loggedInUser"
        );
        window.location.href =
        "../../modules/users/login.html";
    }
}
Role.js:
const currentUser =
JSON.parse(localStorage.getItem("currentUser"));
if(!currentUser){
    window.location.href =
    "../../modules/users/login.html";
}
Supplier.js :
const SUPPLIER_API =
    "http://localhost:8080/api/suppliers";
let editSupplierId = null;
const loggedInUser =
JSON.parse(localStorage.getItem("loggedInUser"));
function saveSupplier() {
    const supplier = {
        supplierName:
            document.getElementById(
                "supplierName"
            ).value,
        email:
            document.getElementById(
                "email"
            ).value,
        phone:
            document.getElementById(
                "phone"
            ).value,
        address:
            document.getElementById(
                "address"
            ).value
    };
    let method = "POST";
    let url = SUPPLIER_API;
    if(editSupplierId !== null){
        method = "PUT";
        url =
        `${SUPPLIER_API}/${editSupplierId}`;
    }
    fetch(url,{
        method:method,
        headers:{
            "Content-Type":
            "application/json"
        },
        body:JSON.stringify(supplier)
    })
    .then(() => {
        loadSuppliers();
        clearSupplierForm();
        editSupplierId = null;
        document
            .getElementById("supplierBtn")
            .innerText =
            "Save Supplier";
    });
}
function loadSuppliers(){
    fetch(SUPPLIER_API)
    .then(res => res.json())
    .then(data => {
        let table =
        document.getElementById(
            "supplierTable"
        );
        table.innerHTML = "";
        data.forEach(supplier => {
            table.innerHTML += `
                <tr>
                    <td>
                        ${supplier.supplierId}
                    </td>
                    <td>
                        ${supplier.supplierName}
                    </td>
                    <td>
                        ${supplier.email}
                    </td>
                    <td>
                        ${supplier.phone}
                    </td>
                    <td>
                        ${supplier.address}
                    </td>
                    <td>
                        ${
currentUser &&
currentUser.role.toUpperCase() === "ADMIN"
?
`
<button onclick="editSupplier(${supplier.supplierId})">
Edit
</button>
<button onclick="deleteSupplier(${supplier.supplierId})">
Delete
</button>
`
:
`<span>View Only</span>`
}
                    </td>
                </tr>
            `;
        });
    });
}
if(
loggedInUser &&
loggedInUser.role.toUpperCase() !== "ADMIN"
)
{
document.getElementById(
"supplierForm"
).style.display="none";
}
function editSupplier(id){
    fetch(SUPPLIER_API)
    .then(res => res.json())
    .then(suppliers => {
        const supplier =
        suppliers.find(
            s => s.supplierId === id
        );
        document
        .getElementById(
            "supplierName"
        ).value =
        supplier.supplierName;
        document
        .getElementById(
            "email"
        ).value =
        supplier.email;
        document
        .getElementById(
            "phone"
        ).value =
        supplier.phone;
        document
        .getElementById(
            "address"
        ).value =
        supplier.address;
        editSupplierId = id;
        document
        .getElementById(
            "supplierBtn"
        ).innerText =
        "Update Supplier";
    });
}
function deleteSupplier(id){
    if(confirm(
        "Delete Supplier?"
    )){
        fetch(
            `${SUPPLIER_API}/${id}`,
            {
                method:"DELETE"
            }
        )
        .then(() => {
            loadSuppliers();
        });
    }
}
function clearSupplierForm(){
    document
    .getElementById(
        "supplierName"
    ).value = "";
    document
    .getElementById(
        "email"
    ).value = "";
    document
    .getElementById(
        "phone"
    ).value = "";
    document
    .getElementById(
        "address"
    ).value = "";
}
loadSuppliers();
