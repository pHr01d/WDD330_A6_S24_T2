import { findProductById } from "./externalServices.mjs";
import { adjustCart } from "./shoppingCart.mjs";
import { qs } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) { 
  product = await findProductById(productId);
  renderProductDetails();
  document.getElementById("addToCart").addEventListener("click", addToCart);
}

function addToCart() {
  adjustCart(product, "new");
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
