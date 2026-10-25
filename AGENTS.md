# Projekt: <Cookeroo>

Erstellen, Verawlten von Rezepten. Wochenplanung für gerichte (Frühstück-, Mittag- und Abendessen).

## Struktur (Monorepo)

```
backend/    Node.js + Express + MongoDB (Mongoose)
frontend/   Vue 3 + Vite
```

- Backend: `src/routes` (HTTP, dünn) → `src/services` (Geschäftslogik) → `src/models` (Mongoose-Schemas)
- Frontend: `src/components`, `src/views`, `src/composables`, `src/stores` (Pinia), `src/api` (HTTP-Client)

## Befehle

Backend (`cd backend`):

- Dev-Server: `npm run dev`
- Tests: `npm test` (einzelne Datei: `npm test -- <pfad>`)
- Lint: `npm run lint`

Frontend (`cd frontend`):

- Dev-Server: `npm run dev`
- Tests: `npm test`
- Lint + Typecheck: `npm run lint && npm run typecheck`
- Build: `npm run build`

Nach jeder Änderung: Tests und Lint des betroffenen Teils ausführen und Fehler selbst beheben, bevor du die Aufgabe als erledigt meldest.

## Backend-Konventionen

- Routes enthalten keine Geschäftslogik, nur Request/Response-Handling. Logik gehört in `services/`.
- Eingaben immer validieren (<zod / joi / express-validator>), bevor sie die Service-Schicht erreichen.
- Fehler über die zentrale Error-Middleware behandeln (`next(err)`), kein `res.status(500)` in Routes.
- `async/await` statt Callbacks oder `.then()`-Ketten.
- Mongoose: Schemas mit Validierung und Indizes definieren. Bei Listen immer `.lean()` und Pagination nutzen. Keine ungefilterten `find({})` auf großen Collections.
- Keine Secrets im Code. Konfiguration nur über Umgebungsvariablen (`.env`, nie committen).
- Passwörter nur gehasht speichern, keine sensiblen Daten in Logs.
