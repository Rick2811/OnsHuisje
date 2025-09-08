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
        "200g spaghetti","3 tenen knoflook","1/2 tl chilivlokken",
        "3 el olijfolie","Zout, peper","Peterselie"
      ],
      steps: "Kook de pasta. Fruit knoflook en chili in olie. Meng met pasta en serveer."
    },
    {
      title: "Mac and cheese",
      prep: 20,
      cook: 20,
      ingredients: [
        "300 gram macaroni","70 gram boter","40 gram bloem","500 ml melk",
        "150 gram oude kaas","150 gram jonge kaas","250 gram hamblokjes","paneermeel"
      ],
      steps: "Stap 1 verwarm de oven voor op 200 graden en kook de macaroni..."
    },
    {
      title: "Carbonara",
      prep: 20,
      cook: 5,
      ingredients: [
        "400 gram spaghetti","125 ml verse slagroom","2 middelgrote eieren",
        "75 gram Parmezaanse kaas","200 gram spekreepjes","2 tenen knoflook"
      ],
      steps: "Stap 1 Kook de spaghetti volgens de aanwijzingen..."
    }
  ],

  "soepen": [
    {
      title: "Pompoensoep",
      prep: 10,
      cook: 25,
      ingredients: ["600g pompoen","1 ui","1 teen knoflook","800 ml bouillon"],
      steps: "Fruit ui en knoflook. Voeg pompoen en bouillon toe. Kook zacht en pureer."
    },
    {
      title: "Goulash soep",
      prep: 30,
      cook: 10,
      ingredients: [
        "2 uien","3 tenen knoflook","1 rode paprika","1 gele paprika",
        "1 runderbouillonblokje","1 blik gepelde tomaten","2 aardappelen",
        "2 potten vleesbouillon","1 blikje tomatenpuree 70 g","1 el paprikapoeder","3 el bloem"
      ],
      steps: "Stap 1 snipper de uien en hak de knoflook..."
    },
    {
      title: "Paprikasoep",
      prep: 30,
      cook: 0,
      ingredients: [
        "2 eetl olijfolie","2 uien","3 rode paprika's","2 teentjes knoflook",
        "1 eetl paprikapoeder","1 tl komijnpoeder","mespunt chilipoeder",
        "70 g tomatenpuree","400 g tomatenblokjes","2 potten rundvleesbouillon",
        "1 bouillontablet","25 g vermicelli","400 g kidneybonen"
      ],
      steps: "Stap 1 Verwarm de olie en fruit de uien..."
    },
    {
      title: "Groentesoep",
      prep: 30,
      cook: 5,
      ingredients: [
        "Soepballetjes","1 liter runderbouillon","100 g sperziebonen",
        "1 courgette","100 g bloemkool","100 g broccoli","1 bosje peterselie"
      ],
      steps: "Stap 1 Breng de bouillon aan de kook en voeg alle groenten..."
    },
    {
      title: "Chinese tomatensoep",
      prep: 30,
      cook: 0,
      ingredients: [
        "2 liter water","2 pakjes tomaten frito","1 potje kippenbouillon",
        "4 eetl gembersiroop","scheutje sojasaus","mespunt cayennepoeder",
        "2 eetl bruine suiker","25 g vermicelli"
      ],
      steps: "Stap 1 Snijd kip en kook in bouillon..."
    }
  ],

  "italiaans": [
    {
      title: "Lasagne in pan",
      prep: 45,
      cook: 45,
      ingredients: [
        "1 ui","1 knoflook teen","400 g gehakt","1 pot tomaten basilicumsaus",
        "1 pak lasagnebladen","1 pak bechamelsaus","1 kippenbouillonblokje",
        "Italiaanse kruiden","Zout","Peper","Geraspte kaas","1 potje tomatenpuree"
      ],
      steps: "Stap 1 ui snipperen en knoflook persen..."
    },
    {
      title: "Kip met mozzarella en gnocchi",
      prep: 20,
      cook: 18,
      ingredients: [
        "1 ui","1 teen knoflook","1 rode paprika","1 bol mozzarella",
        "2 kl Italiaanse kruiden","500 ml passata","250 g gnocchi","2 kipfilets"
      ],
      steps: "Stap 1 Verwarm de oven voor op 200°C..."
    },
    {
      title: "Tomaten Risotto",
      prep: 40,
      cook: 0,
      ingredients: [
        "150 g risottorijst","1 ui","1 teen knoflook","verse basilicum",
        "2 eetl olie","Scheut witte wijn","300 ml bouillon","250 g cherrytomaatjes",
        "50 g Parmezaanse kaas","350 ml tomatensaus","1 burrata"
      ],
      steps: "Stap 1 Verwarm de oven op 200 graden. Snipper de ui..."
    },
    {
      title: "Penne met pesto zongedroogde tomaat en rucola",
      prep: 15,
      cook: 10,
      ingredients: [
        "300 g penne","295 g zongedroogde tomaten","150 g rucola","125 g pestosaus"
      ],
      steps: "Stap 1 Kook de pasta volgens de aanwijzingen..."
    }
  ],

  "mexiaans": [
    {
      title: "Nachos met gehakt, paprika, pepertjes en kaas",
      prep: 10,
      cook: 15,
      ingredients: [
        "250 g rundergehakt","1 rode paprika","1 groene paprika","1 rode peper",
        "1 zak nacho’s","150 g geraspte kaas","125 ml zure room",
        "1 el olie","1 tl paprikapoeder","1/2 tl komijn","Zout, peper"
      ],
      steps: "Stap 1 Verwarm de oven voor op 200°C..."
    },
    {
      title: "Nachos",
      prep: 15,
      cook: 20,
      ingredients: [
        "1 zak tortillachips","300 g rundergehakt","1 ui","2 tenen knoflook",
        "1 rode paprika","1 groene peper","1 blik tomatenblokjes",
        "2 tl paprikapoeder","1 tl komijn","1/2 tl chilipoeder",
        "150 g kaas","1 el olie"
      ],
      steps: "Stap 1 Bak het gehakt met ui, knoflook, peper en tomaten..."
    }
  ],

  "aziatisch": [
    {
      title: "Chinese bami",
      prep: 40,
      cook: 0,
      ingredients: [
        "500 g mie","4 kipbouillonblokjes","250 g hamblokjes","1 prei",
        "4 eieren","1 el sesamolie","1 el sojasaus","3 tenen knoflook",
        "snufje gember","mespuntje ve-tsin","1 tl witte peper","wokolie"
      ],
      steps: "Stap 1 Kook de mie in water met bouillonblokjes..."
    },
    {
      title: "Chinese nasi",
      prep: 30,
      cook: 10,
      ingredients: [
        "400 g witte rijst","250 g hamblokjes","1 liter kippenbouillon",
        "3 tenen knoflook","200 g doperwten","1 bosje bosui","1 el bouillonpoeder",
        "6 eieren","1 el sesamolie","1/2 el sojasaus","zout en peper","50 ml olie"
      ],
      steps: "Stap 1 Kook de rijst in bouillon..."
    },
    {
      title: "Koe loe yuk",
      prep: 30,
      cook: 10,
      ingredients: [
        "500 g varkensvlees","1 ei","2 el sojasaus","1 el rijstwijn",
        "½ tl zout","½ tl peper","100 g maizena","3 el olie",
        "3 el ketchup","2 el rijstazijn","2 el suiker","1 el sojasaus",
        "100 ml bouillon","1 el maizena+2 el water"
      ],
      steps: "Stap 1 Marineer vlees en wentel door maizena..."
    }
  ],

  "streetfood": [
    {
      title: "Riefkoeken",
      prep: 30,
      cook: 0,
      ingredients: [
        "500 g aardappel","1 ui","1 ei","1 el bloem","zout, peper","nootmuskaat"
      ],
      steps: "Stap 1 Meng aardappel, ui, ei en bloem..."
    },
    {
      title: "Dorito kip",
      prep: 20,
      cook: 15,
      ingredients: [
        "500 g kipfilet","1 zak Doritos","2 eieren","3 el bloem"
      ],
      steps: "Stap 1 Verwarm oven voor op 200°C..."
    }
  ],

  "overig": [
    {
      title: "Croque monsieur met bechamelsaus",
      prep: 25,
      cook: 5,
      ingredients: ["4 sneetjes brood","ham","kaas","boter","melk","bloem","nootmuskaat"],
      steps: "Stap 1 Maak bechamelsaus..."
    },
    {
      title: "Bladerdeegtaartjes",
      prep: 30,
      cook: 12,
      ingredients: ["8 plakjes bladerdeeg","4 plakken spek","4 champignons","5 eieren","peterselie"],
      steps: "Stap 1 Verwarm de oven voor op 220°C..."
    },
    {
      title: "Kapsalon",
      prep: 15,
      cook: 5,
      ingredients: ["700 g friet","500 g shoarma","100 g kaas","komkommer","tomaten","sla","knoflooksaus"],
      steps: "Stap 1 Bak de friet..."
    }
  ],

  "hollandse pot": [
    {
      title: "Krieltjes à la bonne femme",
      prep: 30,
      cook: 0,
      ingredients: ["100 g spekjes","1 ui","150 g champignons","1 pot erwten/wortels","400 g krieltjes"],
      steps: "Stap 1 Snij de ui en champignons..."
    }
  ],

  "korte bereiding": [
    {
      title: "Wraps met kippenragout en rucola",
      prep: 15,
      cook: 0,
      ingredients: ["1 blik kipragout","8 wraps","3 el crème fraîche","1 zak rucola"],
      steps: "Stap 1 verwarm de kipragout..."
    }
  ],

  "sauzen": [
    {
      title: "Peper saus",
      prep: 10,
      cook: 30,
      ingredients: ["5 tenen knoflook","peperkorrels","scheut wijn","2 kookroom","bouillon","bloem"],
      steps: "Stap 1 Snij knoflook..."
    },
    {
      title: "Zoetzure saus",
      prep: 15,
      cook: 0,
      ingredients: [
        "150 ml water","3 el azijn","3 el suiker","3 el ketchup","1 el sojasaus",
        "1 el maizena+2 el water","optioneel: rode peper of ananas"
      ],
      steps: "Stap 1 Doe water, azijn, suiker, ketchup en sojasaus in een pan..."
    }
  ]
};

  
 // { [tab]: [{ title, prep, cook, ingredients[], steps }] }

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

