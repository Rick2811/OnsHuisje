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
  "Pastas": [
    {
      title: "Mac and cheese",
      prep: 20,
      cook: 20,
      ingredients: [
        "300 gram macaroni",
        "70 gram boter",
        "40 gram bloem",
        "500 ml melk",
        "150 gram oude kaas",
        "150 gram jonge kaas",
        "250 gram hamblokjes",
        "parneermeel"
      ],
      steps: "Stap 1 verwarm de oven voor op 200 graden en kook de macaroni maar haal er 2 minutne af zodat het net nog niet gaar is\nStap 2 verhit de boter in een steelpan en voeg de bloem toe voeg geleidelijk melk toe en roer met garde tot een romige saus voeg vervolgens 100 gram jong en oude kaas toe en blijf roeren tot het gesmolten is \nStap 3 meng de kaassaus met hamblokjes en meng dit door de macaroni heen en schep het in een ovenschaal\nStap 4 bestrooi met paneermeel en bak dit in de oven voor circa 20 minuten"
    }
  ],
  "overig": [
    {
      title: "Croque monsieur met bechemelsaus",
      prep: 25,
      cook: 5,
      ingredients: [
        "4 dikke sneeen brood",
        "1 el smeerbare roomboter ongezouten",
        "4 plakken jonge kaas",
        "2 plakken ham",
        "50 gram geraspte jonge kaas",
        "40 gram roomboter ongezouten",
        "40 gram bloem",
        "500 milliliter volle melk",
        "nootmuskaat"
      ],
      steps: "Stap 1 Smelt voor de bechamelsaus de roomboter op een lage stand in een (steel)pan. Roer de bloem met een garde erdoorheen en laat 1 minuut al roerend garen. Voeg al roerend beetje bij beetje de melk toe. Voeg pas weer melk toe als de vorige portie is opgenomen.\nStap 2 Laat de saus 3-5 minuten koken op een lage stand en roer af en toe over de bodem om aanbranden te voorkomen. Breng op smaak met zout, peper en nootmuskaat en laat afkoelen.\nStap 3 Besmeer 2 boterhammen aan een kant met boter. Keer ze om zodat ze met de boterkant naar beneden liggen en beleg elke boterham met 1 plak kaas, een beetje mosterd, 1 plak ham en nog 1 plak kaas. Leg de overige boterhammen erbovenop en besmeer deze ook met boter. Verwarm de ovengrill voor.\nStap 4 Verhit een koekenpan en leg de broodstapeltjes erin. Bak de tosti's op een lage stand om en om goudbruin, tot de kaas gesmolten is.\nStap 5 Leg de tosti's op de bakplaat en bestrijk met een paar lepels bechamelsaus. Bestrooi met de geraspte kaas en gratineer onder de ovengrill. Serveer direct. Lekker met een groene salade."
    }
  ],
  "Pastas": [
    {
      title: "Carbonara",
      prep: 20,
      cook: 5,
      ingredients: [
        "400 gram spaghetti",
        "125 ml verse slagroom",
        "2 middelgrote eieren",
        "75 gram Parmezaanse kaas",
        "4 takjes verse platte peterselie",
        "200 gram spekreepjes",
        "2 tenen knoflook"
      ],
      steps: "Stap 1 Kook de spaghetti volgens de aanwijzingen op de verpakking beetgaar. Doe ondertussen de slagroom in een kom, breek de eieren erboven en klop met een vork door elkaar. Rasp de kaas erboven en meng erdoor. Snijd de peterselie fijn.\nStap 2 Verhit een koekenpan zonder olie of boter op middelhoog vuur en bak de spekreepjes in 5 min. uit. Snijd ondertussen de knoflook fijn en bak de laatste 30 sec. met de spekjes mee. Schep de spekjes uit de pan en laat uitlekken op keukenpapier.\nStap 3 Voeg al roerend het slagroommengsel toe. Blijf roeren tot de kaas gesmolten is en de saus iets is ingedikt. Voeg eventueel wat kookvocht toe om de pasta smeuïger te maken. Schep de spaghetti carbonara vlug in een schaal, zodat de restwarmte van de pan het ei in de saus niet verder laat stollen. Bestrooi met de peterselie en (versgemalen) zwarte peper. Serveer direct."
    }
  ],
  "korte bereiding": [
    {
      title: "Wraps met kippenragout en rucola",
      prep: 15,
      cook: 0,
      ingredients: [
        "1 blik kipragout",
        "8 kleine wraps",
        "3 el creme fraiche",
        "1 zak rucola",
        "4 cocktail prikkers"
      ],
      steps: "Stap 1 verwarm de kipragout en verwarm de wraps voor 1 minuut in de magnetron op 600 watt \nStap 2 besmeer de wraps met creme fraiche verdeel de rucola over de wraps\nStap 3 Voeg de ragout toe en sluit de wrap en doe er een sateprikker in"
    }
  ],"mexiaans": [
  {
    title: "Nachos met gehakt, paprika, pepertjes en kaas",
    prep: 10,
    cook: 15,
    ingredients: [
      "250g rundergehakt",
      "1 rode paprika",
      "1 groene paprika",
      "1 rode peper (of jalapeño)",
      "1 zak tortillachips (nacho's)",
      "150g geraspte kaas (cheddar of jong belegen)",
      "125ml zure room",
      "1 el olijfolie",
      "1 tl paprikapoeder",
      "1/2 tl gemalen komijn",
      "Zout en peper"
    ],
    steps: "Stap 1: Verwarm de oven voor op 200°C.\nStap 2: Verhit de olie en bak het gehakt rul met paprikapoeder, komijn, zout en peper.\nStap 3: Snijd de paprika's en peper; bak 3–4 minuten mee met het gehakt.\nStap 4: Verdeel de nacho's over een ovenschaal en schep het gehaktmengsel erover.\nStap 5: Bestrooi royaal met de geraspte kaas.\nStap 6: Bak 8–10 minuten tot de kaas gesmolten en licht goudbruin is.\nStap 7: Haal uit de oven en serveer met toefjes zure room (en extra peperringetjes naar smaak)."
  }
],
"soepen": [
    {
      title: "Paprikasoep",
      prep: 30,
      cook: 0,
      ingredients: [
        "2 eetlepels olijfolie",
        "2 uien (gesnipperd)",
        "3 rode paprika's (in kleine blokjes, zonder zaadjes)",
        "2 teentjes knoflook (fijngehakt)",
        "1 eetlepel paprikapoeder",
        "1 theelepel komijnpoeder (djinten)",
        "mespunt chilipoeder",
        "70 gram tomatenpuree (blikje)",
        "400 gram tomatenblokjes (blik)",
        "2 potten rundvleesbouillon met vlees",
        "1 runderbouillontablet",
        "25 gram vermicelli (verkruimeld)",
        "circa 400 gram kidneybonen (blik)"
      ],
      steps: "Stap 1 Verwarm de olie in een grote soeppan en fruit de uien op een lage stand in circa 5 minuten lichtbruin.\nStap 2 Voeg de paprikablokjes, knoflook en specerijen toe en roerbak nog een paar minuten. Voeg de tomatenpuree en -blokjes toe en bak een paar minuten verder.\nStap 3 Neem een paar grote lepels van de soep uit de pan en pureer deze met een staafmixer. Doe de gepureerde soep weer terug in de pan en voeg de bouillon met vlees, 500 ml water, het bouillonblokje, de vermicelli en kidneybonen toe. Breng weer aan de kook en laat op een lage stand circa 10 minuten zachtjes pruttelen."
    }
  ],
  "hollandse pot": [
    {
      title: "Krieltjes a la bonne femme",
      prep: 30,
      cook: 0,
      ingredients: [
        "100 gram spekjes",
        "1 ui",
        "150 gram champignons",
        "1 pot met erwten en wortels",
        "400 gram krieltjes"
      ],
      steps: "Stap 1 snipper de ui en snij de champignons\nStap 2 doe olie in een koekenpan en bak de spekjes op laag vuur aan\nStap 3 voeg ui en champignons toe en bak ze lichtbruin\nStap 4 haal alles uit de pan en bak de krieltjes goudbruin\nStap 5 voeg alles samen en warm op"
    }
  ],
  "soepen": [
    {
      title: "Groentesoep",
      prep: 30,
      cook: 5,
      ingredients: [
        "Soepballetjes",
        "1 liter runderbouillon",
        "100 gram sperziebonen (afgehaald)",
        "1 courgette (in plakjes)",
        "100 gram bloemkoolroosjes (in kleine roosjes)",
        "100 gram broccoli (in kleine roosjes)",
        "1 bosje bladpeterselie (fijngehakt)"
      ],
      steps: "Stap 1 Breng de bouillon aan de kook en voeg alle groenten en de balletjes in één keer toe. Laat de soep nog ca. 5 minuten zonder deksel zachtjes doorkoken tot alles beetgaar is.\nStap 2 breng op smaak doormiddel van zout en peper"
    }
  ],
  "overig": [
    {
      title: "Bladerdeegtaartjes",
      prep: 30,
      cook: 12,
      ingredients: [
        "8 plakken bladerdeeg",
        "4 plakkenspek",
        "4 champignons",
        "5 eieren",
        "15 gram peterselie"
      ],
      steps: "Stap 1 Verwarm de oven voor op 220 graden.Laat het bladerdeeg ontdooien. Leg twee plakjes bladerdeeg op elkaar en rol uit tot een plak van 20 bij 20 cm. Vouw de randjes van de bladerdeegplakken dubbel zodat er een opstaande rand ontstaat. Leg de bladerdeegtaartjes op een met bakpapier beklede bakplaat. Prik gaatjes in het deeg met een vork. Klop een ei los en bestrijk de bladerdeegtaartjes met het ei.\nStap 2 Snij de champignons in plakjes en de peterselie fijn. Verdeel de plakken ontbijtspek en de champignons over het bladerdeeg. Bak 12 minuten in het midden van de oven. Haal de bladerdeegtaartjes uit de oven en breek boven elk taartje een ei. Zet daarna de bladerdeegtaartjes 5 minuten terug in de oven totdat het eiwit gestold is en de dooier nog mooi zacht is.\nStap 3 Garneer met de fijngesneden peterselie, zout en peper."
    }
  ],
  "italiaans": [
    {
      title: "Kip met mozzarella en gnocchi",
      prep: 20,
      cook: 18,
      ingredients: [
        "1 ui",
        "1 teentje knoflook",
        "1 rode paprika",
        "1 bol mozzarella",
        "2 kl Italiaanse kruiden",
        "500 ml tomaten­passata",
        "250 g gnocchi",
        "2 kipfilets",
        "2 el olijfolie",
        "peper en zout"
      ],
      steps: "Stap 1 Verwarm de oven voor op 200 °C\nStap 2Snij de ui fijn en pers de knoflook. Snij de rode paprika in blokjes. Snij de mozzarella in plakjes.\nStap 3 Verhit de helft van de olijfolie in een antikleefpan en stoof de ui 2 minuten. Voeg de knoflook, Italiaanse kruiden en paprika toe en laat 4 minuten stoven. \nStoep 4 Schep regelmatig om. Voeg de passata toe, kruid met peper en zout en laat 5 minuten pruttelen.\nStap 5 Breng een ruime pot gezouten water aan de kook. Wanneer het water kookt, voeg je de gnocchi toe. Wanneer ze gaar zijn, komen ze bovendrijven, dat duurt maar 2-3 minuten. Giet de gnocchi af en laat uitlekken.\nStap 6 Bestrijk een ovenschaal met de rest van de olijfolie en leg er de kipfilets in. Kruid met peper en zout. Meng de gnocchi door de tomatensaus en schep rond de kipfilets in de ovenschaal. Leg de plakjes mozzarella bovenop de kipfilets.\nStap 7 Zet de ovenschaal 18 minuten in de voorverwarmde oven."
    }
  ],

  "overig": [
    {
      title: "Kapsalon",
      prep: 15,
      cook: 5,
      ingredients: [
        "700 gram verse Vlaamse friet",
        "verse Vlaamse friet",
        "500 gram shoarmareepjes",
        "100 gram geraspte Goudse belegen kaas 48+",
        "½0.5 komkommer",
        "2 tomaten",
        "100 gram gesneden ijsbergsla",
        "100 ml Turkse knoflooksaus"
      ],
      steps: "Stap 1 Verwarm de oven voor op 200 °C. Bak de frites in ca. 25 min. in de oven goudbruin.\nStap 2 Verhit ondertussen een koekenpan met antiaanbaklaag en bak de shoarma zonder boter of olie in 8 min. bruin en gaar.\nStap 3 Schep de friet in de ovenschaal en schep de shoarma erop. Verdeel de kaasover de shoarma en zet ca. 5 min. in de oven tot de kaas is gesmolten.\nStap 4 Halveer ondertussen de komkommer in de lengte en snijd in plakjes. Snijd de tomaten in dunne plakken\nStap 5 Neem de schaal uit de oven en verdeel de sla, tomaat en komkommer erover. Besprenkel met de knoflooksaus."
    }
  ],
  "italiaans": [
    {
      title: "Tomaten Risotto",
      prep: 40,
      cook: 0,
      ingredients: [
        "150 gr risottorijst",
        "1 ui",
        "1 teen knoflook",
        "verse basilicum",
        "2 eetlepels olie",
        "Scheutje droge witte wijn",
        "300 ml warme groentebouillon (Maggi)",
        "250 gr cherrytomaatjes aan tak",
        "50 gr Parmezaanse kaas",
        "350 ml Tomato Frito saus of tomatensaus",
        "1 burrata ( of mozzarella )"
      ],
      steps: "Stap 1 Verwarm de oven op 200 graden. Snipper de ui en knoflook. Fruit deze aan in een pan met een eetlepel olie. Voeg de risottorijst toe er bak 3 minuutjes mee.\nStap 2 Blus af met de witte wijn. Wacht tot de wijn is opgenomen. Voeg dan de tomatensaus toe en een soeplepel bouillon en roer af en toe door. Doe ondertussen de cherrytomaatjes in een ovenschaal, besprenkel met een beetje olie en bestrooi met een snufje peper en zout en rooster ze 15 minuutjes in de oven of 10 minuten in de Airfryer.\nStap 3 Als de tomatensaus en de eerste schep bouillon is opgenomen voeg je de volgende lepel bouillon toe. Kook de risotto in totaal ca. 25 minuten maar proef tussendoor of hij al gaar is. Hij moet zacht zijn maar nog een kleine bite van binnen. Het kan zijn dat je iets van de bouillon overhoudt of tekort komt.\nStap 4 Rasp de Parmezaanse kaas en roer door de risotto. Roer op het laatst nog een paar blaadjes basilicum er door. Schep de risotto op borden en verdeel de burrata er over. Leg de geroosterde tomaatjes erbij en garneer met basilicum."
    }
  ],
  "streetfood": [
    {
      title: "Riefkoeken",
      prep: 30,
      cook: 0,
      ingredients: [
        "500 gr aardappel grof geraspt",
        "1 ui fijngesnipperd",
        "1 ei",
        "1 el bloem",
        "wat versgemalen zout en peper",
        "snufje nootmuskaat",
        "boter of olie om in te bakken"
      ],
      steps: "Stap 1 Meng de geraspte aardappel met de fijngesnipperde ui, het ei en de bloem goed door elkaar. Breng het geheel op smaak met wat versgemalen zout en peper en nootmuskaat.\nStap 2 Smelt een beetje boter, of verhit de olie, in een ruime koekenpan. Schep drie hoopjes van het aardappelmengsel in de pan en druk ze een wat platter.\nStap 3 Bak de onderkant van de Reibekuchen op middelhoogvuur goudbruin.Draai ze om en bak de andere kant goudbruin. Ga zo door tot het aardappelmengsel op is."
    }
  ],
  "aziatisch": [
    {
      title: "Chinese bami",
      prep: 40,
      cook: 0,
      ingredients: [
        "500 gram mie",
        "4 bouillonblokjes kip",
        "250 gram hamblokjes",
        "1 grote prei in ringen gesneden",
        "4 eieren",
        "1 eetlepel sesamolie",
        "1 eetlepel sojasaus",
        "3 tenen knoflook",
        "Mespuntje gemalen gember",
        "Mespuntje ve-tsin",
        "1 theelepel Witte peper",
        "Wokolie"
      ],
      steps: "Stap 1 Kook de mie in een ruime hoeveelheid water met alle bouillonblokjes, giet het daarna af en spoel na met koud water, zet dit aan de kant\nStap 2 Doe de eieren in een kommetje en klop deze los, snijd de knoflook fijn\nStap 3 Verhit een flinke scheut wokolie in een wokpan en voeg de knoflook toe, fruit deze eventjes aan en giet vervolgens de eieren in de pan, roerbak tot het gaar is\nStap 4 Voeg dan de gesneden prei en hamblokjes toe en roerbak dit 2 minuten mee\nStap 5 Doe de gekookte mie in de pan en breng op smaak met de gember, witte peper, sojasaus, sesamolie en mespuntje ve-tsin en voeg eventueel nog wat zout toe"
    }
  ],
  "aziatisch": [
    {
      title: "Chinese nasi",
      prep: 30,
      cook: 10,
      ingredients: [
        "400 gram witte rijst",
        "250 gram hamblokjes",
        "1 liter kippenbouillon (vers, uit een pot of van een blokje)",
        "3 tenen knoflook, in plakjes gesneden",
        "200 gram diepvries doperwten",
        "1 bosje lente-ui/bosui",
        "1 eetlepel groentebouillonpoeder",
        "6 eieren",
        "½ tot 1 eetlepel sesamolie",
        "½ eetlepel sojasaus",
        "zout en peper naar smaak",
        "50 milliliter olie"
      ],
      steps: "Stap 1 Kook de rijst in kippenbouillon zoals aangegeven op de verpakking. Giet af, spreid uit op een bord of dienblad en laat volledig afkoelen.\nStap 2Snijd de knoflook in plakjes en de lente-ui in ringetjes (wit en groen apart).\nVerhit olie in een wok of koekenpan en bak de knoflook op laag vuur tot knoflookolie. Haal de knoflook uit de pan en bewaar apart als topping.\nStap 3 Bak de hamblokjes in dezelfde pan. Voeg het witte gedeelte van de lente-ui toe en bak kort mee. Doe de afgekoelde rijst erbij en schep goed om. Voeg daarna de doperwten toe.\nStap 4 Voeg de groentebouillonpoeder, sesamolie en sojasaus toe en meng goed door. Kluts de eieren en bak ze apart tot roerei.\nStap 5 Voeg het roerei toe aan de rijst en schep goed door. Meng tot slot het groene gedeelte van de lente-ui erdoor. Serveer met de gefrituurde knoflook als topping."
    }
  ],
  "streetfood": [
    {
      title: "Dorito kip",
      prep: 20,
      cook: 15,
      ingredients: [
        "500 gram kipfilet",
        "1 zak doritos á 185 gram naar smaak",
        "2 eieren (middel)",
        "3 eetlepels bloem"
      ],
      steps: "Stap 1 Verwarm de oven voor op 200 graden boven- en onderwarmte. Snijd de kipfilet in stukjes. Zet 3 bakjes klaar: één met geklutste eieren, één met bloem en één met verkruimelde Doritos. \nStap 2 Wentel de kipstukjes eerst door de bloem, dan door het ei en tot slot door de Doritos. Gebruik één hand voor nat (kip + ei) en de andere hand voor droog (bloem + Doritos).\nStap 3 Leg de kipnuggets op een met bakpapier beklede bakplaat. Herhaal dit tot alle stukjes kip zijn bedekt en klaarliggen.\nStap 4 Bak de nuggets 15–20 minuten in de oven. Controleer of de kip goed gaar is door een stukje open te snijden. Serveer met een sausje naar smaak."
    }
  ],
  "italiaans": [
    {
      title: "Penne met pesto zongedroogde tomaat en rucola",
      prep: 15,
      cook: 10,
      ingredients: [
        "300 gram penne",
        "295 gram zongedroogde tomaten in pot",
        "150 gram rucola",
        "125 gram koelverse pestosaus verde"
      ],
      steps: "Stap 1 Kook de pasta volgens de aanwijzingen op de verpakking. Snijd ondertussen de zongedroogde tomaten in reepjes. Giet de pasta af, laat uitlekken en meng met de tomatenreepjes en 3 eetlepels olie uit de pot.\nStap 2 Schep de pestosaus door de pasta en breng op smaak met peper en eventueel zout. Verdeel de rucola en de pasta over de borden."
    }
  ],
  "aziatisch": [
    {
      title: "Koe loe yuk",
      prep: 30,
      cook: 10,
      ingredients: [
        "500 g varkensvlees (procureur of schouder), in blokjes van ca. 3 cm",
        "1 ei",
        "2 el sojasaus",
        "1 el rijstwijn of sherry (optioneel)",
        "½ tl zout",
        "½ tl peper",
        "100 g maizena",
        "3 el zonnebloemolie (voor in de oven, of meer als je in de pan bakt)",
        "3 el ketchup",
        "2 el rijstazijn (of gewone azijn)",
        "2 el suiker",
        "1 el sojasaus",
        "100 ml water of bouillon",
        "1 el maizena + 2 el water (om te binden)"
      ],
      steps: "Stap 1 Meng het ei, sojasaus, rijstwijn, zout en peper in een kom. Voeg de varkensblokjes toe en laat 20 minuten marineren.Wentel de blokjes door de maizena tot ze goed bedekt zijn.\nStap 2 Verwarm de oven voor op 200°C (boven- en onderwarmte).Leg de vleesblokjes op een bakplaat met bakpapier.Besprenkel of bestrijk licht met olie.Bak 20–25 minuten goudbruin, halverwege omdraaien.\nStap 3 Meng ketchup, azijn, suiker, sojasaus en water in een kommetje.Verhit een klein beetje olie in een wok, bak de paprika en ui kort (optioneel). Voeg ananasstukjes toe.Giet de saus erbij en breng zachtjes aan de kook.Roer het maizena-papje erdoor tot de saus mooi dik wordt.\nStap 4 voeg dit allemaal samen en tast toe"
    }
  ],
  "mexiaans": [
    {
      title: "Nachos",
      prep: 15,
      cook: 20,
      ingredients: [
        "1 zak tortillachips (naturel of cheese)",
        "300 g rundergehakt",
        "1 ui, fijngesnipperd",
        "2 tenen knoflook, fijngehakt",
        "1 rode paprika, in blokjes",
        "1 groene peper (jalapeño of andere), in ringetjes",
        "1 blik tomatenblokjes (400 g) of 200 ml tomatensaus",
        "2 tl paprikapoeder",
        "1 tl komijnpoeder",
        "½ tl chilipoeder (meer naar smaak)",
        "Zout en peper",
        "150 g geraspte kaas (cheddar of jong belegen)",
        "1 el olie"
      ],
      steps: "Stap 1 Bak het gehakt met de ui, knoflook, groene peper en tomaten kort aan in een pan. Voeg de kruiden toe en roer goed door.\nStap 2 Leg de nacho’s in een ovenschaal, verdeel het gehaktmengsel erover en bestrooi met geraspte kaas. Bak 20–25 minuten in de oven op 190°C. Maak af met zure room, guacamole, verse koriander en rode peper."
    }
  ],
  "sauzen": [
    {
      title: "Zoetzure saus",
      prep: 15,
      cook: 0,
      ingredients: [
        "150 ml water",
        "3 el azijn (liefst rijstazijn, anders gewone natuurazijn)",
        "3 el kristalsuiker",
        "3 el ketchup",
        "1 el sojasaus",
        "1 el maizena + 2 el water (om te binden)",
        "Optioneel: ½ rode peper (fijngehakt) of een paar stukjes ananas voor extra smaak"
      ],
      steps: "Stap 1 Doe het water, azijn, suiker, ketchup en sojasaus in een pannetje. Breng dit aan de kook en roer tot de suiker is opgelost.\nStap 2 Roer het maizena-papje (maizena + water) door de saus en laat nog 1–2 minuten zachtjes koken tot de saus mooi indikt.\nStap 3 Proef: wil je het zoeter → extra suiker, zuurder → extra azijn, pittiger → rode peper toevoegen.\nStap 4 Laat iets afkoelen en serveer lauwwarm of koud bij loempia’s"
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
