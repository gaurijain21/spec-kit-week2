# Week 2 Writeup

For this week I built the quote-of-the-day page using Spec Kit (specify-cli v1.2.1) with
Claude as my coding agent. I set it up with:

```bash
uv tool install specify-cli
specify init spec-kit-week2 --integration claude --script py
```

The `claude` integration puts the `/speckit-*` skills in `.claude/skills/`. I picked the
Python scripts option (`--script py`) since I'm on Windows and didn't want to deal with
bash vs PowerShell issues.

I committed after every stage so the history shows the order things happened in. The final
result: the page works, `node --test` passes 11/11, and the last converge run says
Converged.

## Prompts I used

**`/speckit-constitution`**
> Create principles focused on code quality, testing, and maintainability.

This gave me 5 principles. The one that ended up mattering most was "Testable Logic, Thin
UI". It basically forced all the quote/favorites logic into `src/quotes.js` so it could be
tested without a browser, with `src/app.js` just hooking it up to the page.

**`/speckit-specify`**
> A quote-of-the-day page: one random quote from a built-in list, a "New quote" button,
> and favoriting that persists across reloads.

This created `specs/001-quote-of-the-day/spec.md` with 3 user stories (see a quote, get a
new one, favorite it), 8 functional requirements, and some edge cases like storage being
blocked. The quality checklist passed on the first try.

**`/speckit-plan`**
> Use plain HTML/CSS/JavaScript, no backend; persist favorites in localStorage.

This produced the plan plus `research.md`, `data-model.md`, two contracts and
`quickstart.md`. While reviewing it I noticed one thing worth calling out: it uses regular
`<script>` tags instead of ES modules, because Chrome blocks module scripts when you open a
file straight from disk. I wanted to be able to just double-click `index.html`, so that was
the right call.

**`/speckit-tasks`**, **`/speckit-implement`**, and **`/speckit-converge`** I ran with no
extra arguments. Tasks gave 16 tasks (T001–T016) split by user story. I ended up running
converge three times (more on that below).

## Where I had to fix the spec/plan

**1. The test command in the plan was wrong.** The plan said to run tests with
`node --test tests/`. When I actually ran it on Node 22, it failed:

```text
Error: Cannot find module '.../spec-kit-week2/tests'
```

Newer Node doesn't accept a folder there anymore. Plain `node --test` finds the test files
on its own. I fixed it in `plan.md`, `quickstart.md` and `tasks.md` and added a note in
`research.md` (R6), so the docs match what actually works (commit `24a333e`).

**2. "New quote" sometimes did nothing.** This is the main before/after.

The first spec said FR-003 was:

> replaces the displayed quote with a randomly selected quote from the collection.

The code did exactly that. All the checks passed and the first converge run said
Converged. But when I tested it in the browser and pressed "New quote" 60 times, it picked
the same quote that was already showing **4 times**. With only 12 quotes that's about 1 in
12 clicks where it looks like the button is broken.

The code wasn't technically wrong. The spec just never said the new quote had to be
different. So instead of patching the code, I changed the spec (commit `992976d`):

```diff
 - **FR-003**: The page MUST provide a "New quote" button that, when activated, replaces the
-  displayed quote with a randomly selected quote from the collection.
+  displayed quote with a randomly selected quote from the collection **other than the one
+  currently displayed** (if the collection has only one quote, that quote stays).
```

I also updated the matching acceptance scenario and the contract for `pickRandomQuote`,
which now takes an `excludeId`.

After that, running `/speckit-converge` again found the gap (FR-003, partial, HIGH) and
added two new tasks:

- T017: write regression tests first
- T018: actually exclude the current quote

The new test failed before the fix, which is what I wanted. After `/speckit-implement` it
passed, and the repeat count in the browser went from **4/60 to 0/60**. The test count
went from 9 to 11.

## How convergence went

- **Converge #1** (after T001–T016): Converged. Everything in the spec was met, which is
  kind of the point. The spec itself was the problem.
- **Converge #2** (after changing FR-003): found 1 gap and added Phase 7 with T017–T018.
- **Converge #3** (after implementing those): Converged. 18/18 tasks done, 11/11 tests
  passing.

To check the page I went through the manual steps in `quickstart.md` (V1–V7) in Chromium.
Those cover things like favoriting, reloading, and putting junk data in localStorage. I
also checked what happens when localStorage is completely blocked. Everything passed with
no console errors.

![Quote of the Day page](docs/screenshot.png)

## What I learned

Honestly, at the start SDD felt like way too much for a page this small. Writing a
constitution, user stories, a data model and contracts took longer than just coding the
page would have. Where it paid off was the "New quote" bug. Converge said everything was
fine, and it was right, because the agent did exactly what the spec said. That made it
really clear that the agent is only as good as the spec you give it. Fixing one sentence
in the spec automatically turned into new tasks, a test, and the code change, and there's
a written reason for each change instead of a random diff. Next time I'd spend more time
reviewing the acceptance scenarios, since that's where the vague part was hiding.
