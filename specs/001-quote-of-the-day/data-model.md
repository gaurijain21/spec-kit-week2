# Data Model: Quote of the Day

## Quote

| Field | Type | Rules |
|---|---|---|
| `id` | string | Unique, stable, kebab-case (e.g. `"maya-angelou-1"`); never reused |
| `text` | string | Non-empty |
| `author` | string | Non-empty |

The collection is a constant array of 12 quotes in `src/quotes.js` (FR-002: at least 10).

## Favorites

- An ordered list of unique quote ids, stored as JSON under `localStorage["qotd.favorites"]`.
- **Validation on load**: if the value is missing, not valid JSON, or not an array, treat it
  as empty. Drop entries that are not strings or are not ids in the current collection;
  remove duplicates.
- **State transitions** (per quote): `not favorite` ⇄ `favorite` via `toggleFavorite`.

## In-memory app state (`src/app.js`)

| Field | Meaning |
|---|---|
| `current` | The Quote currently displayed |
| `favorites` | Array of favorite ids (source of truth for the current visit) |
| `storageAvailable` | Whether the last save to `localStorage` succeeded |
