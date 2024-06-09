import { getLocalStorage, renderListWithTemplate, qs } from "./utils.mjs";

export default function shoppingCart () {
  const
    el = qs(".cart-list"),
    cartItems = getLocalStorage("so-cart"),
    msg = `<h2>Your Cart is Empty</h2>`;

  // if the cart does not exist or it is empty
  // then show empty message and hide cart footer
  if (!cartItems || cartItems.length < 1) {
    el.innerHTML = msg;
    qs(".cart-footer").style.visibility = "hidden";
  } else {
    // otherwise, render the list, calc the total,
    // and display the total with the checkout button
    const cartTotal = calcListTotal(cartItems);
    renderListWithTemplate(cartItemTemplate, el, cartItems);
    qs(".cart-footer").style.visibility = "visible";
    qs(".cart-total").innerText += ` $${cartTotal}`
  }
}

function calcListTotal(list) {
  const
    amounts = list.map((item) => item.FinalPrice),
    quants = list.map((item) => item.Qty),
    total = (amounts.reduce(function(sum,item,i) {return sum + item * quants[i]}, 0)).toFixed(2);
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
    <p class="cart-card__quantity">Qty: ${item.Qty}</p>
    <p class="cart-card__price">$${(item.FinalPrice).toFixed(2)}</p>
  </li>`;
  return cartItem;
}
