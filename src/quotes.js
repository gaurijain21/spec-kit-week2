/* Pure quote and favorites logic. No DOM access here (constitution Principle II).
 * Loaded as a classic script in the browser (window.QuoteLogic) and via require() in tests. */
(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  } else {
    root.QuoteLogic = api;
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  const STORAGE_KEY = "qotd.favorites";

  const QUOTES = Object.freeze([
    { id: "maya-angelou-1", text: "Try to be a rainbow in someone's cloud.", author: "Maya Angelou" },
    { id: "lao-tzu-1", text: "A journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
    { id: "confucius-1", text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { id: "seneca-1", text: "Luck is what happens when preparation meets opportunity.", author: "Seneca" },
    { id: "marcus-aurelius-1", text: "The happiness of your life depends upon the quality of your thoughts.", author: "Marcus Aurelius" },
    { id: "eleanor-roosevelt-1", text: "No one can make you feel inferior without your consent.", author: "Eleanor Roosevelt" },
    { id: "albert-einstein-1", text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
    { id: "nelson-mandela-1", text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { id: "aristotle-1", text: "Quality is not an act, it is a habit.", author: "Aristotle" },
    { id: "grace-hopper-1", text: "The most dangerous phrase in the language is, 'We've always done it this way.'", author: "Grace Hopper" },
    { id: "ada-lovelace-1", text: "That brain of mine is something more than merely mortal, as time will show.", author: "Ada Lovelace" },
    { id: "rumi-1", text: "What you seek is seeking you.", author: "Rumi" },
  ].map(Object.freeze));

  function pickRandomQuote(quotes, random = Math.random) {
    return quotes[Math.floor(random() * quotes.length)];
  }

  function isFavorite(favorites, id) {
    return favorites.includes(id);
  }

  function toggleFavorite(favorites, id) {
    return isFavorite(favorites, id)
      ? favorites.filter((favoriteId) => favoriteId !== id)
      : [...favorites, id];
  }

  function parseFavorites(raw, quotes) {
    if (typeof raw !== "string") return [];
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      return [];
    }
    if (!Array.isArray(parsed)) return [];
    const knownIds = new Set(quotes.map((quote) => quote.id));
    const valid = parsed.filter((id) => typeof id === "string" && knownIds.has(id));
    return [...new Set(valid)];
  }

  function loadFavorites(storage, quotes) {
    try {
      return parseFavorites(storage.getItem(STORAGE_KEY), quotes);
    } catch (error) {
      return [];
    }
  }

  function saveFavorites(storage, favorites) {
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      return true;
    } catch (error) {
      return false;
    }
  }

  return {
    STORAGE_KEY,
    QUOTES,
    pickRandomQuote,
    isFavorite,
    toggleFavorite,
    parseFavorites,
    loadFavorites,
    saveFavorites,
  };
});
