import { loadHeaderFooter, getParam } from "./utils.mjs";
import productList from "./productList.mjs";

loadHeaderFooter();
const category = getParam("category");
productList(".product-list", category);
