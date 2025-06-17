import React from "react";
import './index.css';

const websites = [
  { name: "Huurwoningen.com", url: "https://www.huurwoningen.com/in/nijmegen/?price=0-1200" },
  { name: "Rentweb24", url: "https://rentweb24.nl/properties?place=Nijmegen" },
  { name: "Rentwebs", url: "https://www.rentwebs.nl/aanbod?-=72&field_house_living_space_value=All&field_house_kind_target_id=All&field_house_price_value=All&tid_1=&aantalslaapkamers=All" },
  { name: "Wonen in de Boterfabriek", url: "https://boterfabriekbatava.nl/aanbod/#/" },
  { name: "NMG", url: "https://nmgwonen.nl/huur/#q1ZKTClKLY4vyElMLAFS-cUlyfkpqUpWSn6ZWbmp6al5SjpKGaWlRQVFmVnFSlbVSrmJFUBZQyNTA6VaHaWCxPRUoDBYiVItAA" },
  { name: "BPD Woning", url: "https://hurenbij.bpdwoningfonds.nl/aanbod/" },
  { name: "Rebo Groep", url: "https://rebowonenhuur.nl/zoekopdracht/" },
  { name: "Huislijn", url: "https://www.huislijn.nl/huurwoning/nederland/gelderland?c-maxPrice=1200&c-municipality=Nijmegen" },
  { name: "Ik wil huren", url: "https://ikwilhuren.nu/aanbod/" },
  { name: "Entree", url: "https://www.entree.nu/inloggen-of-inschrijven/" }
];

export default function WebsiteEntrance() {
  return (
    <div className="container">
      <h1 className="title">Kies een website om te bezoeken</h1>
      <div className="grid">
        {websites.map((site, index) => (
          <a
            key={index}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`tile tile-${index % 9}`} // voor kleurvariatie
          >
            <div className="tile-title">{site.name}</div>
         
          </a>
        ))}
      </div>
    </div>
  );
}
