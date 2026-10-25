# Kontext für die KI

## Worum geht es in diesem Projekt?

**`hier kommt die Projectbeschreibung hin.`**
Nutzer melden sich an (Access- und Refresh-Token).

## Tech-Stack

Vite, Vue 3 (JavaScript, kein TypeScript), PrimeVue v4, Pinia, axios, Vitest.

## Projektstruktur

```
src/
├── app/        # app-wide parts: layouts, central router, config
├── features/   # Ein Verzeichnis pro feature (Details: src/features/AGENTS.md)
└── shared/     # Wiederverwendbarer, app-unabhängiger code: api client, styles, ...
```

- Neue Features entstehen durch Kopieren von `src/features/_example/`.
- Zentrale Konfiguration: `src/app/config/config.js`. Layouts liegen in `src/app/layouts/`.
- Code, der von mehreren Features genutzt wird, kommt nach `src/shared/`.
- Globale Styles und Design-Tokens: `src/shared/styles/`.

## Konventionen

- Kommentare immer auf Englisch.
- Vue 3 mit Composition API und `<script setup>`, keine Options API.
- Named Exports sind der Standard. Default Exports nur bei `.vue`-Dateien und Tool-Konfigurationen.
- Barrel-Dateien (`index.js`) nur in `src/shared/*` und als öffentliche Schnittstelle eines Features.
- Umgebungswerte nur in `src/app/config/config.js` aus `import.meta.env.VITE_*` lesen. Im restlichen Code ausschließlich `appConfig.<name>` (camelCase) verwenden, nie direkt `import.meta.env`.
- Umgebungsdateien: `.env.development`, `.env.production`, lokale Überschreibungen in `*.local` (nicht committen). Neue Variablen immer auch in `.env.example` eintragen.
- PrimeVue-Komponenten bevorzugen, bevor eigene gebaut werden.
- Neue Dependencies nur nach Rückfrage.
- Bestehende Muster im Code nachahmen, bevor neue eingeführt werden.
- Kleine, fokussierte Änderungen. Kein unaufgefordertes Refactoring in anderen Bereichen.

## Befehle

- Dev-Server: `npm run dev`
- Tests: `npm test`
- Build: `npm run build`

Nach jeder Änderung Tests ausführen und Fehler selbst beheben, bevor eine Aufgabe als erledigt gilt.

## Bekannte Stolperfallen / nicht tun

- PrimeVue v4 unterscheidet sich von v3. Beispiele und Doku aus v3 nicht übernehmen. Das Theming läuft über Presets, nicht über CSS-Theme-Dateien.
- Auth: Der Access-Token liegt nur im Pinia-State (Speicher), niemals in `localStorage` oder `sessionStorage`. Der Refresh-Token ist ein `httpOnly`-Cookie und für JavaScript unsichtbar.
- `src/shared/` importiert nie aus `src/features/`. Auth-Verhalten wird dem HTTP-Client über `configureAuthHooks()` übergeben.
- Pinia-Stores in Komponenten nie destrukturieren, immer `store.<name>` verwenden.
- Keine festen Farben, Abstände oder Schriftgrößen in Komponenten, nur Tokens aus `src/shared/styles/tokens/`.
- Keine API-Aufrufe in Komponenten (siehe `src/features/AGENTS.md`).

## Offene Fragen / Entscheidungen

Bei diesen Punkten nicht selbst entscheiden, sondern nachfragen:

- Welche Endpunkte bietet das Backend für Auth, und was liefert `/auth/login` zurück?
- Gibt es Rollen oder Berechtigungen?
- Soll TypeScript eingeführt werden?
