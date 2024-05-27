import { loadHeaderFooter } from "./utils.mjs";
import productList from "./productList.mjs";
import alertsList from "./alerts.mjs";

loadHeaderFooter();
alertsList();
productList(".product-list", "tents");

