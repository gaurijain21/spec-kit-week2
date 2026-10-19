---

description: "Task list for Quote of the Day"
---

# Tasks: Quote of the Day

**Input**: Design documents from `/specs/001-quote-of-the-day/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Included. Constitution Principle II requires automated tests for all non-DOM logic.

**Organization**: Tasks are grouped by user story so each story can be implemented and tested independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)

## Phase 1: Setup (Shared Infrastructure)

- [ ] T001 Create `index.html`, `src/`, and `tests/` per plan.md project structure
- [ ] T002 [P] Add `README.md` with run and test commands from quickstart.md

---

## Phase 2: Foundational (Blocking Prerequisites)

- [ ] T003 Create `src/quotes.js` with the dual browser/CommonJS export guard (research R1) and the frozen `QUOTES` collection of 12 quotes with stable ids (data-model.md, FR-002)
- [ ] T004 [P] Create `tests/quotes.test.js` with a test that `QUOTES` has ≥10 entries, unique ids, and non-empty text/author

**Checkpoint**: `node --test tests/` runs and passes

---

## Phase 3: User Story 1 - See a quote when the page opens (Priority: P1) 🎯 MVP

**Goal**: One random quote and its author visible on load.

**Independent Test**: Quickstart V1–V2.

- [ ] T005 [US1] Add tests for `pickRandomQuote` in `tests/quotes.test.js` (deterministic `random` stub picks first/last item; result always in collection)
- [ ] T006 [US1] Implement `pickRandomQuote(quotes, random)` in `src/quotes.js` per contracts/logic-api.md
- [ ] T007 [US1] Build markup in `index.html` per contracts/ui-contract.md (live region, `#quote-text`, `#quote-author`) and base styles in `src/styles.css`
- [ ] T008 [US1] In `src/app.js`, render a random quote on `DOMContentLoaded`

**Checkpoint**: US1 works on its own

---

## Phase 4: User Story 2 - Get a new quote on demand (Priority: P2)

**Goal**: "New quote" button replaces the displayed quote.

**Independent Test**: Quickstart V3.

- [ ] T009 [US2] Add `<button id="new-quote">New quote</button>` to `index.html`
- [ ] T010 [US2] Wire click handler in `src/app.js` to pick and render a new quote

**Checkpoint**: US1 + US2 work

---

## Phase 5: User Story 3 - Favorite a quote and keep it after reload (Priority: P3)

**Goal**: Toggle favorites; state and count persist across reloads; storage failures degrade gracefully.

**Independent Test**: Quickstart V4–V7.

- [ ] T011 [US3] Add tests for `isFavorite`, `toggleFavorite` (add, remove, returns new array), `parseFavorites` (missing, invalid JSON, non-array, unknown ids, duplicates), `loadFavorites`/`saveFavorites` with a fake storage and a throwing storage
- [ ] T012 [US3] Implement `isFavorite`, `toggleFavorite`, `parseFavorites`, `loadFavorites`, `saveFavorites`, `STORAGE_KEY` in `src/quotes.js`
- [ ] T013 [US3] Add `#favorite` toggle button, `#favorite-count`, and hidden `#storage-note` to `index.html`; ★/☆ pressed styles in `src/styles.css`
- [ ] T014 [US3] In `src/app.js`, load favorites on start, render `aria-pressed`/label/icon/count for the current quote, toggle + save on click, and show `#storage-note` if saving fails

**Checkpoint**: All stories work independently

---

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T015 [P] Run `node --test tests/` and every quickstart.md manual check (V1–V7) in a real browser; confirm no console errors
- [ ] T016 [P] Review code against constitution Principles I–V and Quality Gates (style, no dead code, accessible names)

---

## Dependencies & Execution Order

- Setup (T001–T002) → Foundational (T003–T004) → US1 (T005–T008) → US2 (T009–T010) → US3 (T011–T014) → Polish (T015–T016)
- US2 and US3 depend only on Foundational + the rendering from T008.
- Within each story, tests are written before the implementation they cover.

## Parallel Example

```text
T002 (README) ∥ T004 (collection test)
T015 (validation) ∥ T016 (constitution review)
```

## Implementation Strategy

MVP = Phases 1–3 (a page that shows a random quote). Then add US2 and US3 incrementally, running the test suite and the matching quickstart checks after each phase.
