// NusaStat — header search.
//
// Builds its index at runtime from data.js, so the search box never
// carries its own copy of the figures: every indicator, every province
// and every route is read from the same exports the pages render from.
// Typing filters the index; picking a result jumps to the matching
// page — an indicator opens the Data explorer already filtered to
// that indicator, a province opens the tile map with that province
// selected, a page name opens the route itself.
//
// Keyboard: ArrowDown / ArrowUp move through results, Enter opens the
// highlighted result (or the first one), Escape closes the list.
// Pressing "/" anywhere on the site focuses the search box.
import { INDICATORS, PROVINCES } from "./data.js";
import {
  setExplorerState,
  setMapSelection,
  renderMap,
  bindMap
} from "./views.js";

// The routes a search hit can open. Labels are the names the nav uses,
// so a result always reads the same as the page it opens.
const ROUTES = [
  { label: "Dashboard", detail: "Headline numbers, charts and latest releases", hash: "#/" },
  { label: "Economy", detail: "GDP, growth, sectors, trade and government finance", hash: "#/economy" },
  { label: "People", detail: "Population, age structure, employment and provinces", hash: "#/people" },
  { label: "Prices", detail: "CPI inflation, expenditure groups and food prices", hash: "#/prices" },
  { label: "Data", detail: "Search, filter and sort all indicators", hash: "#/data" },
  { label: "Map", detail: "Tile map of all 38 provinces", hash: "#/map" },
  { label: "Compare", detail: "Two provinces, side by side", hash: "#/compare" },
  { label: "Calculator", detail: "What a rupiah amount was worth in another year", hash: "#/calculator" }
];

// Recent queries, kept in memory for this visit only (never stored):
// the last few searches, offered back as one-tap chips when the box
// is focused and empty, so a repeated lookup costs one tap.
const recentQueries = [];

function rememberQuery(query) {
  const q = query.trim();
  if (q.length < 2) return;
  const at = recentQueries.indexOf(q);
  if (at !== -1) recentQueries.splice(at, 1);
  recentQueries.unshift(q);
  if (recentQueries.length > 5) recentQueries.length = 5;
}

