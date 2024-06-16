import { 
  getLocalStorage, 
  qs, 
  setLocalStorage, 
  alertMessage,
  removeAllAlerts,
  } from "./utils.mjs";
import { checkout } from  "./externalServices.mjs";

// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
  const
    formData = new FormData(formElement),
    convertedJSON = {};
  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

// takes the items currently stored in the cart (localstorage) and
// returns them in a simplified form.
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
    // display total number of items in cart
    const
      itemNumElement = qs(this.outputSelector + " #num-items"),
      quants = this.list.map((item) => item.Qty),
      numItems = quants.reduce((sum, item) => sum + item);
    itemNumElement.innerText = "Item Subtotal for " + numItems + " items:";

    // sum total of items in cart and display
    const
      summaryElement = qs(this.outputSelector + " #cartTotal"),
      amounts = this.list.map((item) => item.FinalPrice);
      this.itemTotal = (amounts.reduce(function(sum, item, i) {return sum + item * quants[i]}, 0)).toFixed(2);
    summaryElement.innerText = "$" + this.itemTotal;
  },

  calculateOrderTotal: function() {
    //calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total.
    const quants = this.list.map((item) => item.Qty);
    this.shipping = (10 + quants.reduce((sum, item) => sum + item) * 2).toFixed(2);
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
    const
      shipping = qs(this.outputSelector + " #shipping"),
      tax = qs(this.outputSelector + " #tax"),
      orderTotal = qs(this.outputSelector + " #orderTotal");

    shipping.innerText = "$" + this.shipping;
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
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html")
    } catch (err) {
     
     removeAllAlerts();
      for (let message in err.message) {
        alertMessage(err.message[message]);
      }
      console.log(err);
    }
  },
};

export default checkoutProcess;