//SHOW OR CLOSE SHOPPING CART CONTAINER
const shoppingCartBtn = document.getElementById("shoppingCartBtn");

shoppingCartBtn.onclick = function () {
  const shoppingCartContainer = document.getElementById("shoppingCartContainer");

  console.log(window.innerWidth)

  let wW = window.innerWidth;

  console.log(wW);

  let cW;

  if (wW < 481) {
    cW = "100%";
  } else if (wW > 481 && wW < 769) {
    cW = "70%"
  } else {
    cW = "40%"
  }

  if (shoppingCartContainer.style.width === cW) {
    shoppingCartContainer.style.width = "0%";
  } else {
    shoppingCartContainer.style.width = cW;
  }
};

const closeCartBtn = document.getElementById("closeCartBtn");

closeCartBtn.onclick = function () {
  const shoppingCartContainer = document.getElementById("shoppingCartContainer");
  shoppingCartContainer.style.width = "0%";
};

//CART ITEMS ELEMENT WHERE CART ITEM BOXES WILL BE ADDED TO
const cartItems = document.querySelector(".cart-items");

//AN ARRAY WHERE WE WILL PUT THE CREATED ITEMS IN
const shoppingCart = [];

//ITEM ID, THIS IS THE ROW NUMBER
let itemId = 1;

//METHOD TO GENERATE CART ITEM BOX HTML
function generateCartItemBoxHTML(cartItem) {
  let innerHTML = `
    <div class="cart-item-box" id="${cartItem.itemRowNumber}">
        <!-- CART ITEM ROW NUMBER -->
        <p>${cartItem.itemRowNumber}</p>
        <!-- CART ITEM PODUCT NUMBER -->
        <p>${cartItem.itemProductNumber}</p>
        <!-- CART ITEM TITLE -->
        <p>${cartItem.itemProductTitle}</p>
        <!-- CART ITEM PRICE -->
        <p>${cartItem.itemProductPrice}</p>
        <!-- DELETE FROM CART BUTTON -->
        <button class="remove-from-cart-btn" id="removeFromCartBtn">REMOVE</button>
    </div>
    `;

  return innerHTML;
}

//METHOD TO POPULATE CART ITEMS ELEMENT
function populateCartItems(itemsArray) {
  for (let i = 0; i < itemsArray.length; i++) {
    const item = itemsArray[i];

    //GENERATE THE HTML TO BUILD A CART ITEM BOX
    let innerHTML = generateCartItemBoxHTML(item);

    //ADD THE OUTPUT FROM ABOVE TO THE INNER HTML OF CART ITEMS
    cartItems.innerHTML += innerHTML;
  }
}

//ADD TO CART
//1) CREATE A CART ITEM AND INCREMENT ITEM ID WITH 1
//2) ADD THE CART ITEM TO THE SHOPPING CART ARRAY
//3) RESET AND POPULATE THE CART ITEMS ELEMENT
//4) UPDATE TOTAL COST
function addItemtoCart(cartItem) {
  const item = {
    itemRowNumber: itemId,
    itemProductNumber: cartItem.querySelector("#productNumber").textContent,
    itemProductTitle: cartItem.querySelector("#productTitle").textContent,
    itemProductPrice: cartItem.querySelector("#productPrice").textContent,
  };

  console.log(itemId);

  //INCREMENT ITEM ID FOR THE NEXT PRODUCT THAT WILL BE ADDED
  itemId++;

  //ADD TO SHOPPPING CART
  shoppingCart.push(item);

  //RESET THE INNER HTML OF CART ITEMS
  cartItems.innerHTML = "";

  //POPULATE CART ITEMS
  populateCartItems(shoppingCart);

  //UPDATE TOTAL COST
  updateTotalCost();
}

