// NusaStat — hash router. Imports the view renderers from views.js and
// wires page-specific controls after each render.
import {
  renderDashboard,
  renderEconomy,
  renderPeople,
  renderPrices,
  renderData,
  renderCompare,
  refreshExplorer,
  setExplorerState,
  getExplorerState,
  downloadExplorerCsv,
  sortProvinces,
  bindCompare
} from "./views.js";

const app = document.getElementById("app");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));

const TITLES = {
  "": "NusaStat — Dashboard | Indonesia in Numbers",
  economy: "Economy — NusaStat | Indonesia in Numbers",
  people: "People — NusaStat | Indonesia in Numbers",
  prices: "Prices — NusaStat | Indonesia in Numbers",
  data: "Data — NusaStat | Indonesia in Numbers",
  compare: "Compare Provinces — NusaStat | Indonesia in Numbers"
};

const RENDERERS = {
  "": renderDashboard,
  economy: renderEconomy,
  people: renderPeople,
  prices: renderPrices,
  data: renderData,
  compare: renderCompare
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

function sortKeyOf(th) {
  return (
    th.dataset.key ||
    th.dataset.sortKey ||
    th.dataset.sort ||
    th.getAttribute("data-key") ||
    th.getAttribute("data-sort-key") ||
    ""
  );
}

function bindPage(route) {
  if (route === "people") {
    app.querySelectorAll("th.sortable").forEach((th) => {
      const activate = () => {
        const key = sortKeyOf(th);
        if (key) sortProvinces(key);
      };
      th.addEventListener("click", activate);
      th.setAttribute("tabindex", "0");
      th.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      });
    });
    return;
  }

  if (route === "data") {
    const search = document.getElementById("explorer-search");
    if (search) {
      search.addEventListener("input", (event) => {
        setExplorerState({ search: event.target.value });
        refreshExplorer();
      });
    }
    const group = document.getElementById("explorer-group");
    if (group) {
      group.addEventListener("change", (event) => {
        setExplorerState({ group: event.target.value });
        refreshExplorer();
      });
    }
    const csv = document.getElementById("explorer-csv");
    if (csv) {
      csv.addEventListener("click", () => downloadExplorerCsv());
    }
    app.querySelectorAll("th.sortable").forEach((th) => {
      const activate = () => {
        const key = sortKeyOf(th);
        if (!key) return;
        const state = getExplorerState() || {};
        const curKey = state.sortKey ?? state.key;
        const curDir = state.sortDir ?? state.dir ?? state.direction ?? "asc";
        const nextDir = curKey === key ? (curDir === "asc" ? "desc" : "asc") : "asc";
        setExplorerState({ sortKey: key, sortDir: nextDir, key, dir: nextDir });
        refreshExplorer();
      };
      th.addEventListener("click", activate);
      th.setAttribute("tabindex", "0");
      th.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      });
    });
    return;
  }

  if (route === "compare") {
    bindCompare();
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
