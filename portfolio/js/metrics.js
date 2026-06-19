(function () {
  "use strict";

  var METRICS_URL = "data/portfolio-metrics.json";

  function statusClass(status) {
    if (status === "live") return "status-live";
    if (status === "degraded") return "status-degraded";
    return "status-offline";
  }

  function renderHero(hero) {
    if (!hero) return;
    var stats = document.querySelector(".hero-stats");
    if (!stats) return;
    stats.innerHTML =
      '<div class="stat"><span class="stat-num">' + (hero.platforms_live || 0) + "/" + (hero.platforms_total || 3) + '</span><span class="stat-label">Platforms Live Now</span></div>' +
      '<div class="stat"><span class="stat-num">' + (hero.agents_and_providers || "14+") + '</span><span class="stat-label">Agents &amp; AI Providers</span></div>' +
      '<div class="stat"><span class="stat-num">' + (hero.federal_years || "10+") + '</span><span class="stat-label">Years Federal Infra &amp; Security</span></div>';
  }

  function renderCards(cards) {
    var container = document.getElementById("live-metrics-grid");
    if (!container || !cards || !cards.length) return;
    container.innerHTML = cards.map(function (card) {
      var statsHtml = (card.stats || []).map(function (s) {
        return '<div class="live-stat"><span class="live-stat-val">' + s.value + '</span><span class="live-stat-lbl">' + s.label + '</span></div>';
      }).join("");
      return (
        '<article class="live-card ' + statusClass(card.status) + '">' +
        '<header><h3>' + card.title + '</h3><span class="live-badge ' + statusClass(card.status) + '">' + (card.status || "unknown") + '</span></header>' +
        '<div class="live-stats">' + statsHtml + '</div></article>'
      );
    }).join("");
  }

  function renderUpdatedAt(iso) {
    var el = document.getElementById("metrics-updated");
    if (!el || !iso) return;
    try {
      var d = new Date(iso);
      el.textContent = "Live snapshot: " + d.toLocaleString();
    } catch (e) {
      el.textContent = "Live snapshot: " + iso;
    }
  }

  fetch(METRICS_URL, { cache: "no-store" })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      if (!data) return;
      renderHero(data.hero);
      renderCards(data.display_cards);
      renderUpdatedAt(data.generated_at);
      var section = document.getElementById("live-metrics");
      if (section) section.hidden = false;
    })
    .catch(function () { /* static fallbacks remain */ });
})();
