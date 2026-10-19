# Research: Quote of the Day

## R1. Script loading that works from `file://`

- **Decision**: Use classic `<script>` tags (not `type="module"`). `src/quotes.js` exposes its
  API as `window.QuoteLogic` in the browser and via `module.exports` under Node.
- **Rationale**: Browsers block ES module scripts loaded from `file://` (CORS), so a module
  build would only work behind a server. A tiny dual-export guard keeps one source file
  testable in Node with zero tooling.
- **Alternatives considered**: ES modules + a dev server (adds a setup step); a bundler
  (violates Principle IV).

## R2. Testing without dependencies

- **Decision**: Node's built-in test runner (`node --test`) with `node:assert/strict`.
- **Rationale**: Stable since Node 18, one command, no `package.json` dependencies.
- **Alternatives considered**: Jest/Vitest (npm install required); browser-only manual tests
  (would not satisfy Principle II).

## R3. Persisting favorites

- **Decision**: `localStorage` key `qotd.favorites` holding a JSON array of quote ids. Every
  read and write is wrapped in try/catch; on any failure the app keeps favorites in memory
  for the current visit.
- **Rationale**: Required by the user's plan input; ids (not quote text) survive text edits;
  try/catch covers Safari private mode, blocked storage, quota errors, and invalid JSON.
- **Alternatives considered**: Cookies (sent with requests, awkward API); IndexedDB
  (asynchronous and heavier than needed).

## R4. Randomness and testability

- **Decision**: Selection functions accept an optional `random` function (default
  `Math.random`) so tests can make choices deterministic.
- **Rationale**: Random behavior is otherwise untestable.
- **Alternatives considered**: Seeded PRNG library (unnecessary dependency).

## R5. Accessible favorite toggle

- **Decision**: A `<button>` with `aria-pressed="true|false"`, a label that changes between
  "Add to favorites" and "Remove from favorites", and a visible ★/☆ icon. The quote is in an
  `aria-live="polite"` region so screen readers announce new quotes.
- **Rationale**: Standard toggle-button pattern; satisfies FR-004 and FR-007.

## R6. Test command (amended during implementation)

- **Decision**: Run tests with plain `node --test`, which auto-discovers `**/*.test.js`.
- **Rationale**: The original plan said `node --test tests/`. On Node 22 that fails with
  `Cannot find module '.../tests'`, because a directory is no longer accepted as a test path.
- **Alternatives considered**: `node --test tests/*.test.js` (depends on the shell expanding
  globs, which differs between bash and PowerShell).
