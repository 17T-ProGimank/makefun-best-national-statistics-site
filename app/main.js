// NusaStat — hash router. No network, no cookies, no eval.
import {
  renderDashboard, renderEconomy, renderPeople, renderPrices, renderData,
  refreshExplorer, setExplorerState, getExplorerState, downloadExplorerCsv,
  sortProvinces
} from "./views.js";

const TITLES = {
  "": "NusaStat — Indonesia in Numbers",
  economy: "Economy — NusaStat",
  people: "People — NusaStat",
  prices: "Prices — NusaStat",
  data: "Data explorer — NusaStat"
};

function currentRoute() {
  const hash = window.location.hash.replace(/^#\/?/, "").split("?")[0];
  return TITLES[hash] === undefined ? "" : hash;
}

function render() {
  window.__shotReady = false;
  const route = currentRoute();
  const app = document.getElementById("app");
  if (route === "economy") app.innerHTML = renderEconomy();
  else if (route === "people") app.innerHTML = renderPeople();
  else if (route === "prices") app.innerHTML = renderPrices();
  else if (route === "data") app.innerHTML = renderData();
  else app.innerHTML = renderDashboard();
  document.title = TITLES[route];
  document.querySelectorAll(".site-nav a").forEach(function (a) {
    a.classList.toggle("active", a.dataset.route === route);
  });
  bindPage(route);
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

function bindPage(route) {
  if (route === "people") {
    const table = document.getElementById("prov-table");
    if (table) {
      table.querySelectorAll("th.sortable").forEach(function (th) {
        th.addEventListener("click", function () { sortProvinces(th.dataset.key); });
      });
    }
  }
  if (route === "data") {
    const search = document.getElementById("explorer-search");
    const group = document.getElementById("explorer-group");
    const csv = document.getElementById("explorer-csv");
    const table = document.getElementById("explorer-table");
    if (search) {
      search.addEventListener("input", function () {
        setExplorerState({ query: search.value });
        refreshExplorer();
      });
    }
    if (group) {
      group.addEventListener("change", function () {
        setExplorerState({ group: group.value });
        refreshExplorer();
      });
    }
    if (csv) csv.addEventListener("click", downloadExplorerCsv);
    if (table) {
      table.querySelectorAll("th.sortable").forEach(function (th) {
        th.addEventListener("click", function () {
          const key = th.dataset.key;
          const st = getExplorerState();
          const dir = st.sortKey === key ? -st.sortDir : 1;
          setExplorerState({ sortKey: key, sortDir: dir });
          refreshExplorer();
        });
      });
    }
  }
}

window.addEventListener("hashchange", render);
render();
