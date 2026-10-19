/* DOM wiring only; all decisions are delegated to QuoteLogic (src/quotes.js). */
(function () {
  "use strict";

  const logic = window.QuoteLogic;

  function getStorage() {
    try {
      return window.localStorage;
    } catch (error) {
      return null;
    }
  }

  const storage = getStorage();
  const elements = {
    text: document.getElementById("quote-text"),
    author: document.getElementById("quote-author"),
    newQuote: document.getElementById("new-quote"),
    favorite: document.getElementById("favorite"),
    favoriteIcon: document.querySelector("#favorite .icon"),
    favoriteLabel: document.querySelector("#favorite .label"),
    count: document.getElementById("favorite-count"),
    storageNote: document.getElementById("storage-note"),
  };

  const state = {
    current: null,
    favorites: storage ? logic.loadFavorites(storage, logic.QUOTES) : [],
  };

  function renderFavorite() {
    const favorite = logic.isFavorite(state.favorites, state.current.id);
    elements.favorite.setAttribute("aria-pressed", String(favorite));
    elements.favoriteIcon.textContent = favorite ? "★" : "☆";
    elements.favoriteLabel.textContent = favorite ? "Remove from favorites" : "Add to favorites";
    elements.count.textContent = `Favorites: ${state.favorites.length}`;
  }

  function showQuote(quote) {
    state.current = quote;
    elements.text.textContent = quote.text;
    elements.author.textContent = `— ${quote.author}`;
    renderFavorite();
  }

  function onNewQuote() {
    showQuote(logic.pickRandomQuote(logic.QUOTES, Math.random, state.current.id));
  }

  function onToggleFavorite() {
    state.favorites = logic.toggleFavorite(state.favorites, state.current.id);
    const saved = storage !== null && logic.saveFavorites(storage, state.favorites);
    elements.storageNote.hidden = saved;
    renderFavorite();
  }

  elements.newQuote.addEventListener("click", onNewQuote);
  elements.favorite.addEventListener("click", onToggleFavorite);
  showQuote(logic.pickRandomQuote(logic.QUOTES));
})();
