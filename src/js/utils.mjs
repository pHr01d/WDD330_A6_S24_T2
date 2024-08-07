// wrapper for querySelector...returns matching element
// export function qs(selector, parent = document) {
//   return parent.querySelector(selector);
// }
// or a more concise version if you are into that sort of thing:
export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) { return JSON.parse(localStorage.getItem(key));}

// save data to local storage
export function setLocalStorage(key, data) { localStorage.setItem(key, JSON.stringify(data));}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// Returns parameters from URL
export function getParam(param) {
  const
    queryString = window.location.search,
    urlParams = new URLSearchParams(queryString),
    product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = true) {
  if (clear) {
    parentElement.innerHTML = " ";
  }
  const htmlStrings = list.map(templateFn); //map method breaking out the array
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export async function renderWithTemplate(templateFn, parentElement, data, callback, position = "afterbegin", clear = true) {
  if (clear) {
    parentElement.innerHTML = " ";
  }
  const htmlString = await templateFn(data);

  parentElement.insertAdjacentHTML(position, htmlString);
  if (callback) {
    callback(data);
  }
}

function loadTemplate(path) {
  // wait what?  we are returning a new function? 
  // this is called currying and can be very helpful.
  return async function () {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      return html;
    }
  };
} 

export function getCartCount() {
  const count = getLocalStorage("so-cart")?.length ?? 0;
  return count;
}

export async function loadHeaderFooter() {
  const
    headerTemplateFn = loadTemplate("/partials/header.html"),
    headerEl = qs("#main-header");
  renderWithTemplate(headerTemplateFn, headerEl);
  // Somewhere in this spot is where the cart count needs to be displayed
  // since the cart icon is part of the header
  // use the getCartCount function above

  const
    footerTemplateFn = loadTemplate("/partials/footer.html"),
    footerEl = qs("#main-footer");
  renderWithTemplate(footerTemplateFn, footerEl);
}

export function alertMessage(message, scroll = true, duration = 10000, wipeout = true) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = qs("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll)
    window.scrollTo(0, 0);
  // default to remove alert after duration. Can be overriden by passing false as fourth parameter
  if (wipeout) 
    setTimeout(function () { main.removeChild(alert); }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => qs("main").removeChild(alert));
}
