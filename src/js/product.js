import { loadHeaderFooter, getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { discountPercent } from "./productDetails.mjs";


loadHeaderFooter();
const productId = getParam("product");
productDetails(productId);

const finalPrice = getParam("FinalPrice");
const suggestedRetailPrice = getParam("SuggestedRetailPrice");

    discountPercent(finalPrice, suggestedRetailPrice);
