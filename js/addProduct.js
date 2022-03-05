//ADMIN MODE
const activateAdmninBtn = document.querySelector("#activateAdmninBtn");

function activateAdminMode() {
  //SHOW OR HIDE OPEN ADD PRODUCT MODAL BUTTON
  var openAddProdModalBtn = document.getElementById("openAddProductModalBtn");

  if (openAddProdModalBtn.style.display === "block") {
    openAddProdModalBtn.style.display = "none";
    activateAdmninBtn.innerHTML = "ACTIVATE ADMIN MODE";
  } else {
    openAddProdModalBtn.style.display = "block";
    activateAdmninBtn.innerHTML = "DEACTIVATE ADMIN MODE";
  }

  //SHOW OR HIDE DELETE PRODUCT BUTTONS
  if (newProducts.length > 0) {
    var deleteProdBtn = document.getElementById("deleteProductBtn");
    if (deleteProdBtn.style.display === "none") {
      deleteProdBtn.style.display = "block";
    } else {
      deleteProdBtn.style.display = "none";
    }
  }
}

activateAdmninBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target && e.target.id == "activateAdmninBtn") {
    activateAdminMode();
  }
});

//GET THE ADD PRODUCT MODAL
let addProductModal = document.getElementById("addProductModal");

//GET THE BUTTON THAT OPENS THE ADD PRODUCT MODAL
var openAddProductModalBtn = document.getElementById("openAddProductModalBtn");

//GET THE <span> ELEMENT THAT CLOSES THE ADD PRODUCT MODAL
var closeAddProductModalSpan = document.getElementsByClassName(
  "close-add-product-modal"
)[0];

//WHEN THE USER CLICKS ON THE BUTTON, OPEN THE ADD PRODUCT MODAL
openAddProductModalBtn.onclick = function () {
  addProductModal.style.display = "block";
};

//WHEN THE USER CLICKS ON <span> (x), CLOSE THE ADD PRODUCT MODAL
closeAddProductModalSpan.onclick = function () {
  addProductModal.style.display = "none";
};

//WHEN THE USER CLICKS ANYWHERE OUTSIDE OF THE ADD PRODUCT MODAL CLOSE IT
//NEED TO WRITE A NEW FUNCTION HERE!

// --- GET DATA FROM INPUT ---

//INPUTS
const productNumberInput = document.querySelector("#productNumberInput");
const productTitleInput = document.querySelector("#productTitleInput");
const productDescriptionInput = document.querySelector(
  "#productDescriptionInput"
);
const productDurationHrsInput = document.querySelector(
  "#productDurationHrsInput"
);
const productPriceInput = document.querySelector("#productPriceInput");

//GENERIC IMAGE PATH
const imagePath = "images/generic-image-course.jpg";

//GET THE PRODUCT WRAPPER YOU WANT TO ADD PRODUCTS TO
const productWrapper2 = document.querySelector(".product-wrapper-2");

//CREATE AN ARRAY TO ADD NEW PRODUCTS TO
const newProducts = [];

//NEW PRODUCT ID
let newProductId = 1;

//METHOD TO GENERATE HTML TO BUILD A PRODUCT BOX W/ AN ADDITIONAL BUTTON CALLED DELETE PRODUCT BUTTON
function generateNewProductBoxHTML(newProduct) {
  let id = newProduct.productId;

  let innerHTML = `
      <div class="product-box" id="${id}">
  
        <!-- PRODUCT NUMBER -->
        <p>
            <span class="product-text-bold">PRODUCT NUMBER: </span><span class="product-number" id="productNumber">${newProduct.productNumber}</span>
        </p>
  
        <!-- PRODUCT IMAGE -->
        <div class="product-image-container">
            <img src="${newProduct.productImage}" alt="product image">
        </div>
  
        <!-- PRODUCT TITLE -->
        <p>
            <span class="product-text-bold">PRODUCT TITLE: </span><span class="product-title" id="productTitle">${newProduct.productTitle}</span>
        </p>
  
        <!-- PRODUCT DESCRIPTION -->
        <p>
            <span class="product-text-bold">PRODUCT DESCRIPTION: </span><span class="product-description" id="productDescription">${newProduct.productDescription}</span>
        </p>
  
        <!-- PRODUCT DURATION -->
        <p>
            <span class="product-text-bold">PRODUCT DURATION (hours): </span><span class="product-duration-hrs" id="productDurationHrs">${newProduct.productDurationHrs}</span>
        </p>
  
        <!-- PRODUCT PRICE -->
        <p>
            <span class="product-text-bold">PRODUCT PRICE: </span><span class="product-price" id="productPrice">${newProduct.productPrice}</span>
        </p>
  
        <!-- ADD TO CART BUTTON -->
        <button class="add-to-cart-btn" id="addToCartBtn">ADD TO CART</button>

        <!-- DELETE PRODUCT BUTTON -->
        <button class="delete-product-btn" id="deleteProductBtn">DELETE PRODUCT</button>
  
      </div>
    `;

  return innerHTML;
}