// --- REPLACE renderRecipes() ---
function renderRecipes() {
  if (!$recipeList || !active) return;
  $recipeList.innerHTML = "";

  const list = recipes[active] || [];
  if (list.length === 0) {
    const li = document.createElement("li");
    li.className = "muted"; li.textContent = "Nog geen recepten in deze categorie.";
    $recipeList.appendChild(li); return;
  }

  list.forEach((rec, idx) => $recipeList.appendChild(
    recipeCard(
      rec,
      () => { // verwijderen zonder confirm
        recipes[active].splice(idx, 1);
        save(); renderRecipes();
      },
      null,
      () => showRecipePage(rec, active) // <<— NIEUW: openen als volledige pagina
    )
  ));
}


// --- REPLACE renderSearchResults(q) ---
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
    const card = recipeCard(
      rec,
      null,
      tab,
      () => { setActive(tab); $search.value = ""; showRecipePage(rec, tab); } // <<— open pagina
    );
    $recipeList.appendChild(card);
  });
}


// --- REPLACE recipeCard(rec, onDelete, tabLabel) ---
function recipeCard(rec, onDelete, tabLabel, onOpen) {
  const li = document.createElement("li"); 
  li.className = "card";
  if (onOpen) {
    li.style.cursor = "pointer";
    li.onclick = () => onOpen(rec);
  }

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
    del.onclick = (e) => { e.stopPropagation(); onDelete(); }; // belangrijk: voorkomt openen
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

// ============ NIEUW: VOLLEDIGE PAGINA VOOR 1 RECEPT ============
function showRecipePage(rec, tabName) {
  // overlay
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.background = "rgba(0,0,0,0.7)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "stretch";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "10000";
  overlay.style.overflowY = "auto";

  // page
  const page = document.createElement("article");
  page.style.background = "#0f1318";
  page.style.color = "white";
  page.style.width = "min(1000px, 96vw)";
  page.style.margin = "2vh 0";
  page.style.overflowY = "auto";  
  page.style.maxHeight = "96vh";
  page.style.borderRadius = "14px";
  // page.style.overflow = "hidden";
  page.style.display = "flex";
  page.style.flexDirection = "column";
  page.style.border = "1px solid rgba(255,255,255,0.12)";
  page.style.boxShadow = "0 20px 60px rgba(0,0,0,0.45)";
// Zorg dat kaarten zelf niet knippen
ingCard.style.maxHeight = "";
ingCard.style.overflow = "visible";
stepsCard.style.maxHeight = "";
stepsCard.style.overflow = "visible";

  // header
  const header = document.createElement("header");
  header.style.display = "flex";
  header.style.alignItems = "center";
  header.style.justifyContent = "space-between";
  header.style.gap = "8px";
  header.style.padding = "14px 16px";
  header.style.borderBottom = "1px solid rgba(255,255,255,0.08)";

  const titleBox = document.createElement("div");
  titleBox.innerHTML = `
    <div class="muted" style="font-size:12px;opacity:.8">${escapeHtml(tabName || "")}</div>
    <h2 style="margin:.15rem 0 0 0">${escapeHtml(rec.title || "Recept")}</h2>
    <div style="margin-top:.35rem">
      <span class="chip">${(rec.prep||0)} min prep</span>
      <span class="chip" style="margin-left:.35rem">${(rec.cook||0)} min koken</span>
    </div>
  `;

  const headerBtns = document.createElement("div");
  headerBtns.style.display = "flex"; 
  headerBtns.style.gap = "8px";

  const backBtn = document.createElement("button");
  backBtn.className = "btn";
  backBtn.textContent = "← Terug";
  backBtn.onclick = () => document.body.removeChild(overlay);

  const printBtn = document.createElement("button");
  printBtn.className = "btn";
  printBtn.textContent = "Print";
  printBtn.onclick = () => printRecipe(rec, tabName);

  headerBtns.append(backBtn, printBtn);
  header.append(titleBox, headerBtns);

  // content
  const content = document.createElement("div");
  content.style.padding = "18px 16px 22px 16px";
  content.style.display = "grid";
  content.style.gridTemplateColumns = "1fr";
  content.style.gap = "16px";

  // ingrediënten
  const ingCard = document.createElement("section");
  ingCard.className = "card";
  ingCard.style.background = "rgba(255,255,255,0.03)";
  ingCard.style.border = "1px solid rgba(255,255,255,0.06)";
  ingCard.style.padding = "12px 14px";
  ingCard.style.borderRadius = "12px";
  ingCard.innerHTML = `<h3 style="margin:0 0 8px 0">Ingrediënten</h3>`;

  const ul = document.createElement("ul");
  ul.style.margin = "0"; ul.style.paddingLeft = "18px";
  (rec.ingredients || []).forEach(i => {
    const li = document.createElement("li");
    li.style.margin = "4px 0";
    li.textContent = i;
    ul.appendChild(li);
  });
  if (!ul.children.length) {
    const p = document.createElement("p"); p.textContent = "—";
    ingCard.appendChild(p);
  } else {
    ingCard.appendChild(ul);
  }

  // stappen
  const stepsCard = document.createElement("section");
  stepsCard.className = "card";
  stepsCard.style.background = "rgba(255,255,255,0.03)";
  stepsCard.style.border = "1px solid rgba(255,255,255,0.06)";
  stepsCard.style.padding = "12px 14px";
  stepsCard.style.borderRadius = "12px";
  stepsCard.innerHTML = `<h3 style="margin:0 0 8px 0">Bereiding</h3>`;

  const steps = document.createElement("div");
  steps.style.whiteSpace = "pre-wrap";
  steps.style.lineHeight = "1.5";
  steps.textContent = rec.steps || "—";
  stepsCard.appendChild(steps);

  content.append(ingCard, stepsCard);

  // footer hint
  const foot = document.createElement("div");
  foot.className = "muted";
  foot.style.opacity = ".75";
  foot.style.fontSize = "12px";
  foot.style.padding = "0 16px 16px";
  foot.textContent = "Tip: gebruik de Print-knop of druk Ctrl/Cmd+P.";

  page.append(header, content, foot);
  overlay.appendChild(page);

  // sluiten door klik naast de kaart of Escape
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) document.body.removeChild(overlay);
  });
  document.addEventListener("keydown", escToClose);
  function escToClose(ev){
    if (ev.key === "Escape") {
      document.removeEventListener("keydown", escToClose);
      if (document.body.contains(overlay)) document.body.removeChild(overlay);
    }
  }

  document.body.appendChild(overlay);
}

