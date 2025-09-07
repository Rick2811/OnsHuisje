// Kookboek – tabs + recepten + zoeken op TITEL (alleen) – vanilla JS
const STORAGE_KEY = "kookboek_tabs_v5";

const DEFAULT_TABS = [
  "Pastas","soepen","bakken","schotels","overig","italiaans","hollandse pot",
  "smoothies","cocktails","aziatisch","korte bereiding","mexiaans",
  "gezonde recepten","toetjes","streetfood","sauzen",
];

let tabs = [];
let active = "";

// ---- Hardcoded startdata (vul gerust aan) ----
let recipes = {
  "Pastas": [
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
  ],
  "soepen": [
    {
      title: "Pompoensoep",
      prep: 10,
      cook: 25,
      ingredients: [
        "600g pompoen",
        "1 ui",
        "1 teen knoflook",
        "800 ml bouillon"
      ],
      steps: "Fruit ui en knoflook. Voeg pompoen en bouillon toe. Kook zacht en pureer."
    }
  ],
  "italiaans": [
    {
      title: "Lasagne in pan",
      prep: 45,
      cook: 45,
      ingredients: [
        "1 ui",
        "1 knoflook teen",
        "400 gram gehakt",
        "1 pot tomaten basicilicum saus",
        "1 pak lasagne bladen",
        "1 pak becemel saus",
        "1 kippenbouillon",
        "Italiaanse kruiden",
        "Zout",
        "Peper",
        "Geraspte kaas",
        "1 potje tomaten puree"
      ],
      steps: "Stap 1 ui snipperen en in pan knoflook uit persen\nStap 2 gehakt bakken met de ui en kruiden toe ook peper en zout\nStap 3 voeg de kippenbouillon de tomaten saus en tomaten puree toe \nStap 4 breek de lasagne bladen in stukken en doe die er door heen \nStap 5 voeg de becemel saus toe en kaas en sluit de pan af"
    }
  ],
"sauzen": [
    {
      title: "Peper saus voor 3 personen",
      prep: 10,
      cook: 30,
      ingredients: [
        "5 Tenen knoflook",
        "peperkorrels",
        "scheutje witte wijn",
        "twee kookroom",
        "rundvlees bouillon",
        "bloem"
      ],
      steps: "stap 1 snij 1 teentje knoflook pers de overige 4\nstap 2 voeg vervolgens alle ingredienten samen \nstap 3 proef en roer goed ook de onderkant\nstap 4 voeg op gevoel nog extra ingredienten toe"
    }
  ],
  "soepen": [
    {
      title: "Goulash soep",
      prep: 30,
      cook: 10,
      ingredients: [
        "2 uien",
        "3 tenen knoflook",
        "1 rode paprika",
        "1 gele paprika",
        "1 runder bouillon blokje",
        "1 blik gepelde tomaten",
        "2 vastkokende aardappelen",
        "2 potten vlees bouillon",
        "1 blikje tomatenpuree 70 gram",
        "1 el paprikapoeder",
        "3 el bloem"
      ],
      steps: "Stap 1 snipper de uien hak de knoflook fijn en snijd de paprika,s in blokjes smelt de boter in een pan en bak daarin de uitjes knoflook en paprika 3 minuten.\nStap 2 voeg het vlees toe en bak dit mee voor 3 minuten voeg vervolgens het paprikapoeder, het bloem en de tomatenpuree toe en bak dit nog voor 1 minuut mee.\nStap 3 Voeg de gepelde tomaten, 1 liter water en het bouillonblokje toe\nStap 4 Schil de aardappelen en snijd ze in blokjes en voeg ze de laatste 15 minuten toe"
    }
  ],
  
}; // { [tab]: [{ title, prep, cook, ingredients[], steps }] }

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

    // Belangrijk: gebruik hardcoded recipes als fallback
    recipes = saved?.recipes || recipes;

  } catch {
    tabs = DEFAULT_TABS.slice();
    active = tabs[0];
    // laat de hardcoded `recipes` staan
  }

  // Zorg dat alle tab-namen uit recipes in tabs staan
  for (const t of Object.keys(recipes)) {
    if (!tabs.includes(t)) tabs.push(t);
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

function resetApp() {
  localStorage.removeItem("kookboek_tabs_v5"); // Verwijder de opgeslagen data
  // eslint-disable-next-line no-restricted-globals
  location.reload(); // Herlaad de pagina om opnieuw te initialiseren
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

  // >>>>>>>>>> NIEUW: toon de popup met exact jouw snippet
  const snippet = buildSnippet(active, rec);
  showSnippetPopup(snippet);
  // <<<<<<<<<< EINDE NIEUW

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

// === NIEUW: snippet builder en popup ===
function buildSnippet(category, rec) {
  const cat = JSON.stringify(category); // houdt de aanhalingstekens

  const ingLines = (rec.ingredients || [])
    .map(i => `        ${JSON.stringify(i)}`)
    .join(",\n");

  return `${cat}: [
    {
      title: ${JSON.stringify(rec.title || "")},
      prep: ${Number.isFinite(rec.prep) ? rec.prep : 0},
      cook: ${Number.isFinite(rec.cook) ? rec.cook : 0},
      ingredients: [
${ingLines}
      ],
      steps: ${JSON.stringify(rec.steps || "")}
    }
  ],`;
}

function showSnippetPopup(snippetText) {
  // overlay
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.background = "rgba(0,0,0,0.6)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "9999";

  // modal
  const modal = document.createElement("div");
  modal.style.background = "#121417";
  modal.style.color = "white";
  modal.style.padding = "16px";
  modal.style.borderRadius = "12px";
  modal.style.width = "min(800px, 95vw)";
  modal.style.maxHeight = "80vh";
  modal.style.overflow = "auto";
  modal.style.border = "1px solid rgba(255,255,255,0.15)";
  modal.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)";

  const head = document.createElement("div");
  head.style.display = "flex";
  head.style.justifyContent = "space-between";
  head.style.gap = "8px";

  const h3 = document.createElement("h3");
  h3.textContent = "Gegenereerde snippet";
  h3.style.margin = "0";
  h3.style.fontSize = "16px";

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Sluiten";
  closeBtn.style.border = "1px solid #444";
  closeBtn.style.background = "transparent";
  closeBtn.style.color = "white";
  closeBtn.style.padding = "4px 8px";
  closeBtn.style.borderRadius = "6px";
  closeBtn.onclick = () => document.body.removeChild(overlay);

  head.append(h3, closeBtn);

  const pre = document.createElement("pre");
  pre.textContent = snippetText;
  pre.style.whiteSpace = "pre-wrap";
  pre.style.background = "rgba(0,0,0,0.35)";
  pre.style.border = "1px solid rgba(255,255,255,0.1)";
  pre.style.padding = "12px";
  pre.style.borderRadius = "8px";
  pre.style.marginTop = "12px";
  pre.style.fontSize = "13px";

  const actions = document.createElement("div");
  actions.style.marginTop = "8px";
  actions.style.display = "flex";
  actions.style.gap = "8px";

  const copyBtn = document.createElement("button");
  copyBtn.textContent = "Kopieer";
  copyBtn.style.border = "1px solid #444";
  copyBtn.style.background = "transparent";
  copyBtn.style.color = "white";
  copyBtn.style.padding = "6px 10px";
  copyBtn.style.borderRadius = "6px";
  copyBtn.onclick = () => navigator.clipboard.writeText(snippetText);

  actions.append(copyBtn);

  modal.append(head, pre, actions);
  overlay.appendChild(modal);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) document.body.removeChild(overlay);
  });

  document.body.appendChild(overlay);
}
// === EINDE NIEUW ===

// Events
$add?.addEventListener("click", addTab);
$search?.addEventListener("input", render);
