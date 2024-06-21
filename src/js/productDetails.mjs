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

  discountPercent();
}


//got help from chatgpt help on calculations and add NaN preventative
//let flag = true;

export function discountPercent() {
  let finalPrice = parseFloat(product.FinalPrice);
  let suggestedRetailPrice = parseFloat(product.SuggestedRetailPrice);
 
  let discount = ((suggestedRetailPrice - finalPrice) / suggestedRetailPrice) * 100;
    
  //check if valid number and if is display percent text
    if (!isNaN(discount) && discount >= 0 && discount <= 100) {
      let discountText = `${discount.toFixed(2)}% Discount`;
      document.getElementById("myflag").innerHTML = `<span>${discountText}<//span>`;
    } else {
      document.getElementById("myflag").innerText = "";
    }
  }