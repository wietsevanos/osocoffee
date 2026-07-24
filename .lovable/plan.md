# Branding refinement, brandbook-aligned

Layout en structuur blijven zoals ze zijn. Focus: kleurgebruik, typografie-verhouding en OSO-beertje speels laten terugkomen. Alle wijzigingen zitten in `src/styles.css` en `src/routes/index.tsx`.

## 1. Kleuren opnieuw ijken op brandbook

Officiele palette (hex-locked) in `src/styles.css`:
- Pastry Cream `#F3F1E1`, warme rustige basis, hoofd-achtergrond
- Black Coffee `#181613`, primaire tekstkleur
- Funky Blue `#1A3F90`, accent
- Espresso Brown `#6F3F1F`, accent
- Butter Yellow `#E9DA94` (brandbook-hex, huidige `#E9D94A` is te fel/geel, corrigeren)

Toepassingsregels, afgeleid uit brandbook hoofdstuk 3:
- Body-achtergrond: Pastry Cream. Losse secties krijgen om beurten een accent-achtergrond zodat geen enkele kleur dominant wordt:
  - Hero, About, Space, Visit: Pastry Cream
  - Marquee-strip: Funky Blue met cream typografie
  - "In motion" videosectie: Espresso Brown met cream tekst
  - "In their words" quote: Butter Yellow met Black Coffee tekst
  - "Say hello" / CTA-blok: Black Coffee met cream tekst + kleine blue/yellow accenten
  - Careers-cards: cream op Espresso Brown fond, één card met Butter Yellow highlight
- Body text: Black Coffee (niet espresso), voor langere teksten. Espresso Brown alleen voor kop-accenten, iconen, cijfers (01, 02, ...) en rules.
- Eyebrows/tags: wisselen tussen Funky Blue en Espresso Brown afhankelijk van sectie-achtergrond.
- Menu "Coming soon" pill: Butter Yellow met Black Coffee tekst.
- Verwijder de huidige gele als "highlight" op cream (te schreeuwerig); yellow enkel op donkere fond of als kleine dot/pill.
- Links en hover-underlines: Funky Blue.

Design tokens die toegevoegd/gewijzigd worden:
- `--yellow: #E9DA94` (was `#E9D94A`)
- Nieuwe util-classes waar nodig: `bg-blue`, `bg-yellow` (bestaan), `text-blue`, `text-yellow`; alle hardcoded hex-referenties in componenten verwijderen ten gunste van tokens.
- Sectiepatroon documenteren als comment bovenaan `styles.css`.

## 2. Beertje-mascot vaker, maar subtiel

Assets zijn al aanwezig: `bear-yellow.svg` (outlined), `bear-brown.png` (colored).

Plaatsingen (gecontroleerd, klein, speels):
- Hero: klein outlined beertje (blue tint via CSS mask/filter) linksonder bij scroll-indicator, ~48px.
- Marquee: beertje-icoon tussen elke frase (in plaats van bullet-dot).
- About sectie 01: colored beertje als klein decoratief element naast de section-nummer, ~40px.
- Menu 02: outlined beertje in de "Coming soon" card, speels boven de kop.
- In motion 04: klein colored beertje overlay linksboven de video (playful, brandbook "logo over image" regel).
- In their words 08: colored beertje als klein signature-element onder de attributie.
- Instagram 09: beertje-watermark subtiel in hoek van 1 van de 6 tegels op hover.
- Footer: bestaande blijft.

Regels: max één beertje per sectie, altijd klein (32-56px), nooit als hoofd-visual, nooit boven leestekst.

## 3. Typografie: Horus terug in zijn hok

Brandbook: Hanken Grotesk is primair (SemiBold=emphasis, Regular=headers, Light=body). Horus alleen voor grote karaktervolle headers en korte quotes.

Wijzigingen in `src/routes/index.tsx`:
- Alle huidige `font-script` (Horus) toepassingen inventariseren en reduceren tot:
  1. Één woord/regel in de hero (bijv. "cozy" of "oso") als karakterstatement
  2. De opening-quote glyph in "In their words"
  3. Eén korte in-line quote-regel ("The homemade tostadas are so good") in italic Horus
  4. Section-label "say hello" of "visit" mag Horus krijgen, klein
- Overal elders: script vervangen door Hanken Grotesk in de juiste weight.
- Section-nummers (01-10), eyebrows, menu-items, body-copy, CTA's, footer-lijstjes: allemaal Hanken Grotesk.
- Weights bijsturen in `styles.css`:
  - `.text-display` blijft Hanken Light met tight tracking (headers).
  - Nieuwe util `.text-emphasis` op SemiBold voor accent-woorden binnen paragrafen.
  - Body default op Light (300) voor lange teksten, zoals brandbook voorschrijft.
- Horus font-size limiteren: nergens groter dan de omringende Hanken-header; als accent-woord binnen een Hanken-header een fractie kleiner dan de omringende letters.

## 4. Kleine begeleidende poets

- Marquee: cream-op-blue variant zodat het strip echt "brand" voelt.
- Eyebrow-formaat consistent (24em letter-spacing, 0.72rem) blijft.
- CTA-knoppen: primair op Funky Blue met cream tekst; secundair outlined Espresso Brown.
- Menu "Coming soon" chip: pill met Butter Yellow + Black Coffee tekst en klein beertje.

## Technische samenvatting

Files:
- `src/styles.css`: yellow token corrigeren, comment met sectie-kleur-patroon, `.text-emphasis` util, body font-weight naar 300, Horus max-size guardrail via `.font-script { font-size: 0.9em; }` als basis waar het inline gebruikt wordt.
- `src/routes/index.tsx`: sectie-achtergronden herverdelen volgens patroon, alle inline hex/kleuren mappen op tokens, Horus-gebruik terugbrengen tot 3-4 plekken, beertjes op de genoemde plekken toevoegen via bestaande imports.

Niet aangeraakt: `index.html`, routing, audio player, video sectie-logica, layout-grids, sectie-volgorde en -nummering.
