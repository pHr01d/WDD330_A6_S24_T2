import { findProductById } from "./externalServices.mjs";
import { getLocalStorage, setLocalStorage, qs, alertMessage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) { 
  product = await findProductById(productId);
  renderProductDetails();
  document.getElementById("addToCart").addEventListener("click", addToCart);
}

function addToCart() {
  //get cart contents from localStorage into a local variable
  let cartContents = getLocalStorage("so-cart");

  //if nothing is there, set it to an empty list
  if (!cartContents) {
     cartContents = [];
  }
  // get the array of items already in the cart
  const items = cartContents.map((item) => item.Id);
  // get the index number of the item in the cart
  // if it's not in the cart, the return will be -1
  let index = items.indexOf(product.Id);

  if (index < 0) {
    // if the item isn't in the cart, add it and
    // set the initial quantity to 1
    product.Qty = 1;
    cartContents.push(product);
  } else {
    // since it is in the cart, increment its quantity
    console.log(cartContents[index]);
    cartContents[index].Qty += 1;
  }
  // update local storage
  setLocalStorage("so-cart", cartContents);
  alertMessage(`${product.NameWithoutBrand} added to cart!`);
}

function renderProductDetails() {
  qs("#productName").innerText = product.Brand.Name;
  qs("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
  qs("#productImage").src = product.Images.PrimaryLarge;
  qs("#productImage").alt = product.Name;
  qs("#productSuggestedRetailPrice").innerText = "Suggested Retail: " + (product.SuggestedRetailPrice).toFixed(2);
  qs("#productFinalPrice").innerText = "Discount Price: " + (product.FinalPrice).toFixed(2);
  qs("#productColorName").innerText = product.Colors[0].ColorName;
  qs("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  qs("#addToCart").dataset.id = product.Id;
  qs("#prodTitle").innerText = "Sleep Outside | " + product.Id;
}
