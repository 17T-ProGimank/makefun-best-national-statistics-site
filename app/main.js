// NusaStat — hash router. Imports the view renderers from views.js and
// wires page-specific controls after each render.
//
// Note: the People table and the Data explorer bind their own controls
// from views.js (afterRender), so this router only binds the routes
// whose controls live nowhere else (compare, map). Binding them here
// as well would attach each handler twice and toggle every sort twice.
import {
  renderDashboard,
  renderEconomy,
  renderPeople,
  renderPrices,
  renderData,
  renderCompare,
  renderMap,
  bindCompare,
  bindMap
} from "./views.js";

const app = document.getElementById("app");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));

const TITLES = {
  "": "NusaStat — Dashboard | Indonesia in Numbers",
  economy: "Economy — NusaStat | Indonesia in Numbers",
  people: "People — NusaStat | Indonesia in Numbers",
  prices: "Prices — NusaStat | Indonesia in Numbers",
  data: "Data — NusaStat | Indonesia in Numbers",
  compare: "Compare Provinces — NusaStat | Indonesia in Numbers",
  map: "Province Map — NusaStat | Indonesia in Numbers"
};

const RENDERERS = {
  "": renderDashboard,
  economy: renderEconomy,
  people: renderPeople,
  prices: renderPrices,
  data: renderData,
  compare: renderCompare,
  map: renderMap
};

function parseRoute() {
  const hash = window.location.hash || "#/";
  const path = hash
    .replace(/^#\/?/, "")
    .split("?")[0]
    .split("#")[0]
    .trim()
    .toLowerCase();
  if (Object.prototype.hasOwnProperty.call(RENDERERS, path)) return path;
  return "";
}

function bindPage(route) {
  if (route === "compare") {
    bindCompare();
    return;
  }

  if (route === "map") {
    bindMap();
  }
}

function renderRoute() {
  window.__shotReady = false;
  const route = parseRoute();
  const render = RENDERERS[route];
  const html = render();
  if (typeof html === "string") {
    app.innerHTML = html;
  }
  document.title = TITLES[route];
  navLinks.forEach((a) => {
    const r = a.getAttribute("data-route") || "";
    a.classList.toggle("active", r === route);
  });
  bindPage(route);
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener("hashchange", renderRoute);

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderRoute);
} else {
  renderRoute();
}
