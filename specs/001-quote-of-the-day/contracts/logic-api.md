# Contract: `src/quotes.js` logic API

Exposed as `window.QuoteLogic` (browser) and `module.exports` (Node). All functions are pure
except `loadFavorites` / `saveFavorites`, which only touch the `storage` object passed in.

| Function | Signature | Behavior |
|---|---|---|
| `QUOTES` | `Quote[]` | The built-in collection (frozen) |
| `pickRandomQuote` | `(quotes, random = Math.random, excludeId = null) → Quote` | Picks uniformly among quotes whose `id !== excludeId`; if that leaves none (1-quote collection), returns `quotes[0]` |
| `isFavorite` | `(favorites, id) → boolean` | Whether `id` is in `favorites` |
| `toggleFavorite` | `(favorites, id) → string[]` | Returns a **new** array with `id` added or removed |
| `parseFavorites` | `(raw, quotes) → string[]` | Validates stored JSON per data-model rules; never throws |
| `loadFavorites` | `(storage, quotes) → string[]` | Reads `qotd.favorites`; returns `[]` if storage throws |
| `saveFavorites` | `(storage, favorites) → boolean` | Writes JSON; returns `false` instead of throwing |
| `STORAGE_KEY` | `"qotd.favorites"` | Storage key |
