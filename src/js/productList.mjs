import { getData } from "./productData.mjs";
import { renderListWithTemplate, qs } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
  <a href="/product-pages/index.html?product=${product.Id}">
  <img
    src="${product.Images.PrimaryMedium}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.NameWithoutBrand}</h2>
  <p class="product-card__price">$${product.FinalPrice}</p></a>
</li>`
}
//productList(".product-list", "tents");
export default async function productList(selector, category) {
  // get the element we will insert the list into from the selector
  const el = qs(selector);
  // get the list of products 
  let products = await getData(category);
  
  // render out the product list to the element
  renderListWithTemplate(productCardTemplate, el, products);
  const firstLetter = category.charAt(0);
  const title = firstLetter.toUpperCase() + category.substring(1)
  qs(".title").innerHTML = title;
}
