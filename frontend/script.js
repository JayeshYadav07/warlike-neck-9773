function createCard(obj) {
    return `
    <div class="card">
        <div class="cardImgContainer">
            <img src="${obj.image}" alt="" />
        </div>
        <div class="cardInfoContainer">
            <div class="ratingContainer">
                <span class="rating">${obj.rating} <img src="./images/rating.png" alt="" /></span>
                <span class="cardReviews">${obj.reviews} reviews</span>
            </div>
            <p class="title">${obj.name}</p>
            <div class="priceContainer">
                <span>₹${obj.discountedPrice}</span>
                <span>₹${obj.price}</span>
                <span>${obj.discount}% off</span>
            </div>
            <div class="premiumContainer">
                <img src="./images/star.png" width="18px" alt="" />
                    <span>₹${obj.premiumPrice}</span>
                <span>for Premium Member</span>
            </div>
            <div class="addToCartBtnContainer" data-id="${obj._id}" onClick="addToCart(this)">
                <span>Add To Cart</span>
            </div>
        </div>
    </div>
    `;
}

async function priceSlashShow() {
    let priceSlashBox = document.querySelector("#priceSlashBox");
    let arr = [];
    await fetch("http://localhost:8080/products/priceSlash", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => (arr = data));

    arr.forEach((element) => {
        element.name = element.name.substring(0, 60);
        priceSlashBox.innerHTML = priceSlashBox.innerHTML + createCard(element);
    });
}
priceSlashShow();
async function topDeals() {
    let top_deals = document.querySelector("#top_deals");
    let arr = [];
    await fetch("http://localhost:8080/products/pickDay", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => (arr = data));

    arr.forEach((element) => {
        element.name = element.name.substring(0, 60);
        top_deals.innerHTML = top_deals.innerHTML + createCard(element);
    });
}
topDeals();
async function pickDayshow() {
    let pick_of_the_day = document.querySelector("#pick_of_the_day");
    let arr = [];
    await fetch("http://localhost:8080/products/topDeals", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => (arr = data));

    arr.forEach((element) => {
        element.name = element.name.substring(0, 60);
        pick_of_the_day.innerHTML =
            pick_of_the_day.innerHTML + createCard(element);
    });
}
pickDayshow();
let slideIndex = 0;
showSlides();
function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 3000); // Change image every 2 seconds
}
