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
  { name: "Entree", url: "https://www.entree.nu/inloggen-of-inschrijven/" },
  { name: "Pararius", url: "https://www.pararius.nl/huurwoningen/nijmegen" },
  { name: "Funda Huur", url: "https://www.funda.nl/zoeken/huur?selected_area=[%22nijmegen%22]&price=%220-1200%22" },
  { name: "Huurstunt", url: "https://www.huurstunt.nl/huren/nijmegen/+5km/0-1250/" },
  { name: "Hans Janssen Makelaars", url: "https://www.hansjanssen.nl/wonen/zoeken/heel-nederland/huur/" },
  { name: "Kamernet", url: "https://kamernet.nl/huren/huurwoningen-nijmegen?searchview=1&maxRent=12&minSize=14&radius=5&pageNo=1&sort=1" }
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
