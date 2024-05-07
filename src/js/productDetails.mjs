let product = {};

export default async function productDetails(productId) {

}

function addToCart(product) {
    setLocalStorage("so-cart", product);
  }
  // add to cart button event handler
  async function addToCartHandler(e) {
    const product = await findProductById(e.target.dataset.id);
    addToCart(product);
  }


 
// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

  renderProductDetails()