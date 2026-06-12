const API_URL = "http://localhost:8080/api/users";
let editUserId = null;
function saveUser() {
    const user = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value
    };
    if (user.email === "") {
        alert("Email Required");
        return;
    }
    if (user.password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }
    let method = "POST";
    let url = "http://localhost:8080/api/users";
    if (editUserId !== null) {
        method = "PUT";
        url = `http://localhost:8080/api/users/${editUserId}`;
    }
    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(() => {
            loadUsers();
            document.getElementById("username").value = "";
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            document.getElementById("role").value = "";
            editUserId = null;
            document.getElementById("saveBtn").innerText = "Save User";
        });
}
function loadUsers() {
    fetch("http://localhost:8080/api/users")
        .then(response => response.json())
        .then(data => {
            let table = document.getElementById("userTable");
            table.innerHTML = "";
            data.forEach(user => {
                table.innerHTML += `
                    <tr>
                        <td>${user.userId}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>${user.role}</td>
                       <td>
    ${
        JSON.parse(localStorage.getItem("loggedInUser")) &&
        loggedInUser.role.toUpperCase() === "ADMIN"
        ?
        `
        <button class="edit-btn"
            onclick="editUser(${user.userId})">
            Edit
        </button>
        <button class="delete-btn"
            onclick="deleteUser(${user.userId})">
            Delete
        </button> `:`<span>View Only</span>`
    }
</td>
                    </tr>
                `;
            });
        });
}
function deleteUser(id) {
    if (confirm("Delete this user?")) {
        fetch(`http://localhost:8080/api/users/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                alert("User Deleted");
                loadUsers();
            });
    }
}
function editUser(id) {
    fetch("http://localhost:8080/api/users")
        .then(res => res.json())
        .then(users => {
            const user = users.find(u => u.userId === id);
            document.getElementById("username").value = user.username;
            document.getElementById("email").value = user.email;
            document.getElementById("password").value = user.password;
            document.getElementById("role").value = user.role;
            editUserId = id;
            document.getElementById("saveBtn").innerText = "Update User";
        });
}
if (document.getElementById("userTable")) {
    loadUsers();
}
auth.js :
const loggedInUser =
JSON.parse(
    localStorage.getItem("loggedInUser")
);
if(!loggedInUser){
    window.location.href =
    "../../modules/users/login.html";
}
dashboard.js :
const dashboardUser =
JSON.parse(localStorage.getItem("loggedInUser"));
if(!dashboardUser){
    window.location.href =
    "modules/users/login.html";
}
fetch("http://localhost:8080/api/users")
.then(res => res.json())
.then(data => {
    document.getElementById("userCount")
    .innerText = data.length;
});
fetch("http://localhost:8080/api/products")
.then(res => res.json())
.then(data => {
    document.getElementById("productCount")
    .innerText = data.length;
});
fetch("http://localhost:8080/api/suppliers")
.then(res => res.json())
.then(data => {
    document.getElementById("supplierCount")
    .innerText = data.length;
});
fetch("http://localhost:8080/api/inventory")
.then(res => res.json())
.then(data => {
    document.getElementById("inventoryCount")
    .innerText = data.length;
});
inventory.js :
const INVENTORY_API =
    "http://localhost:8080/api/inventory";
let editInventoryId = null;
const loggedInUser =
JSON.parse(localStorage.getItem("loggedInUser"));
function saveInventory() {
    const inventory = {
        productName:
            document.getElementById(
                "productName"
            ).value,
        quantity:
            document.getElementById(
                "quantity"
            ).value,
        warehouseLocation:
            document.getElementById(
                "warehouseLocation"
            ).value
    };
    let method = "POST";
    let url = INVENTORY_API;
    if(editInventoryId !== null){
        method = "PUT";
        url =
        `${INVENTORY_API}/${editInventoryId}`;
    }
    fetch(url,{
        method:method,
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(inventory)
    })
    .then(()=>{
        loadInventory();
        clearInventoryForm();
        editInventoryId = null;
        document.getElementById(
            "inventoryBtn"
        ).innerText =
        "Save Inventory";
    });
}
function loadInventory(){
    fetch(INVENTORY_API)
    .then(res => res.json())
    .then(data => {
        let table =
        document.getElementById(
            "inventoryTable"
        );
        table.innerHTML = "";
        data.forEach(inventory => {
            table.innerHTML += `
            <tr>
                <td>
                    ${inventory.inventoryId}
                </td>
                <td>
                    ${inventory.productName}
                </td>
                <td>
                    ${inventory.quantity}
                </td>
                <td>
                    ${inventory.warehouseLocation}
                </td>
                <td>
                    ${
currentUser &&
currentUser.role.toUpperCase() === "ADMIN"
?
`
<button onclick="editInventory(${inventory.inventoryId})">
Edit
</button>
<button onclick="deleteInventory(${inventory.inventoryId})">
Delete
</button>`:`<span>View Only</span>`
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
){
document.getElementById(
"inventoryForm"
).style.display="none";
}
function editInventory(id){
    fetch(INVENTORY_API)
    .then(res => res.json())
    .then(data => {
        const inventory =
            data.find(
                i => i.inventoryId === id
            );
        document.getElementById(
            "productName"
        ).value =
        inventory.productName;
        document.getElementById(
            "quantity"
        ).value =
        inventory.quantity;
        document.getElementById(
            "warehouseLocation"
        ).value =
        inventory.warehouseLocation;
        editInventoryId = id;
        document.getElementById(
            "inventoryBtn"
        ).innerText =
        "Update Inventory";
    });
}
function deleteInventory(id){
    if(confirm(
        "Delete Inventory Record?"
    )){
        fetch(
        `${INVENTORY_API}/${id}`,
        {
            method:"DELETE"
        })
        .then(() => {
            loadInventory();
        });
    }
}
function clearInventoryForm(){
    document.getElementById(
        "productName"
    ).value = "";
    document.getElementById(
        "quantity"
    ).value = "";
    document.getElementById(
        "warehouseLocation"
    ).value = "";
}
