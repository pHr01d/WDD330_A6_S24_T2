import { loadHeaderFooter } from "./utils.mjs";
import shoppingCart from "./shoppingCart.mjs";

export function modifyCart(productID, command) {
  console.log(productID, command);
}

loadHeaderFooter();
shoppingCart();