// Small HTML escaper for labels rendered into the dropdown. Search
// results show names that come from the data file, but escaping keeps
// the dropdown safe even if a name ever carries punctuation.
function esc(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// One searchable entry: what kind of hit it is, the text shown, a
// second line of context, and the action that runs when it is picked.
function buildIndex() {
  const entries = [];

  (Array.isArray(INDICATORS) ? INDICATORS : []).forEach(function (row) {
    const name = row && row.name ? String(row.name) : "";
    if (!name) return;
    const context = (row.group || "") + " · " + (row.value || "") +
      " (" + (row.year || "") + ", " + (row.source || "") + ")";
    entries.push({
      kind: "Indicator",
      label: name,
      detail: context,
      run: function () {
        // Filter the Data explorer to this indicator, then open it.
        // setExplorerState refreshes the table if it is already shown.
        setExplorerState({ query: name, group: "All" });
        goTo("#/data");
      }
    });
  });

  (Array.isArray(PROVINCES) ? PROVINCES : []).forEach(function (row) {
    const name = row && row.name ? String(row.name) : "";
    if (!name) return;
    const context = "Province · " + Number(row.pop).toFixed(1) +
      " million people · " + Number(row.share).toFixed(1) + "% of Indonesia";
    entries.push({
      kind: "Province",
      label: name,
      detail: context,
      run: function () {
        goToMap(name);
      }
    });
  });

  ROUTES.forEach(function (route) {
    entries.push({
      kind: "Page",
      label: route.label,
      detail: route.detail,
      run: function () {
        goTo(route.hash);
      }
    });
  });

  return entries;
}

// Navigate to a hash, doing nothing extra when we are already there
// (the hashchange router only fires on a change).
function goTo(hash) {
  if (window.location.hash === hash) return;
  window.location.hash = hash;
}

// Open the tile map with one province pre-selected. The selection is
// set before navigating, so the map renders with that province's
// detail panel already open. When the map is already showing, the
// router will not re-fire, so re-render it directly instead.
function goToMap(provinceName) {
  setMapSelection(provinceName);
  if ((window.location.hash || "#/") === "#/map") {
    const app = document.getElementById("app");
    if (app) {
      app.innerHTML = renderMap();
      bindMap();
      window.scrollTo(0, 0);
    }
    return;
  }
  window.location.hash = "#/map";
}

// Rank a match: a label that starts with the query beats one that
// merely contains it, and a label match beats a detail-only match.
function scoreEntry(entry, query) {
  const label = entry.label.toLowerCase();
  const detail = entry.detail.toLowerCase();
  if (label.indexOf(query) === 0) return 0;
  if (label.indexOf(query) !== -1) return 1;
  if (detail.indexOf(query) !== -1) return 2;
  return -1;
}

function searchIndex(index, query) {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const scored = [];
  index.forEach(function (entry) {
    const score = scoreEntry(entry, q);
    if (score >= 0) scored.push({ entry: entry, score: score });
  });
  scored.sort(function (a, b) {
    if (a.score !== b.score) return a.score - b.score;
    return a.entry.label.localeCompare(b.entry.label);
  });
  return scored.slice(0, 8).map(function (item) { return item.entry; });
}

export function initHeaderSearch() {
  if (typeof document === "undefined") return;
  const input = document.getElementById("site-search");
  const box = document.getElementById("site-search-results");
  if (!input || !box) return;

  const index = buildIndex();
  let results = [];
  let active = -1;

  function close() {
    box.hidden = true;
    box.innerHTML = "";
    results = [];
    active = -1;
    input.setAttribute("aria-expanded", "false");
  }

  function renderList() {
    if (!results.length) {
      box.innerHTML = "<p class=\"search-empty\">No indicator, province or page matches “" +
        esc(input.value.trim()) + "”.</p>";
      box.hidden = false;
      input.setAttribute("aria-expanded", "true");
      return;
    }
    box.innerHTML = results.map(function (entry, i) {
      return "<button type=\"button\" role=\"option\" class=\"search-result" +
        (i === active ? " active" : "") + "\" data-idx=\"" + i + "\" aria-selected=\"" +
        (i === active ? "true" : "false") + "\">" +
        "<span class=\"search-kind\">" + esc(entry.kind) + "</span>" +
        "<span class=\"search-label\">" + esc(entry.label) + "</span>" +
        "<span class=\"search-detail\">" + esc(entry.detail) + "</span></button>";
    }).join("");
    box.hidden = false;
    input.setAttribute("aria-expanded", "true");
  }

  function pick(i) {
    const entry = results[i];
    if (!entry) return;
    rememberQuery(input.value);
    close();
    input.value = "";
    input.blur();
    entry.run();
  }

  // When the box is focused while empty, offer the recent queries
  // back as chips instead of an empty dropdown.
  function renderRecent() {
    if (input.value.trim().length > 0 || !recentQueries.length) return;
    box.innerHTML = "<p class=\"search-recent-title\">Recent searches</p>" +
      recentQueries.map(function (q) {
        return "<button type=\"button\" class=\"search-recent\" data-q=\"" +
          esc(q) + "\">" + esc(q) + "</button>";
      }).join("");
    box.hidden = false;
    input.setAttribute("aria-expanded", "true");
  }

  input.addEventListener("focus", renderRecent);

  input.addEventListener("input", function () {
    results = searchIndex(index, input.value);
    active = results.length ? 0 : -1;
    if (input.value.trim().length < 2) {
      close();
      return;
    }
    renderList();
  });

  input.addEventListener("keydown", function (event) {
    if (event.key === "ArrowDown" && results.length) {
      event.preventDefault();
      active = (active + 1) % results.length;
      renderList();
    } else if (event.key === "ArrowUp" && results.length) {
      event.preventDefault();
      active = (active - 1 + results.length) % results.length;
      renderList();
    } else if (event.key === "Enter") {
      if (results.length) {
        event.preventDefault();
        pick(active < 0 ? 0 : active);
      }
    } else if (event.key === "Escape") {
      close();
      input.blur();
    }
  });

  // Clicks land on the buttons inside the dropdown. The mousedown
  // handler fires before the input's blur closes the list, which is
  // why selection uses mousedown rather than click.
  box.addEventListener("mousedown", function (event) {
    const recent = event.target.closest(".search-recent");
    if (recent) {
      event.preventDefault();
      input.value = recent.getAttribute("data-q");
      results = searchIndex(index, input.value);
      active = results.length ? 0 : -1;
      renderList();
      input.focus();
      return;
    }
    const button = event.target.closest(".search-result");
    if (!button) return;
    event.preventDefault();
    pick(Number(button.getAttribute("data-idx")));
  });

  // Clicking anywhere else closes the list; the input keeps its text
  // so the query is not lost by an accidental click.
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".site-search")) close();
  });

  // "/" focuses the search box from anywhere, unless the user is
  // already typing in a field.
  document.addEventListener("keydown", function (event) {
    if (event.key !== "/") return;
    const tag = (event.target && event.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    event.preventDefault();
    input.focus();
  });
}
