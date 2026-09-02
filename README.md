# KSite — Kietel Site

KSite is een uitgebreide educatieve GitHub Pages-website over tast,
zenuwen, hersenverwerking, reflexen, lachen, individuele verschillen,
voorspelling, gewenning en persoonlijke grenzen.

De website is gebouwd als een volledig statische applicatie.
Er is dus geen lokale webserver nodig om de basisversie te gebruiken.

---

## Projectdoel

KSite heeft drie hoofddoelen:

1. Wetenschappelijke onderwerpen begrijpelijk uitleggen.
2. Leren interactiever maken met XP, levels, quizzen en badges.
3. Een moderne demo laten zien die direct op GitHub Pages kan draaien.

---

## Belangrijkste pagina's

### `index.html`

De uitgebreide homepage bevat:

- Een grote hero-sectie.
- Een interactieve signaalvisualisatie.
- Statistiekkaarten.
- Vier hoofdroutes door de website.
- Basisinformatie over tast.
- Een stappenoverzicht van huid naar hersenen.
- Feit-of-fabelkaarten.
- Een sectie over grenzen en toestemming.
- Een live profielpreview.
- Call-to-action onderdelen.
- Een uitgebreide footer.

---

### `ontdek.html`

De kennisbank bevat:

- Zoekfunctie.
- Onderwerpen over huidreceptoren.
- Informatie over zenuwbanen.
- Hersenverwerking.
- Reflexen.
- Lichte aanraking.
- Aandacht.
- Voorspelling.
- Gewenning.
- Grenzen en toestemming.
- Een overzichtstabel.
- Verdiepende uitleg.
- Feiten en fabels.

---

### `lessen.html`

De lessenpagina bevat:

- Acht educatieve modules.
- Zoekfunctie.
- Categorie-filters.
- XP-beloningen.
- Lesduur.
- Lokale voortgang.
- Plus-locks.
- Leerpadfasen.
- Studiehulp.
- Een speciale sectie over grenzen.

De huidige modules zijn:

1. De basis van tast.
2. Zenuwen en signalen.
3. Hoe je brein aanraking verwerkt.
4. Reflexen en reacties.
5. Waarom mensen soms lachen.
6. Waarom iedereen anders reageert.
7. Voorspelling in het brein.
8. Grenzen en toestemming.

---

### `quiz.html`

De quiz bevat:

- Acht vragen.
- Vier antwoorden per vraag.
- Feedback na elk antwoord.
- Correct- en incorrect-states.
- Voortgangsbalk.
- Live score.
- Eindscore.
- XP-beloning.
- Beste score.
- Aantal pogingen.
- Opnieuw-startfunctie.

---

### `profiel.html`

Het profiel bevat:

- Aanpasbare weergavenaam.
- XP-overzicht.
- Leveloverzicht.
- Afgeronde lessen.
- Levelprogressie.
- Leerstreak.
- Plus-status.
- Acht badges.
- Uitleg over lokale opslag.
- Resetknop voor voortgang.

De badges zijn:

- Starter.
- Learner.
- Scholar.
- Quizzer.
- Streak.
- Plus.
- Expert.
- Compleet.

---

### `plus.html`

De Plus-pagina is een demo-abonnementspagina.

Functies:

- Plus-status.
- Activatieknop.
- Functievergelijking.
- Visuele prijskaarten.
- Extra modules.
- Plus Dashboard.
- Extra badge.
- Verdiepende leerfuncties.
- FAQ.
- Uitleg over localStorage.

Belangrijk:

Er wordt geen echte betaling uitgevoerd.
De huidige Plus-versie is alleen een lokale frontend-demo.

---

### `plus-dashboard.html`

Het Plus Dashboard bevat:

- Toegangscontrole.
- Dashboard-sidebar.
- Levelkaart.
- XP-kaart.
- Leskaart.
- Levelprogressie.
- Leerstreak.
- Demo-activiteitsgrafiek.
- Plus-modules.
- Aanbevolen acties.
- Leerinzichten.
- Instellingen.
- Plus-deactivatie.

---

## CSS

Alle styling staat in:

`assets/css/style.css`

Het stylesheet bevat onder andere:

- CSS custom properties.
- Dark mode.
- Light mode.
- Responsive container.
- Topbar.
- Desktopnavigatie.
- Mobiele navigatie.
- Buttons.
- Cards.
- Hero layouts.
- Grid layouts.
- Dashboard layouts.
- Quiz styles.
- Profiel styles.
- Badges.
- Pricing cards.
- Tabellen.
- Form inputs.
- Zoekvelden.
- Filters.
- Toastmeldingen.
- Reveal animations.
- Responsive breakpoints.
- Reduced motion ondersteuning.

---

## JavaScript

De hoofdlogica staat in:

`assets/js/app.js`

