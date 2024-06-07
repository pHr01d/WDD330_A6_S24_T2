import { getProductsByCategory } from "./externalServices.mjs";
import { renderListWithTemplate, qs } from "./utils.mjs";


//1.needs to read the alerts.json and if finds alert should create a <section>  with the class alert-list
//2.loop through list (json entries) and create <p> for each alert
//3.And apply background and foreground colors to the alert
//4.Then the <section> should be prepended to the <main> on the index


function alertsTemplate(alertList) {
  return `<p style="background-color:${alertList.background}; color:${alertList.color}">${alertList.message}</p>`
  }

  export default async function alertsList() {
    // get the element we will insert the list into from the selector
    const el = qs(".alerts-list");
    const alerts = await getProductsByCategory("alerts");
  
    // render out the product list to the element
    renderListWithTemplate(alertsTemplate, el, alerts);
  }

