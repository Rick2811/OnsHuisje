// Kookboek – tabs + recepten + zoeken op TITEL (alleen) – vanilla JS
const STORAGE_KEY = "kookboek_tabs_v4";

const DEFAULT_TABS = [
  "Pastas","soepen","bakken","schotels","overig","italiaans","hollandse pot",
  "smoothies","cocktails","aziatisch","korte bereiding","mexiaans",
  "gezonde recepten","toetjes","streetfood",
];

let tabs = [];
let active = "";
let recipes = {"Pastas": [
    {
      title: "Spaghetti aglio e olio",
      prep: 5,
      cook: 10,
      ingredients: [
        "200g spaghetti",
        "3 tenen knoflook",
        "1/2 tl chilivlokken",
        "3 el olijfolie",
        "Zout, peper",
        "Peterselie"
      ],
      steps: "Kook de pasta. Fruit knoflook en chili in olie. Meng met pasta en serveer."
    }
  ]}; // { [tab]: [{ title, prep, cook, ingredients[], steps }] }

const $list = document.getElementById("tabList");
const $add = document.getElementById("addBtn");
const $search = document.getElementById("search");
const $title = document.getElementById("activeTitle");
const $name = document.getElementById("activeName");
const $addRecipeBtn = document.getElementById("addRecipeBtn");
const $recipeList = document.getElementById("recipeList");

const $dlg = document.getElementById("recipeDialog");
const $form = document.getElementById("recipeForm");
const $fTitle = document.getElementById("fTitle");
const $fPrep  = document.getElementById("fPrep");
const $fCook  = document.getElementById("fCook");
const $fIngr  = document.getElementById("fIngr");
const $fSteps = document.getElementById("fSteps");

// Init
(function init() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    tabs = Array.isArray(saved?.tabs) && saved.tabs.length ? saved.tabs : DEFAULT_TABS.slice();
    active = saved?.active && tabs.includes(saved.active) ? saved.active : tabs[0];
    recipes = saved?.recipes || {};
  } catch {
    tabs = DEFAULT_TABS.slice(); active = tabs[0]; recipes = {};
  }
  render();
})();

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ tabs, active, recipes }));
}

// ---------- RENDER ----------
function render() {
  const q = ($search?.value || "").trim().toLowerCase();
  $list.innerHTML = "";

  // Toon ALLE tabs (niet filteren)
  tabs.forEach(name => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.className = "tab-btn" + (name === active ? " active" : "");
    btn.type = "button";
    btn.onclick = () => setActive(name);

    const label = document.createElement("span");
    label.textContent = name; label.style.flex = "1";

    const actions = document.createElement("span");
    actions.className = "tab-actions";

    const rename = mkSmallBtn("✎", "Hernoem tab");
    rename.onclick = (e) => { e.stopPropagation(); renameTab(name); };

    const del = mkSmallBtn("×", "Verwijder tab");
    del.onclick = (e) => { e.stopPropagation(); removeTab(name); };

    actions.append(rename, del);
    btn.append(label, actions);
    li.appendChild(btn);
    $list.appendChild(li);
  });

  if (q) {
    $title.textContent = "Zoekresultaten";
    $name.textContent = "—";
    renderSearchResults(q);   // zoek ALLEEN in titel
  } else {
    $title.textContent = active || "Geen tab geselecteerd";
    $name.textContent = active || "—";
    renderRecipes();
  }
}

function renderRecipes() {
  if (!$recipeList || !active) return;
  $recipeList.innerHTML = "";

  const list = recipes[active] || [];
  if (list.length === 0) {
    const li = document.createElement("li");
    li.className = "muted"; li.textContent = "Nog geen recepten in deze categorie.";
    $recipeList.appendChild(li); return;
  }

  list.forEach((rec, idx) => $recipeList.appendChild(recipeCard(rec, () => {
    // verwijderen zonder confirm
    recipes[active].splice(idx, 1);
    save(); renderRecipes();
  })));
}

