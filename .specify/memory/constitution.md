# Quote of the Day Constitution

## Core Principles

### I. Readable, Self-Explanatory Code
Code MUST be written for the next reader first. Functions MUST do one thing and stay short
(guideline: under ~30 lines). Names MUST describe intent (`pickRandomQuote`, not `doIt`).
No dead code, commented-out code, or unused files MAY be committed. Comments explain *why*,
never *what* the code already says.
*Rationale*: A small project is only cheap to change if anyone can read it in minutes.

### II. Testable Logic, Thin UI (NON-NEGOTIABLE)
All behavior that can be expressed without the DOM (choosing quotes, toggling favorites,
reading and writing persisted state) MUST live in plain functions that take inputs and
return outputs, separate from DOM wiring. Every such function MUST have automated tests.
Each functional requirement in the spec MUST map to at least one test or a written manual
check.
*Rationale*: Logic separated from the UI can be tested quickly and without a browser.

### III. Tests Pass Before "Done"
A task is complete only when the full automated test suite passes and the feature has been
checked in a real browser. Bugs found MUST get a regression test before being fixed.
Tests MUST NOT be weakened or deleted to make them pass.
*Rationale*: "Done" must mean verified, not merely written.

### IV. Simplicity and Minimal Dependencies
Use the platform first: plain HTML, CSS, and JavaScript with no frameworks, build step, or
runtime dependencies unless the plan justifies one in its Complexity Tracking section.
Any test tooling MUST run with a single documented command. YAGNI: build only what the
spec requires.
*Rationale*: Every dependency and abstraction is something future maintainers must learn.

### V. Graceful Failure and Accessibility
The page MUST keep working when optional capabilities fail (for example, storage that is
unavailable or holds corrupted data): it degrades rather than crashes. Interactive controls
MUST be real buttons, reachable and usable by keyboard, with accessible names and visible
state.
*Rationale*: Users should never see a broken page because of their browser settings.

## Quality Gates

- Automated tests pass with one command (documented in the README/quickstart).
- No console errors when the page loads or when any control is used.
- Every functional requirement in `spec.md` traces to a task in `tasks.md` and to a test or
  manual check.
- Code follows a consistent style: 2-space indentation, semicolons, `const`/`let` (no `var`),
  strict equality.

## Development Workflow

- Spec-driven: constitution → specify → plan → tasks → implement → converge. Each stage's
  artifact is reviewed by a human before the next stage starts.
- When the output is wrong because an artifact is vague or wrong, fix the spec or plan
  first, then regenerate. Do not patch code to diverge from its spec.
- Small, focused commits with descriptive messages, one per stage or task group.

## Governance

This constitution supersedes other practices for this project. Every plan MUST include a
Constitution Check against Principles I–V, and any violation MUST be justified in the
plan's Complexity Tracking table or the plan changes instead. Amendments are made with
`/speckit-constitution`, recorded in the Sync Impact Report, and versioned with semantic
versioning: MAJOR for removed or redefined principles, MINOR for new principles or
sections, PATCH for wording clarifications. Compliance is reviewed at each stage gate and
during `/speckit-converge`.

**Version**: 1.0.0 | **Ratified**: 2026-10-18 | **Last Amended**: 2026-10-18
