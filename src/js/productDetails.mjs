import { findProductById } from "./productData.mjs";
import { getLocalStorage, setLocalStorage, qs } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) { product = await findProductById(productId);
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
  //add the currently selected product to the list
  cartContents.push(product);
  setLocalStorage("so-cart", cartContents);
}

function renderProductDetails() {
  qs("#productName").innerText = product.Brand.Name;
  qs("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
  qs("#productImage").src = product.Image;
  qs("#productImage").alt = product.Name;
  qs("#productFinalPrice").innerText = product.FinalPrice;
  qs("#productColorName").innerText = product.Colors[0].ColorName;
  qs("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  qs("#addToCart").dataset.id = product.Id;
}