# Implementation Plan: Quote of the Day

**Branch**: `001-quote-of-the-day` | **Date**: 2026-10-18 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-quote-of-the-day/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

A single static page shows one random quote from a built-in collection, a "New quote"
button, and a favorite toggle whose state persists across reloads. Built with plain
HTML/CSS/JavaScript and no backend; favorites are stored in `localStorage`. All non-DOM
behavior lives in one pure-logic script (`src/quotes.js`) that is unit-tested with Node's
built-in test runner; `src/app.js` only wires the DOM to that logic.

## Technical Context

**Language/Version**: HTML5, CSS3, JavaScript (ES2020), classic (non-module) scripts

**Primary Dependencies**: None at runtime. Tests use Node.js 18+ built-in `node:test` and
`node:assert` (no npm packages).

**Storage**: Browser `localStorage`, key `qotd.favorites`, value = JSON array of quote ids

**Testing**: `node --test tests/` for logic; manual browser checks from
[quickstart.md](quickstart.md) for DOM behavior

**Target Platform**: Evergreen desktop and mobile browsers; works when `index.html` is
opened directly from disk (`file://`) or served by any static server

**Project Type**: Static single-page web app

**Performance Goals**: Quote visible within 1 s of load (SC-001); no network requests

**Constraints**: No backend, no build step, no frameworks; must not crash when storage is
blocked or corrupted (FR-008)

**Scale/Scope**: 1 page, 12 quotes, 1 visitor per browser

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | How the plan complies | Status |
|---|---|---|
| I. Readable code | Two small scripts with one responsibility each; descriptive function names | PASS |
| II. Testable logic, thin UI | Selection, toggling, counting, and (de)serialization are pure functions in `src/quotes.js`; storage access goes through a `storage` argument that tests replace with a fake | PASS |
| III. Tests pass before done | `node --test tests/` + quickstart browser checklist are the definition of done | PASS |
| IV. Simplicity | No dependencies or build step; tests use only Node built-ins | PASS |
| V. Graceful failure & accessibility | Storage wrapped in try/catch with in-memory fallback; real `<button>`s with `aria-pressed` and an `aria-live` quote region | PASS |

**Post-design re-check (after Phase 1)**: PASS, no violations; Complexity Tracking not needed.

## Project Structure

### Documentation (this feature)

```text
specs/001-quote-of-the-day/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
│   ├── logic-api.md     # Functions exported by src/quotes.js
│   └── ui-contract.md   # Elements, labels, and states of the page
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
index.html          # Markup; loads src/quotes.js then src/app.js
src/
├── styles.css      # Layout and favorite-state styling
├── quotes.js       # Pure logic + quote data (browser global + CommonJS export)
└── app.js          # DOM wiring only
tests/
└── quotes.test.js  # node:test unit tests for src/quotes.js
```

**Structure Decision**: Single static project at the repository root, so opening
`index.html` is all a user needs. Logic and UI are split per Principle II.

## Complexity Tracking

No constitution violations; nothing to justify.
