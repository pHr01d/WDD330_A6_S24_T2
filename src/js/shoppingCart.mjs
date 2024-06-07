import { getLocalStorage, renderListWithTemplate, qs } from "./utils.mjs";

export default function shoppingCart () {
  const cartItems = getLocalStorage("so-cart");
  const el = qs(".cart-list");
  renderListWithTemplate(cartItemTemplate, el, cartItems);
  const cartTotal = calcListTotal(cartItems);
  displayCartTotal(cartTotal);
}

function displayCartTotal(total) {
  if (total > 0) {
    // If the total is greater than zero then show the total
    qs(".cart-footer").classList.remove("hide");
    qs(".cart-total").innerText += ` $${total}`
  } else {
    // otherwise, hide the total
    qs(".cart-footer").classList.add("hide");
  }
}

function calcListTotal(list) {
  const amounts = list.map((item) => item.FinalPrice);
  const total = amounts.reduce((sum,item) => sum + item, 0);
  return total;
}

function cartItemTemplate(item) {
  const cartItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">Qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
  return cartItem;
}
