import React, { useEffect, useMemo, useState } from "react";

// Bewaar/lees uit localStorage met een key die uniek is voor deze pagina
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

export default function KookboekTabs() {
  const [tabs, setTabs] = useState(DEFAULT_TABS);
  const [active, setActive] = useState(DEFAULT_TABS[0]);
  const [filter, setFilter] = useState("");

  // Laad uit storage bij eerste render
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved?.tabs?.length) {
        setTabs(saved.tabs);
        setActive(saved.active || saved.tabs[0]);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Sla op in storage als tabs/active wijzigen
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ tabs, active })
      );
    } catch (e) {
      // ignore
    }
  }, [tabs, active]);

  const addTab = () => {
    const name = prompt("Naam van de nieuwe tab?")?.trim();
    if (!name) return;
    if (tabs.some((t) => t.toLowerCase() === name.toLowerCase())) {
      alert("Deze tab bestaat al.");
      return;
    }
    const updated = [...tabs, name];
    setTabs(updated);
    setActive(name);
  };

  const removeTab = (name) => {
    if (!confirm(`Tab \"${name}\" verwijderen?`)) return;
    const updated = tabs.filter((t) => t !== name);
    setTabs(updated);
    if (active === name) setActive(updated[0] ?? "");
  };

  const visibleTabs = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return tabs;
    return tabs.filter((t) => t.toLowerCase().includes(q));
  }, [tabs, filter]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b bg-white px-4 py-3 shadow-sm">
        <h1 className="text-xl font-semibold">Kookboek</h1>
        <div className="ml-auto flex items-center gap-2">
          <input
            aria-label="Zoek tabs"
            placeholder="Zoek tab…"
            className="rounded-lg border px-3 py-1.5 text-sm focus:outline-none focus:ring"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <button
            onClick={addTab}
            title="Nieuwe tab toevoegen"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white text-xl leading-none shadow hover:bg-gray-50 active:scale-95"
            aria-label="Nieuwe tab toevoegen"
          >
            +
          </button>
        </div>
      </header>

      {/* Layout */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 p-4 md:grid-cols-[280px_1fr]">
        {/* Verticale tabs */}
        <nav
          className="rounded-2xl border bg-white p-2 shadow-sm"
          aria-label="Categorieën"
        >
          <ul className="flex max-h-[70vh] flex-col gap-1 overflow-auto pr-1">
            {visibleTabs.map((t) => (
              <li key={t} className="group">
                <button
                  onClick={() => setActive(t)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition
                    ${
                      active === t
                        ? "bg-gray-900 text-white shadow"
                        : "hover:bg-gray-100"
                    }`}
                >
                  <span className="truncate">{t}</span>
                  <span className="opacity-0 transition group-hover:opacity-100">
                    <RemoveIcon onClick={(e) => { e.stopPropagation(); removeTab(t); }} />
                  </span>
                </button>
              </li>
            ))}
            {visibleTabs.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-500">Geen resultaten…</li>
            )}
          </ul>
        </nav>

        {/* Content */}
        <main className="rounded-2xl border bg-white p-6 shadow-sm">
          {active ? (
            <div>
              <h2 className="mb-2 text-lg font-semibold">{active}</h2>
              <p className="text-sm text-gray-600">
                Hier kun je je recepten voor <strong>{active}</strong> tonen. Je kunt dit
                vervangen door je eigen component of inhoud (bijv. een lijst met
                recepten, formulieren, etc.).
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-600">Nog geen tabs.</p>
          )}
        </main>
      </div>

      {/* kleine footer */}
      <footer className="px-4 pb-6 text-center text-xs text-gray-500">
        Gemaakt voor jouw kookboek – tabs onder elkaar met een plusknop om nieuwe tabs toe te voegen.
      </footer>

      {/* Tailwind-injectie voor de canvas preview; in Next.js gebruik je je eigen Tailwind setup */}
      <style>{`
        /* Als je geen Tailwind gebruikt, hieronder een paar minimale fallback styles. */
        .bg-gray-50 { background: #f9fafb; }
        .bg-white { background: #fff; }
        .text-gray-900 { color: #111827; }
        .text-gray-600 { color: #4b5563; }
        .text-gray-500 { color: #6b7280; }
        .border { border: 1px solid #e5e7eb; }
        .rounded-2xl { border-radius: 1rem; }
        .rounded-xl { border-radius: 0.75rem; }
        .rounded-lg { border-radius: 0.5rem; }
        .rounded-full { border-radius: 9999px; }
        .shadow, .shadow-sm { box-shadow: 0 1px 2px rgba(0,0,0,0.06); }
        .px-3 { padding-left: .75rem; padding-right: .75rem; }
        .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
        .py-1\.5 { padding-top: .375rem; padding-bottom: .375rem; }
        .py-2 { padding-top: .5rem; padding-bottom: .5rem; }
        .py-3 { padding-top: .75rem; padding-bottom: .75rem; }
        .p-2 { padding: .5rem; }
        .p-4 { padding: 1rem; }
        .p-6 { padding: 1.5rem; }
        .mb-2 { margin-bottom: .5rem; }
        .ml-auto { margin-left: auto; }
        .min-h-screen { min-height: 100vh; }
        .max-w-6xl { max-width: 72rem; }
        .grid { display: grid; }
        .grid-cols-1 { grid-template-columns: 1fr; }
        .gap-1 { gap: .25rem; }
        .gap-3 { gap: .75rem; }
        .gap-4 { gap: 1rem; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .justify-between { justify-content: space-between; }
        .inline-flex { display: inline-flex; }
        .h-9 { height: 2.25rem; }
        .w-9 { width: 2.25rem; }
        .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
        .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
        .text-sm { font-size: .875rem; line-height: 1.25rem; }
        .font-semibold { font-weight: 600; }
        .leading-none { line-height: 1; }
        .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .overflow-auto { overflow: auto; }
        .max-h-\[70vh\] { max-height: 70vh; }
        .sticky { position: sticky; }
        .top-0 { top: 0; }
        .z-10 { z-index: 10; }
        .rounded-2xl { border-radius: 1rem; }
        .hover\:bg-gray-100:hover { background: #f3f4f6; }
        .active\:scale-95:active { transform: scale(.95); }
        .shadow-sm { box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
        .transition { transition: all .15s ease; }
        .opacity-0 { opacity: 0; }
        .opacity-100 { opacity: 1; }
        .group:hover .group-hover\:opacity-100 { opacity: 1; }
        .bg-gray-900 { background: #111827; }
        .text-white { color: #fff; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .pr-1 { padding-right: .25rem; }
      `}</style>
    </div>
  );
}

function RemoveIcon({ onClick }) {
  return (
    <button
      onClick={onClick}
      title="Verwijder tab"
      aria-label="Verwijder tab"
      className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full border bg-white text-xs leading-none hover:bg-gray-50"
    >
      ×
    </button>
  );
}
