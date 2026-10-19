# Contract: Page UI

| Element | Selector | Requirements |
|---|---|---|
| Quote text | `#quote-text` inside `<blockquote>` in an `aria-live="polite"` region | Shows `Quote.text` |
| Author | `#quote-author` | Shows `— {author}` |
| New quote button | `#new-quote` (`<button>`) | Visible label "New quote"; click/Enter/Space shows a new pick (FR-003) |
| Favorite toggle | `#favorite` (`<button>`) | `aria-pressed` reflects state; label "Add to favorites" / "Remove from favorites"; icon ☆ / ★ (FR-004) |
| Favorites count | `#favorite-count` | Text "Favorites: N" (FR-006) |
| Storage notice | `#storage-note` | Hidden normally; shows "Favorites can't be saved in this browser" when saving fails (FR-008: informs, never errors) |

No console errors on load or on any interaction (constitution Quality Gates).