//LISTEN WITH THE ADD TO CART BUTTON, IDENTIFY WHICH PRODUCT IS SELECTED AND ADD IT TO CART
document.addEventListener("click", function (e) {
  if (e.target && e.target.id == "addToCartBtn") {
    let parent = e.target.parentElement;
    console.log(parent);
    console.log(parent.querySelector("#productNumber").textContent);
    console.log(parent.querySelector("#productTitle").textContent);
    console.log(parent.querySelector("#productPrice").textContent);

    let cartItem = e.target.parentElement;

    //ADD PRODUCT TO CART
    addItemtoCart(cartItem);
  }
});

//METHOD TO UPDATE CART
//1) UPDATE ROW NUMBER OF EACH ELEMENT IN THE SHOPPING CART IF THERE ARE ANY
//2) RESET AND POPULATE CART ITEMS IF THERE ARE ANY ELEMENTS IN THE ARRAY
//3) UPDATE TOTAL COST
const updateCart = () => {
  //UPDATE ROW NUMBER
  if (shoppingCart.length > 0) {
    for (let i = 0; i < shoppingCart.length; i++) {
      shoppingCart[i].itemRowNumber = i + 1;
    }
  }

  //RESET THE INNER HTML OF CART ITEMS
  cartItems.innerHTML = "";

  //POPULATE CART ITEMS WITH DATA FROM THE SHOPPING CART
  //ONLY IF THERE ARE ANY ELEMENTS IN THE ARRAY
  if (shoppingCart.length > 0) {
    populateCartItems(shoppingCart);
  }

  updateTotalCost();
};

//CHECKOUT METHOD
const checkoutBtn = document.querySelector("#checkoutBtn");

//LISTEN IF THE CHECKOUT BUTTON IS CLICKED
checkoutBtn.addEventListener("click", function () {
  //SHOW CHECKOUT MODAL ONLY IF THERE ARE ANY ITEMS IN THE SHOPPING CART
  if (shoppingCart.length > 0) {
    document.getElementById("checkoutModal").style.display = "block";
  }

  //RESET INNER HTML OF CART ITEMS
  cartItems.innerHTML = "";

  //EMPTY THE SHOPPING CART
  shoppingCart.splice(0, shoppingCart.length);

  //RESET ITEM ID
  itemId = 1;

  //RESET TOTAL COST
  updateTotalCost();

  //HIDE SHOPPING CART CONTAINER
  var shoppingCartContainer = document.getElementById("shoppingCartContainer");
  shoppingCartContainer.style.width = "0%";
});

//DELETE ITEM FROM CART
document.addEventListener("click", function (e) {
  if (e.target && e.target.id == "removeFromCartBtn") {
    let cartItem = e.target.parentElement;

    let index = cartItem.id - 1;

    console.log(index);
    console.log(cartItem);

    cartItem.remove();

    shoppingCart.splice(index, 1);

    itemId--;

    //UPDATE CART METHOD
    updateCart();
  }
});

const totalResult = document.querySelector("#totalResult");

function updateTotalCost() {
  //RESET TOTAL COST
  let totalCost = 0;

  //ADD THE COST OF EACH ITEM IN THE SHOPPING CART
  for (let i = 0; i < shoppingCart.length; i++) {
    const cost = Number(shoppingCart[i].itemProductPrice);

    totalCost += cost;

    console.log(totalCost);
  }

  //RESET THE INNER HTML OF TOTAL RESULT
  totalResult.innerHTML = "";

  //INSERT THE NEW TOTAL COST
  totalResult.innerHTML = totalCost;
}

//CHECK OUT CONFIRMATION
//GET THE MODAL
var checkoutModal = document.getElementById("checkoutModal");

//GET THE BUTTON THAT CLOSES THE ADD PRODUCT MODAL
var closeCheckoutModalBtn = document.getElementById("closeCheckoutModalBtn");

//WHEN THE USER CLICKS ON CLOSE
closeCheckoutModalBtn.onclick = function () {
  checkoutModal.style.display = "none";
};

//WHEN THE USER CLICKS ANYWHERE OUTSIDE OF THE ADD PRODUCT MODAL CLOSE IT
//NEED TO WRITE A NEW FUNCTION HERE!