// Print helper
function printRecipe(rec, tabName) {
  const w = window.open("", "_blank");
  const esc = (s)=>String(s||"").replace(/[&<>"']/g,m=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[m]));
  const ingredients = (rec.ingredients||[]).map(i=>`<li>${esc(i)}</li>`).join("");
  w.document.write(`
    <html>
      <head>
        <meta charset="utf-8">
        <title>${esc(rec.title||"Recept")}</title>
        <style>
          body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; margin: 24px; color:#111 }
          h1 { margin: 0 0 6px 0; }
          .muted { color:#555; font-size:13px; margin-bottom:12px }
          .meta { margin:8px 0 16px; }
          .chip { display:inline-block; border:1px solid #ccc; border-radius:999px; padding:2px 8px; font-size:12px; margin-right:6px }
          h2 { margin:18px 0 8px }
          ul { margin:0 0 12px 18px }
          pre { white-space: pre-wrap; }
          @media print { @page { margin: 16mm } }
        </style>
      </head>
      <body>
        <div class="muted">${esc(tabName||"")}</div>
        <h1>${esc(rec.title||"Recept")}</h1>
        <div class="meta">
          <span class="chip">${rec.prep||0} min prep</span>
          <span class="chip">${rec.cook||0} min koken</span>
        </div>
        <h2>Ingrediënten</h2>
        ${ingredients ? `<ul>${ingredients}</ul>` : "<p>—</p>"}
        <h2>Bereiding</h2>
        <pre>${esc(rec.steps||"—")}</pre>
        <script>window.onload = () => window.print();<\/script>
      </body>
    </html>
  `);
  w.document.close();
}
// ========== EINDE: VOLLEDIGE RECEPTPAGINA ===========


// === EINDE NIEUW ===

// Events
$add?.addEventListener("click", addTab);
$search?.addEventListener("input", render);