//METHOD TO POPULATE A PRODUCT WRAPPER WITH PRODUCT BOXES W/ DELETE PRODUCT BUTTON
//TAKES TWO ARGUMENTS:
//  - THE ID OF THE PRODUCT WRAPPER WE WANT TO POPULATE
//  - THE PRODUCTS ARRAY
function populateProductWrapperNewProducts(productWrapper, newProductsArray) {
  //GET EACH PRODUCT FROM THE PRODUCTS ARRAY
  for (let i = 0; i < newProductsArray.length; i++) {
    const newProduct = newProductsArray[i];

    //GENERATE THE HTML TO BUILD A PRODUCT BOX
    let innerHTML = generateNewProductBoxHTML(newProduct);

    //ADD THE OUTPUT FROM ABOVE TO THE INNER HTML OF PRODUCTS
    document.getElementById(productWrapper).innerHTML += innerHTML;
  }
}

//ADD PRODUCTS TO THE NEW PRODUCTS ARRAY AND POPULATE PRODUCT WRAPPER 2
const addProductToProductWrapper2 = () => {
  const newProduct = {
    productId: newProductId,
    productNumber: productNumberInput.value,
    productImage: imagePath,
    productTitle: productTitleInput.value,
    productDescription: productDescriptionInput.value,
    productDurationHrs: productDurationHrsInput.value,
    productPrice: Number(productPriceInput.value),
  };

  //INCREMENT NEW PRODUCT ID FOR THE NEXT PRODUCT THAT WILL BE CREATED
  newProductId++;

  //ADD NEW PRODUCT TO THE NEW PRODUCTS ARRAY
  newProducts.push(newProduct);

  //RESET THE INNER HTML OF PRODUCT WRAPPER 2
  document.getElementById("productWrapper2").innerHTML = "";

  //POPULATE THE PRODUCT WRAPPER 2 WITH DATA FROM THE PRODUCTS ARRAY
  populateProductWrapper("productWrapper2", products, products.length);

  //POPULATE THE PRODUCT WRAPPER 2 WITH DATA FROM THE NEW PRODUCTS ARRAY
  populateProductWrapperNewProducts("productWrapper2", newProducts);
};

//ADD AN EVENT LISTENER TO SUBMIT PRODUCT BUTTON
//RESET THE FORM WHEN A PRODUCT IS SUBMITTED
const submitProductBtn = document.querySelector("#submitProductBtn");

submitProductBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //POPULATE PRODUCT WRAPPER 2 WITH OLD AND NEW PRODUCT(S)
  addProductToProductWrapper2();

  //RESET FORM
  document.getElementById("addProductForm").reset();
});

//UPDATE PRODUCT WRAPPER 2
const updateProductWrapper2 = () => {
  if (newProducts.length > 0) {
    //UPDATE THE PRODUCT ID OF EACH ELEMENT IN THE NEW PRODUCTS ARRAY
    //SO IT CAN BE DELETED FROM THE ARRAY BASED ON THE INDEX IT HAS
    //INDEX IS EQUAL TO PRODUCTID MINUS 1
    for (let i = 0; i < newProducts.length; i++) {
      newProducts[i].productId = i + 1;
    }
  }

  //RESET THE INNER HTML OF PRODUCT WRAPPER 2
  document.getElementById("productWrapper2").innerHTML = "";

  //POPULATE THE PRODUCT WRAPPER 2 WITH DATA FROM THE PRODUCTS ARRAY
  populateProductWrapper("productWrapper2", products, products.length);

  //POPULATE THE PRODUCT WRAPPER 2 WITH DATA FROM THE NEW PRODUCTS ARRAY
  //ONLY IF THERE ARE ANY ELEMENTS IN THE ARRAY
  if (newProducts.length > 0) {
    populateProductWrapperNewProducts("productWrapper2", newProducts);
  }
};

//WHEN A DELETE BUTTON IS CLICKED IT SHOULD DELETE THE PRODUCT FROM THE NEW PRODUCTS ARRAY
//AND GENERATE INNER HTML AGAIN IN ORDER TO REMOVE THE PRODUCT FROM THE PAGE
document.addEventListener("click", function (e) {
  if (e.target && e.target.id == "deleteProductBtn") {
    //PARENTELEMENTID MINUS 1 IS EQUAL TO THE INDEX OF THE PRODUCT IN THE NEW PRODUCTS ARRAY
    let index = e.target.parentElement.id - 1;

    //REMOVE THE PRODUCT FROM THE ARRAY
    newProducts.splice(index, 1);

    //THIS WILL RESET TO THE INITIAL STATE WHEN THE NEW PRODUCTS ARRAY IS EMPTY
    newProductId--;

    updateProductWrapper2();
  }
});
