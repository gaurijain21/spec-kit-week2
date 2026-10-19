# Quickstart & Validation: Quote of the Day

## Prerequisites

- Any modern browser.
- Node.js 18+ (only for automated tests).

## Run

Open `index.html` in a browser (double-click it, or serve the folder with any static server,
e.g. `python -m http.server 8000`).

## Automated tests

```bash
node --test
```

Expected: all tests pass, 0 failures.

## Manual validation (browser)

| # | Steps | Expected | Covers |
|---|---|---|---|
| V1 | Open the page | One quote + author visible immediately; no console errors | FR-001, SC-001 |
| V2 | Reload ~10 times | More than one distinct quote appears | US1-AS2 |
| V3 | Press "New quote" several times (mouse, then Tab + Enter/Space) | Displayed quote is replaced by a pick from the collection | FR-003, FR-007 |
| V4 | Press ☆ | Becomes ★, label "Remove from favorites", count +1 | FR-004, FR-006 |
| V5 | Reload, press "New quote" until the favorited quote returns | Shown as ★; count unchanged after reload | FR-005, SC-002 |
| V6 | Press ★ again, reload | No longer a favorite; count −1 | US3-AS2 |
| V7 | In DevTools set `localStorage['qotd.favorites'] = '{bad'`, reload | Page loads normally with 0 favorites | FR-008, SC-004 |
