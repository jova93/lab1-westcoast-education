//WHERE TO GET THE PRODUCTS FROM
const jsonRequest = new Request("https://jova93.github.io/api/products.json");

//THE ARRAY WHERE WE WILL ADD THE CREATED OBJECTS
const products = [];

//THE CLASS USED TO BUILD THE OBJECTS
class Product {
  constructor(input) {
    this.productId = input.productId;
    this.productNumber = input.productNumber;
    this.productImage = input.productImage;
    this.productTitle = input.productTitle;
    this.productDescription = input.productDescription;
    this.productDurationHrs = input.productDurationHrs;
    this.productPrice = input.productPrice;
  }
}

//METHOD TO GENERATE HTML TO BUILD A PRODUCT BOX
function generateProductBoxHTML(product) {

  let innerHTML = `
    <div class="product-box">

      <!-- PRODUCT NUMBER -->
      <p>
          <span class="product-text-bold">PRODUCT NUMBER: </span><span class="product-number" id="productNumber">${product.productNumber}</span>
      </p>

      <!-- PRODUCT IMAGE -->
      <div class="product-image-container">
          <img src="${product.productImage}" alt="product image">
      </div>

      <!-- PRODUCT TITLE -->
      <p>
          <span class="product-text-bold">PRODUCT TITLE: </span><span class="product-title" id="productTitle">${product.productTitle}</span>
      </p>

      <!-- PRODUCT DESCRIPTION -->
      <p>
          <span class="product-text-bold">PRODUCT DESCRIPTION: </span><span class="product-description" id="productDescription">${product.productDescription}</span>
      </p>

      <!-- PRODUCT DURATION -->
      <p>
          <span class="product-text-bold">PRODUCT DURATION (hours): </span><span class="product-duration-hrs" id="productDurationHrs">${product.productDurationHrs}</span>
      </p>

      <!-- PRODUCT PRICE -->
      <p>
          <span class="product-text-bold">PRODUCT PRICE: </span><span class="product-price" id="productPrice">${product.productPrice}</span>
      </p>

      <!-- ADD TO CART BUTTON -->
      <button class="add-to-cart-btn" id="addToCartBtn">ADD TO CART</button>

    </div>
  `;

  return innerHTML;
}

//METHOD TO POPULATE A PRODUCT WRAPPER WITH PRODUCT BOXES
//TAKES THREE ARGUMENTS:
//  - THE ID OF THE PRODUCT WRAPPER WE WANT TO POPULATE
//  - THE PRODUCTS ARRAY
//  - THE NUMBER OF PRODUCT BOXES WANT TO POPULATE THE PRODUCT WRAPPER WITH
function populateProductWrapper(productWrapper, productsArray, numberOfProductBoxes) {

  let length = numberOfProductBoxes;

  //SO WE DONT'T GET AN INDEX OUT OF RANGE EXCEPTION!
  if (numberOfProductBoxes > productsArray.length){
    length = productsArray.length;
  }

  if (numberOfProductBoxes < 0){
    length = 0;
  }

  //GET EACH PRODUCT FROM THE PRODUCTS ARRAY
  for (let i = 0; i < length; i++) {
    const product = productsArray[i];

    //GENERATE THE HTML TO BUILD A PRODUCT BOX
    let innerHTML = generateProductBoxHTML(product);

    //ADD THE OUTPUT FROM ABOVE TO THE INNER HTML OF PRODUCTS
    document.getElementById(productWrapper).innerHTML += innerHTML;
  }
}

//GET THE PRODUCTS FROM THE JSON FILE AND ADD THEM TO THE PRODRUCTS ARRAY
fetch(jsonRequest)
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      const product = new Product(data[i]);

      //ADD TO THE PRODUCTS ARRAY
      products.push(product);
    }

    //POPULATE THE PRODUCT WRAPPER 1
    populateProductWrapper("productWrapper1", products, 3);

    //POPULATE THE PRODUCT WRAPPER 2
    populateProductWrapper("productWrapper2", products, products.length);
  })
  .catch(console.error);

