import { 
  getLocalStorage,
  setLocalStorage,
  renderListWithTemplate,
  alertMessage,
  qs
  } from "./utils.mjs";

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

// Adjusts quantity of items in the cart.
//  productId: product id from caller
//  action: new - add new item to cart
//          add - increase qty of item by one
//          sub - decrease qty of item by one
//          rmv - remove item from cart
export function adjustCart(product, command) {
  let 
    // get array of items in the cart (could be empty)
    cartContents = getLocalStorage("so-cart"),
    action = command,
    msg = "";

  // If cart doesn't exist, create it
  if (!cartContents) {
    cartContents = [];
  }
  // find index of item; will be -1 if it does not exist in cart
  const
    items = cartContents.map((item) => item.Id),
    index = items.indexOf(product.Id),
    itemExist = (index >= 0); // boolean showing if item exists

  if (action == "new") {
    // if item already exists then this is not a new item
    // change action to "add"
    if (itemExist) { action = "add";} 
    else {
      // otherwise, add item to cart
      product.Qty = 1;
      cartContents.push(product);
      msg = " added to cart."
    };
  };
  // increment item quantity if it exists
  if (action == "add" && itemExist) {
    cartContents[index].Qty += 1;
    msg = " quantity increased by 1."
  }
  // decrement item quantity if it exists
  if (action == "sub" && itemExist) {
    cartContents[index].Qty -= 1;
    msg = " quantity decreased by 1."
    // if the removal results in quantity zero, then remove item from cart
    if (cartContents[index].Qty < 1) {action = "rmv"};
  }
  // remove item from cart if it exists
  if (action == "rmv" && itemExist) {
    cartContents[index].remove();
    msg = " removed from cart."
  }
  // if something happened in the cart then
  //   update the cart
  //   add an alert
  //   animate the icon
  if (msg != "") {
    setLocalStorage("so-cart", cartContents);
    alertMessage(`${product.NameWithoutBrand}${msg}`);

    const cartIcon = document.getElementById("cartIcon");
    cartIcon.classList.add("icon-swell"),
      setTimeout(()=>{
        cartIcon.classList.remove("icon-swell"),
        cartIcon.classList.add("icon-normal"),
        setTimeout(()=>{
          cartIcon.classList.remove("icon-normal")
        },750)
      },750)
  }
shoppingCart();
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
    <div class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
        alt="${item.Name}"
      />
    </div>
    <div>
      <h2 class="card__name">${item.Name}</h2>
    </div>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">QTY: ${item.Qty}</p>
    <div class="cart-card__modify">
    <span data-id="add_${item.Id}">&#10133</span>&nbsp;&nbsp;&nbsp;
      <span data-id="sub_${item.Id}">&#10134</span>
    </div>
    <div class="cart-card__remove">
      <span data-id="rmv_${item.Id}">&#10060 REMOVE </span>
    </div>
    <p class="cart-card__price">$${(item.FinalPrice).toFixed(2)}</p>
  </li>`;
  return cartItem;
}

