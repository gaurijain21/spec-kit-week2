# Quote of the Day

A small static page that shows a random quote, a **New quote** button, and favorites that
persist across reloads. Built spec-first with [GitHub Spec Kit](https://github.com/github/spec-kit);
the spec artifacts are in [`specs/001-quote-of-the-day/`](specs/001-quote-of-the-day/) and the
constitution is in [`.specify/memory/constitution.md`](.specify/memory/constitution.md).

## Run

Open `index.html` in a browser. No server or build step needed.

## Test

```bash
node --test
```

Requires Node.js 18+. Manual browser checks are listed in
[`specs/001-quote-of-the-day/quickstart.md`](specs/001-quote-of-the-day/quickstart.md).
