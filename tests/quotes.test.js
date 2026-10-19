const test = require("node:test");
const assert = require("node:assert/strict");
const {
  STORAGE_KEY,
  QUOTES,
  pickRandomQuote,
  isFavorite,
  toggleFavorite,
  parseFavorites,
  loadFavorites,
  saveFavorites,
} = require("../src/quotes.js");

function fakeStorage(initial = {}) {
  const data = { ...initial };
  return {
    data,
    getItem: (key) => (key in data ? data[key] : null),
    setItem: (key, value) => {
      data[key] = String(value);
    },
  };
}

const throwingStorage = {
  getItem() {
    throw new Error("SecurityError");
  },
  setItem() {
    throw new Error("QuotaExceededError");
  },
};

test("QUOTES has at least 10 quotes with unique ids and non-empty text/author", () => {
  assert.ok(QUOTES.length >= 10);
  assert.equal(new Set(QUOTES.map((q) => q.id)).size, QUOTES.length);
  for (const quote of QUOTES) {
    assert.ok(quote.text.trim().length > 0, quote.id);
    assert.ok(quote.author.trim().length > 0, quote.id);
  }
});

test("pickRandomQuote uses the random function to choose an item", () => {
  assert.equal(pickRandomQuote(QUOTES, () => 0), QUOTES[0]);
  assert.equal(pickRandomQuote(QUOTES, () => 0.9999), QUOTES[QUOTES.length - 1]);
});

test("pickRandomQuote always returns a quote from the collection", () => {
  for (let i = 0; i < 200; i += 1) {
    assert.ok(QUOTES.includes(pickRandomQuote(QUOTES)));
  }
});

test("isFavorite reports membership", () => {
  assert.equal(isFavorite(["a"], "a"), true);
  assert.equal(isFavorite(["a"], "b"), false);
});

test("toggleFavorite adds and removes ids without mutating the input", () => {
  const start = ["a"];
  assert.deepEqual(toggleFavorite(start, "b"), ["a", "b"]);
  assert.deepEqual(toggleFavorite(start, "a"), []);
  assert.deepEqual(start, ["a"]);
});

test("parseFavorites returns [] for missing, invalid, or non-array data", () => {
  assert.deepEqual(parseFavorites(null, QUOTES), []);
  assert.deepEqual(parseFavorites("{bad", QUOTES), []);
  assert.deepEqual(parseFavorites('{"a":1}', QUOTES), []);
});

test("parseFavorites drops unknown ids, non-strings, and duplicates", () => {
  const id = QUOTES[0].id;
  const raw = JSON.stringify([id, "no-such-quote", 42, id]);
  assert.deepEqual(parseFavorites(raw, QUOTES), [id]);
});

test("saveFavorites then loadFavorites round-trips through storage", () => {
  const storage = fakeStorage();
  const ids = [QUOTES[1].id, QUOTES[2].id];
  assert.equal(saveFavorites(storage, ids), true);
  assert.equal(storage.data[STORAGE_KEY], JSON.stringify(ids));
  assert.deepEqual(loadFavorites(storage, QUOTES), ids);
});

test("load and save never throw when storage is unavailable", () => {
  assert.deepEqual(loadFavorites(throwingStorage, QUOTES), []);
  assert.equal(saveFavorites(throwingStorage, ["x"]), false);
});
