import React from "react";

const websites = [
  { name: "Huurwoningen.com", url: "https://www.huurwoningen.com" },
  { name: "Rentweb24", url: "https://www.rentweb24.nl" },
  { name: "Rentwebs", url: "https://www.rentwebs.nl" },
  { name: "Wonen in de Boterfabriek", url: "https://www.wonenindeboterfabriek.nl" },
  { name: "NMG", url: "https://www.nmg.nl" },
  { name: "BPD Woning", url: "https://www.bpd.nl" },
  { name: "Rebo Groep", url: "https://www.rebogroep.nl" },
  { name: "Huislijn", url: "https://www.huislijn.nl" },
  { name: "MVGM", url: "https://www.mvgm.nl" }
];

export default function WebsiteEntrance() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">Kies een website om te bezoeken</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {websites.map((site, index) => (
          <a
            key={index}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white shadow p-4 rounded-2xl hover:bg-gray-200 text-center font-medium"
          >
            {site.name}
          </a>
        ))}
      </div>
    </div>
  );
}