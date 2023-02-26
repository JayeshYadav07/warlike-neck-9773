const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = () => {
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
};
loginBtn.onclick = () => {
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
};
signupLink.onclick = () => {
    signupBtn.click();
    return false;
};
if (localStorage.getItem("token") != null) {
    let loginBtn = document.querySelector("#login_container > button");
    loginBtn.innerText = "Logout";
    loginBtn.setAttribute("onclick", "logoutUesr()");
}

function showLogin() {
    let wrapper = document.querySelector(".wrapper-container");
    wrapper.style.display = "flex";
}
function hideLogin() {
    let wrapper = document.querySelector(".wrapper-container");
    wrapper.style.display = "none";
}

function signupUser() {
    let obj = document.querySelectorAll(".signup input");
    const payload = {
        name: obj[0].value,
        email: obj[1].value,
        pass: obj[2].value,
    };
    fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
    })
        .then((res) => res.json())
        .then((res) => {
            alert(res.msg);
            hideLogin();
        })
        .catch((err) => alert("Something went wrong"));
}
function loginUser() {
    let obj = document.querySelectorAll(".login input");
    const payload = {
        email: obj[0].value,
        pass: obj[1].value,
    };
    fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
    })
        .then((res) => res.json())
        .then((res) => {
            localStorage.setItem("token", res.token);
            let loginBtn = document.querySelector("#login_container > button");
            loginBtn.innerText = "Logout";
            loginBtn.setAttribute("onclick", "logoutUesr()");
            obj[0].value = "";
            obj[1].value = "";
            alert(res.msg);
            showCartCount();
            hideLogin();
        })
        .catch((err) => alert("Wrong Credentials"));
}
function logoutUesr() {
    localStorage.removeItem("token");
    let loginBtn = document.querySelector("#login_container > button");
    loginBtn.innerText = "Login";
    loginBtn.setAttribute("onclick", "showLogin()");
    let cart_count = document.getElementById("cart_count");
    cart_count.innerText = 0;
    alert("User logged out...");
    window.location.reload();
}
async function addToCart(e) {
    let productID = e.getAttribute("data-id");
    await fetch(`http://localhost:8080/carts/find/${productID}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.length > 0) {
                alert("❌❌❌Product Already Added❌❌❌");
            } else {
                newCartProduct(productID);
            }
        })
        .catch((error) => alert("Login First!"));
}
async function newCartProduct(productId) {
    await fetch(`http://localhost:8080/products/getByid/${productId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
        },
    })
        .then((response) => response.json())
        .then((data) => {
            let productsDetails = {
                name: data.name,
                image: data.image,
                price: data.price,
                qty: 1,
                discount: data.discount,
                discountedPrice: data.discountedPrice,
                productID: data._id,
            };
            console.log(productsDetails);
            fetch("http://localhost:8080/carts/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify(productsDetails),
            })
                .then((response) => response.json())
                .then((res) => {
                    showCartCount();
                    alert("🎁🧧🎁Product Added successfully🎁🧧🎁");
                });
        })
        .catch((error) => alert("Login First!"));
}
function scrollFunction1() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
function showCartCount() {
    fetch("http://localhost:8080/carts", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
        },
    })
        .then((response) => response.json())
        .then((data) => {
            let cart_count = document.getElementById("cart_count");
            cart_count.innerText = data.length;
        });
}
showCartCount();