Belangrijke systemen:

- Theme manager.
- Mobiel menu.
- Reveal observer.
- XP manager.
- Levelberekening.
- Lesvoortgang.
- Plus-status.
- Quizengine.
- Quizresultaten.
- Profielnaam.
- Badge-unlocks.
- Leerstreak.
- Kennisbankzoeker.
- Lesfilters.
- Dashboard charts.
- Toastmeldingen.
- LocalStorage helpers.

---

## LocalStorage keys

KSite gebruikt onder andere:

- `ksite.theme`
- `ksite.xp`
- `ksite.completedLessons`
- `ksite.quizBest`
- `ksite.quizRuns`
- `ksite.plus`
- `ksite.displayName`
- `ksite.streak`
- `ksite.lastVisit`

---

## XP systeem

XP wordt verdiend via activiteiten.

Voorbeelden:

- Een module afronden.
- Quizvragen goed beantwoorden.

Elke 250 XP levert een nieuw level op.

De berekening gebeurt volledig in JavaScript.

---

## Plus demo

De demo werkt met:

```text
localStorage["ksite.plus"] = "true"
```

Dit is geschikt voor een frontendprototype.

Het is niet geschikt als beveiliging voor een echt betaald abonnement.

Een gebruiker kan browserdata zelf aanpassen.
Daarom moet een echte abonnementstatus altijd server-side worden gecontroleerd.

---

## Toekomstige echte accounts

Voor echte accounts kan later bijvoorbeeld worden toegevoegd:

- Een beveiligde backend.
- Database-authenticatie.
- Sessies.
- Server-side autorisatie.
- Een betaalprovider.
- Webhooks voor betalingen.
- Account recovery.
- E-mailverificatie.
- Databaseprofielen.
- Cloud-sync van voortgang.

---

## GitHub Pages

Open in GitHub:

`Settings → Pages`

Kies daarna:

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/ (root)`

GitHub Pages zal vervolgens automatisch `index.html` openen.

---

## Projectstructuur

```text
KSite/
├── README.md
├── index.html
├── ontdek.html
├── lessen.html
├── quiz.html
├── profiel.html
├── plus.html
├── plus-dashboard.html
└── assets/
    ├── css/
    │   └── style.css
    └── js/
        └── app.js
```

---

## Ontwerpprincipes

KSite gebruikt een aantal vaste ontwerpregels.

### Consistentie

Alle pagina's gebruiken dezelfde:

- Navigatie.
- Typografie.
- Kleuren.
- Buttons.
- Cards.
- Footer.
- Spacing.

### Responsive design

De website is ontworpen voor:

- Desktop.
- Laptop.
- Tablet.
- Mobiel.

### Toegankelijkheid

Er is rekening gehouden met:

- Semantische HTML.
- Labels op zoekvelden.
- Toetsenbordvriendelijke buttons.
- `aria-live` voor meldingen.
- `prefers-reduced-motion`.
- Duidelijke contrasten.

---

## Educatieve grenzen

KSite behandelt aanraking informatief en respectvol.

Belangrijke uitgangspunten:

- Mensen verschillen in gevoeligheid.
- Automatische reacties zijn niet hetzelfde als toestemming.
- Een nee- of stopsignaal betekent stoppen.
- De site is educatief en geen medisch advies.
- Er wordt geen universele gevoeligheidskaart als absolute waarheid gepresenteerd.

---

## Browserondersteuning

De website gebruikt moderne webtechnieken.

Aanbevolen browsers:

- Chrome.
- Edge.
- Firefox.
- Safari.

Voor de beste ervaring is een recente browserversie aanbevolen.

---

## Geen build step

Er is geen:

- Node.js nodig.
- npm nodig.
- bundler nodig.
- framework nodig.
- buildcommando nodig.

Alle bestanden kunnen direct worden gepubliceerd.

---

## Development

Wijzigingen kunnen direct in de bestanden worden gemaakt.

Bijvoorbeeld:

1. Pas `index.html` aan.
2. Pas `assets/css/style.css` aan.
3. Pas `assets/js/app.js` aan.
4. Commit naar `main`.
5. GitHub Pages publiceert de nieuwe versie.

---

## Versie

Huidige grote herbouw:

**KSite 2.0**

Deze versie bevat:

- Een uitgebreid design system.
- Grote multi-page architectuur.
- Interactieve quiz.
- XP en levels.
- Lesvoortgang.
- Profiel.
- Badges.
- Plus demo.
- Plus Dashboard.
- Kennisbank.
- Responsive design.
- Dark/light mode.

---

## Laatste opmerking

KSite is bewust opgezet als een grote,
leesbare en uitbreidbare codebase.

HTML, CSS en JavaScript staan netjes op afzonderlijke regels,
zodat de repository makkelijk verder uitgebreid en onderhouden kan worden.
