function createCard(obj) {
    return `
    <div class="card">
        <div class="cardImgContainer">
            <img src="${obj.image}" alt="" />
        </div>
        <div class="cardInfoContainer">
            <div class="ratingContainer">
                <span class="rating">${obj.rating} ⭐</span>
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
                <img
                    src="https://static1.hkrtcdn.com/hknext/static/media/common/cartNew.svg"
                    alt=""
                />
                <span>Add To Cart</span>
            </div>
        </div>
    </div>
    `;
}

let priceSlashBox = document.querySelector("#priceSlashBox");
let medicine = [
    {
        image: "https://img4.hkrtcdn.com/14798/prd_1479773-HealthKart-HK-Vitals-Healthy-Joints-60-tablets_c_t.jpg",
        name: "MuscleBlaze Whey Protein, 4.4 lb, Rich Milk Chocolate",
        price: 4535,
        discount: 18,
        rating: 4.4,
        reviews: 1034,
    },
    {
        image: "https://img6.hkrtcdn.com/11003/prd_1100235-MuscleBlaze-Gold-Gainer-XXL-2.2-lb-Chocolate-Bliss_c_t.jpg",
        name: "HealthKart Omega 3 1000mg with 180mg EPA and 120mg DHA, 60 softgels",
        price: "375",
        discount: 20,
        rating: 4.3,
        reviews: 1634,
    },
    {
        image: "https://img4.hkrtcdn.com/11965/prd_1196443-MuscleBlaze-High-Protein-Natural-Peanut-Butter-Unsweetened-0.750-kg-Crunchy_c_t.jpg",
        name: "MuscleTech NitroTech Performance Series, 4 lb, Milk Chocolate",
        price: 5635,
        discount: 10,
        rating: 4.6,
        reviews: 1234,
    },
    {
        image: "https://img10.hkrtcdn.com/15757/prd_1575689_c_t.jpg",
        name: "MuscleBlaze Natural Peanut Butter Unsweetened, 1 kg, Extra Crunchy",
        price: 403,
        discount: 26,
        rating: 4.5,
        reviews: 1831,
    },
];
medicine.forEach((element) => {
    element.discountedPrice =
        element.price - Math.floor(element.price / 100) * element.discount;
    element.premiumPrice =
        element.discountedPrice - Math.floor(element.discountedPrice / 100) * 5;
    element.name = element.name.substring(0, 60);
    priceSlashBox.innerHTML = priceSlashBox.innerHTML + createCard(element);
});

function addToCart(e) {
    e.children[1].innerText = "Added";
}
