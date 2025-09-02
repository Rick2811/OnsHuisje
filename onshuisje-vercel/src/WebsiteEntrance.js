// Eenvoudige tabs in vanilla JS – geen frameworks
const STORAGE_KEY = "kookboek_tabs_v1";

const DEFAULT_TABS = [
  "Pastas",
  "soepen",
  "bakken",
  "schotels",
  "overig",
  "italiaans",
  "hollandse pot",
  "smoothies",
  "cocktails",
  "aziatisch",
  "korte bereiding",
  "mexiaans",
  "gezonde recepten",
  "toetjes",
  "streetfood",
];

let tabs = [];
let active = "";

const $list = document.getElementById("tabList");
const $add = document.getElementById("addBtn");
const $search = document.getElementById("search");
const $title = document.getElementById("activeTitle");
const $name = document.getElementById("activeName");

// --- initial load
(function init() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    tabs = Array.isArray(saved?.tabs) && saved.tabs.length ? saved.tabs : DEFAULT_TABS.slice();
    active = saved?.active && tabs.includes(saved.active) ? saved.active : tabs[0];
  } catch (_) {
    tabs = DEFAULT_TABS.slice();
    active = tabs[0];
  }
  render();
})();

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ tabs, active }));
  } catch (_) {}
}

function render() {
  const q = ($search.value || "").trim().toLowerCase();
  $list.innerHTML = "";

  const visible = !q ? tabs : tabs.filter(t => t.toLowerCase().includes(q));

  visible.forEach(name => {
    const li = document.createElement("li");

    const btn = document.createElement("button");
    btn.className = "tab-btn" + (name === active ? " active" : "");
    btn.setAttribute("type", "button");
    btn.onclick = () => setActive(name);

    const label = document.createElement("span");
    label.textContent = name;
    label.style.flex = "1";
    label.style.overflow = "hidden";
    label.style.textOverflow = "ellipsis";
    label.style.whiteSpace = "nowrap";

    const actions = document.createElement("span");
    actions.className = "tab-actions";

    const del = document.createElement("button");
    del.className = "btn";
    del.style.height = "26px";
    del.style.width = "26px";
    del.style.fontSize = "16px";
    del.title = "Verwijder tab";
    del.setAttribute("aria-label", "Verwijder tab");
    del.textContent = "×";
    del.onclick = (e) => { e.stopPropagation(); removeTab(name); };

    const rename = document.createElement("button");
    rename.className = "btn";
    rename.style.height = "26px";
    rename.style.width = "26px";
    rename.style.fontSize = "14px";
    rename.title = "Hernoem tab";
    rename.setAttribute("aria-label", "Hernoem tab");
    rename.textContent = "✎";
    rename.onclick = (e) => { e.stopPropagation(); renameTab(name); };

    actions.append(rename, del);
    btn.append(label, actions);
    li.appendChild(btn);
    $list.appendChild(li);
  });

  if (visible.length === 0) {
    const li = document.createElement("li");
    li.className = "muted";
    li.style.padding = ".5rem .75rem";
    li.textContent = "Geen resultaten…";
    $list.appendChild(li);
  }

  $title.textContent = active || "Geen tab geselecteerd";
  $name.textContent = active || "—";
}

function setActive(name) {
  active = name;
  save();
  render();
}

function addTab() {
  const name = (window.prompt("Naam van de nieuwe tab?") || "").trim();
  if (!name) return;
  if (tabs.some(t => t.toLowerCase() === name.toLowerCase())) {
    window.alert("Deze tab bestaat al.");
    return;
  }
  tabs.push(name);
  active = name;
  save();
  render();
}

function removeTab(name) {
  if (!window.confirm(`Tab "${name}" verwijderen?`)) return;
  tabs = tabs.filter(t => t !== name);
  if (active === name) active = tabs[0] || "";
  save();
  render();
}

function renameTab(name) {
  const next = (window.prompt("Nieuwe naam voor deze tab:", name) || "").trim();
  if (!next || next === name) return;
  if (tabs.some(t => t.toLowerCase() === next.toLowerCase())) {
    window.alert("Deze tab bestaat al.");
    return;
  }
  tabs = tabs.map(t => (t === name ? next : t));
  if (active === name) active = next;
  save();
  render();
}

// events
$add.addEventListener("click", addTab);
$search.addEventListener("input", render);
