import { getLocalStorage, qs } from "./utils.mjs";
import { checkout } from  "./externalServices.mjs";

// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};
  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

//takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: 1
    }; 
  });
  return simplifiedItems;
}

const checkoutProcess = {
  key: "",
  outputSelector: "",
  list: [],
  itemTotal: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0,
  init: function (key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(key);
    this.calculateItemSummary();
  },
  calculateItemSummary: function() {
    //calculate and display the total amount of the items in the cart, and the number of items.
    const summaryElement = qs(this.outputSelector + " #cartTotal");
    const itemNumElement = qs(this.outputSelector + " #num-items");
    itemNumElement.innerText = "Item Subtotal for " +
      this.list.length +
      " items:";
    // calculate the total of all the items in the cart
    const amounts = this.list.map((item) => item.FinalPrice);
    this.itemTotal = amounts.reduce((sum, item) => sum + item);
    summaryElement.innerText = "$" + this.itemTotal;
  },
  calculateOrdertotal: function() {
    //calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total.
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);
    this.displayOrderTotals();
  },
  displayOrderTotals: function() {
    // once the totals are all calculated display them in the order summary page
    const shipping = qs(this.outputSelector + " #shipping");
    const tax = qs(this.outputSelector + " #tax");
    const orderTotal = qs(this.outputSelector + " #orderTotal");
    shipping.innerText = "$" + (this.shipping).toFixed(2);
    tax.innerText = "$" + this.tax;
    orderTotal.innerText = "$" + this.orderTotal;
  },
  checkout: async function(form) {
    const json = formDataToJSON(form);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json);
    try {
      const res = await checkout(json);
     console.log(res);
    } catch (err) {
     console.log(err);
    }
  },
};
 

export default checkoutProcess;