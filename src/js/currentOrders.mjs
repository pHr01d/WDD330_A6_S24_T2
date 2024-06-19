import { getOrders } from "./externalServices.mjs";

export default async function currentOrders(selector, token) {
  try {
    const orders = await getOrders(token);
    const parent = document.querySelector(`${selector} tbody`);
    console.log(orders);
    parent.innerHTML = orders.map(orderTemplate).join("");
  } catch (err) {
    console.log(err);
  }
}

function orderTemplate(order) {
    // used chatGPT to resolve type error with the order.item.length
    const itemsCount = order.items ? order.items.length : 0;
  return `<tr><td>${order.id}</td>
  <td>${new Date(order.orderDate).toLocaleDateString("en-US")}</td>
  <td>${itemsCount}</td>
  <td>${order.orderTotal}</td></tr>`;
}