// Alleen op titel zoeken
function renderSearchResults(q) {
  $recipeList.innerHTML = "";
  const results = [];
  const needle = q.toLowerCase();

  tabs.forEach(tab => {
    (recipes[tab] || []).forEach((rec) => {
      const title = (rec.title || "").toLowerCase();
      if (title.includes(needle)) results.push({ tab, rec });
    });
  });

  if (results.length === 0) {
    const li = document.createElement("li");
    li.className = "muted"; li.textContent = "Geen recepten gevonden.";
    $recipeList.appendChild(li); return;
  }

  results.forEach(({ tab, rec }) => {
    const card = recipeCard(rec, null, tab); // tonen met tablabel
    card.style.cursor = "pointer";
    card.onclick = () => { setActive(tab); $search.value = ""; }; // naar tab springen
    $recipeList.appendChild(card);
  });
}

function recipeCard(rec, onDelete, tabLabel) {
  const li = document.createElement("li"); li.className = "card";

  const head = document.createElement("div"); head.className = "card-head";
  const left = document.createElement("div");
  left.className = "card-title";
  left.innerHTML = `<strong>${escapeHtml(rec.title)}</strong>
    <span class="chip" style="margin-left:.35rem">${(rec.prep||0)} min prep</span>
    <span class="chip" style="margin-left:.25rem">${(rec.cook||0)} min koken</span>
    ${tabLabel ? `<span class="chip" style="margin-left:.25rem">${escapeHtml(tabLabel)}</span>` : ""}`;

  const right = document.createElement("div");
  if (onDelete) {
    const del = mkSmallBtn("×", "Verwijder recept");
    del.onclick = (e) => { e.stopPropagation(); onDelete(); };
    right.appendChild(del);
  }
  head.append(left, right);

  const body = document.createElement("div");
  body.style.marginTop = ".5rem";
  const ingrs = (rec.ingredients || []).map(escapeHtml).join("<br>");
  body.innerHTML =
    `<div class="muted" style="margin:.25rem 0 .35rem;"><em>Ingrediënten</em></div>
     <div style="white-space:pre-line">${ingrs || "—"}</div>
     <div class="muted" style="margin:.75rem 0 .35rem;"><em>Uitleg</em></div>
     <div style="white-space:pre-line">${escapeHtml(rec.steps || "")}</div>`;

  li.append(head, body);
  return li;
}

// ---------- Mutaties ----------
function setActive(name) { active = name; save(); render(); }

function addTab() {
  const name = (prompt("Naam van de nieuwe categorie?") || "").trim();
  if (!name) return;
  if (tabs.some(t => t.toLowerCase() === name.toLowerCase())) { alert("Bestaat al."); return; }
  tabs.push(name); active = name; save(); render();
}

function removeTab(name) {
  tabs = tabs.filter(t => t !== name);
  delete recipes[name];
  if (active === name) active = tabs[0] || "";
  save(); render();
}

function renameTab(name) {
  const next = (prompt("Nieuwe naam voor deze categorie:", name) || "").trim();
  if (!next || next === name) return;
  if (tabs.some(t => t.toLowerCase() === next.toLowerCase())) { alert("Bestaat al."); return; }
  if (recipes[name]) { recipes[next] = recipes[name]; delete recipes[name]; }
  tabs = tabs.map(t => (t === name ? next : t));
  if (active === name) active = next;
  save(); render();
}

// ---------- Recepten ----------
$addRecipeBtn?.addEventListener("click", () => {
  if (!active) return;
  $fTitle.value = ""; $fPrep.value = ""; $fCook.value = "";
  $fIngr.value = ""; $fSteps.value = "";
  $dlg.showModal(); setTimeout(() => $fTitle.focus(), 0);
});

$form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const rec = {
    title: $fTitle.value.trim(),
    prep: Number($fPrep.value || 0),
    cook: Number($fCook.value || 0),
    ingredients: ($fIngr.value || "").split(/\r?\n/).map(s=>s.trim()).filter(Boolean),
    steps: $fSteps.value.trim(),
  };
  if (!rec.title) { $fTitle.focus(); return; }
  recipes[active] = recipes[active] || [];
  recipes[active].push(rec);
  save(); renderRecipes(); $dlg.close();
});

document.getElementById("cancelRecipe")?.addEventListener("click", () => $dlg.close());

// ---------- Helpers ----------
function mkSmallBtn(text, title) {
  const b = document.createElement("button");
  b.className = "btn"; b.style.height = "26px"; b.style.width = "26px"; b.style.padding = "0"; b.style.fontSize="16px";
  b.title = title; b.textContent = text; return b;
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,(m)=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[m]));}

// Events
$add?.addEventListener("click", addTab);
$search?.addEventListener("input", render);
