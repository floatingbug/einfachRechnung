# Features

Diese Regeln gelten für alles unter `src/features/`. Der Code ist nach Features organisiert, jedes Feature ist in sich geschlossen.

## Vorlage für neue Features

Die Vorlage ist `src/features/_example/`. Neue Features entstehen durch Kopieren und Umbenennen dieser Vorlage, nicht durch Neuerfinden. Die Umbenennungsschritte stehen in `src/features/_example/AGENTS.md`. Diese Datei vor dem Kopieren lesen.

## Aufbau eines Features

```
src/features/<feature>/
├── api/
│   └── <feature>Api.js
├── services/
│   └── <feature>Service.js
├── store/
│   ├── use<Feature>Store.js
│   └── actions/             # one file per action
├── router/
│   └── index.js             # exports <feature>Routes
└── ui/
    ├── components/          # used only in this feature
    └── views/               # pages mounted by the router
```

Nur die Schichten anlegen, die das Feature wirklich braucht. Keine leeren Ordner.

## Regeln pro Schicht

- **api/**: Nur HTTP-Aufrufe, immer über den zentralen Client (`import { http } from "@/shared/api/http-client"`), nie direkt `fetch` oder `axios`. Der Client liefert ein Antwortobjekt, deshalb gibt jede Funktion `.data` zurück. Keine Geschäftslogik, kein Zugriff auf Stores oder Komponenten.
- **services/**: Geschäftslogik und Datenaufbereitung (Validierung, Mapping). Kein direktes HTTP, keine Vue-Komponenten. Ruft bei Bedarf `api/` auf. Als Objekt exportiert, z. B. `exampleService.getItems()`.
- **store/**: Pinia Setup-Store (`defineStore` mit Funktion). Der Store hält State (`ref`) und bindet Actions ein. State wird nur in Actions geändert. Jede Action liegt als eigene Datei in `store/actions/`, ist eine Named-Export-Funktion und bekommt die Store-Instanz als ersten Parameter. Der Store ruft Services auf, nie `api/` direkt.
- **router/index.js**: Exportiert die Routen als Named Export `<feature>Routes`. Views per Lazy Import laden (`() => import(...)`). Eingebunden werden sie im zentralen Router unter `src/app/router/`.
- **ui/views/**: Seiten, die der Router einbindet. Sie halten Store-Zugriff und Zustandslogik, das Markup bleibt dünn. Jede View deckt vier Zustände ab: Laden, Fehler, leer, Inhalt.
- **ui/components/**: Nur Komponenten, die ausschließlich dieses Feature nutzt. Reine Darstellung: Props rein, Events raus, kein Store-Zugriff. Formulare und Listen, die mehr als ein, zwei Zeilen Markup umfassen, hierhin auslagern. Werden sie von mehreren Features gebraucht, gehören sie nach `src/shared/`.
- Fehler aus API-Aufrufen in Store-Actions immer mit `toApiError(err)` aus `@/shared/api/toApiError` umwandeln, bevor sie in `store.error` landen. Im Template `store.error.message` anzeigen.
- Alle öffentlichen Auth-Seiten (Sign-in, Sign-up, Passwort vergessen/zurücksetzen) verwenden `AuthLayout.vue` aus `features/auth/ui/components/`. Views enthalten nur ihren eigenen Inhalt, keine eigene Zentrierung oder Card.
- Feature-interne Prüfhelfer liegen als `validation.js` in `services/`. Werden sie von mehreren Features gebraucht, nach `src/shared/utils/` verschieben.

## Datenfluss

Komponente → Store → Service → API

Eine Schicht ruft nur die direkt darunterliegende auf. Keine Abkürzungen, zum Beispiel keine API-Aufrufe in Komponenten.

## Pinia in Komponenten

- Den Store immer über `store.<name>` ansprechen (z. B. `store.loading`, `store.items`).
- Den Store nie destrukturieren, dabei geht die Reaktivität verloren.
- `storeToRefs` wird nicht verwendet.
- Actions direkt am Store aufrufen (`store.loadItems()`).

## Styles

- Ausschließlich Tokens aus `src/shared/styles/tokens/` verwenden (`var(--space-4)`, `var(--color-text)` usw.).
- Keine festen Farben, Abstände, Schriftgrößen, Radien oder z-index-Werte in Komponenten.
- Fehlt ein Token, zuerst im passenden Token-File ergänzen und dann verwenden.
- Strukturwerte wie `0`, `100%`, `auto` und `1px` für Rahmen sind erlaubt.

## Imports und Exports

- Named Exports sind der Standard. Default Exports nur bei Vue-Komponenten (`.vue`).
- Innerhalb eines Features direkt aus der Datei importieren, keine `index.js`-Barrel-Dateien.
- Andere Features nur über eine öffentliche Schnittstelle (`src/features/<feature>/index.js`) ansprechen, falls vorhanden. Nicht ins Innenleben (`store/`, `services/`, `api/`) eines anderen Features greifen.
- Gemeinsam genutzter Code kommt nach `src/shared/`. Muss ein Feature ein anderes ansprechen, vorher nachfragen.

## UI

- PrimeVue-Komponenten bevorzugen, bevor eigene gebaut werden.
- Kommentare im Code auf Englisch.
