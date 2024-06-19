import { login } from "./auth.mjs";
import { getParam, loadHeaderFooter, qs } from "./utils.mjs";

loadHeaderFooter();
const redirect = getParam("redirect");

qs("#loginButton").addEventListener("click", (e) =>{
    const email = qs("#email").value;
    const password = qs("#password").value;
    login({ email, password}, redirect);
});