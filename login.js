function login() {
    const email =
        document.getElementById("email").value;
    const password =
        document.getElementById("password").value;
    fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    .then(response => {
        if(!response.ok){
            throw new Error("Invalid Login");
        }
        return response.text();
    })
    .then(text => {
        if(!text){
            alert("Invalid Credentials");
            return;
        }
        const user = JSON.parse(text);
        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(user)
        );
        window.location.href =
            "../../dashboard.html";
    })
    .catch(error => {
        alert("Invalid Email or Password");
        console.log(error);
    });
}
