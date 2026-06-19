/* chrisgordon.dev — shared layout & data loading */

(function () {
  "use strict";

  var ROOT = document.documentElement.dataset.root || "";
  var METRICS_URL = ROOT + "data/portfolio-metrics.json";
  var PROFILE_URL = ROOT + "data/profile.json";
  var SYSTEMS_URL = ROOT + "data/systems.json";

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  function statusClass(s) {
    if (s === "live") return "status-live";
    if (s === "degraded") return "status-degraded";
    return "status-offline";
  }

  function fetchJson(url) {
    return fetch(url, { cache: "no-store" }).then(function (r) {
      if (!r.ok) throw new Error(url);
      return r.json();
    });
  }

  function renderNav(profile) {
    var el = $("#site-nav-links");
    if (!el) return;
    el.innerHTML =
      '<a href="' + ROOT + 'index.html#systems">Systems</a>' +
      '<a href="' + ROOT + 'dev/qti.html">QTI Dev</a>' +
      '<a href="' + ROOT + 'index.html#experience">Experience</a>' +
      '<a href="' + ROOT + 'index.html#contact">Contact</a>' +
      '<a class="nav-cta" href="' + (profile.github || "#") + '" target="_blank" rel="noopener">GitHub</a>';
  }

  function renderProfileHero(profile) {
    var hero = $("#profile-hero");
    if (!hero || !profile) return;
    $("#profile-name").textContent = profile.name;
    $("#profile-title").textContent = profile.title;
    $("#profile-tagline").textContent = profile.tagline;
    var contact = $("#profile-contact");
    if (contact) {
      contact.innerHTML =
        profile.location + " · " +
        '<a href="mailto:' + profile.email + '">' + profile.email + "</a> · " +
        '<a href="tel:' + profile.phone.replace(/\D/g, "") + '">' + profile.phone + "</a>";
    }
    var skills = $("#profile-skills");
    if (skills && profile.skills_lead) {
      skills.innerHTML = profile.skills_lead.map(function (s) {
        return '<span class="skill-chip">' + s + "</span>";
      }).join("");
    }
    var repos = $("#profile-repos");
    if (repos && profile.repos) {
      repos.innerHTML = profile.repos.map(function (r) {
        return '<a class="repo-link" href="' + r.url + '" target="_blank" rel="noopener">' + r.label + " →</a>";
      }).join("");
    }
  }

  function renderSystemCards(systems, metrics) {
    var grid = $("#systems-grid");
    if (!grid || !systems) return;
    var byKey = (metrics && metrics.systems) || {};
    grid.innerHTML = systems.systems.map(function (sys) {
      var live = byKey[sys.status_key] || {};
      var st = live.status || "—";
      var m = live.metrics || {};
      var stats = "";
      if (sys.id === "qti") {
        stats = (m.railway_checks_passed || "—") + "/" + (m.railway_checks_total || 8) + " checks · " +
          (m.agents_reporting || 14) + " agents";
      } else if (sys.id === "malwatch") {
        stats = (m.ai_providers_online || "—") + " AI providers · " + (m.python_modules || "—") + " modules";
      } else {
        stats = (m.api_route_groups || "—") + " routes · " + ((m.generated_videos || 0) + (m.generated_audio || 0)) + " media assets";
      }
      return (
        '<article class="project-card ' + (sys.id === "qti" ? "featured" : "") + '">' +
        '<div class="project-meta"><span class="project-tag">' + sys.subtitle + '</span>' +
        '<span class="live-badge ' + statusClass(st) + '">' + st + '</span></div>' +
        "<h3>" + sys.name + "</h3>" +
        '<p class="project-sub">' + sys.tagline + "</p>" +
        '<ul class="project-stack">' + sys.stack.map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ul>" +
        '<p class="project-live-stat">' + stats + "</p>" +
        '<div class="project-links">' +
        '<a href="' + ROOT + sys.page + '">Dev showcase →</a> · ' +
        '<a href="' + sys.repo + '" target="_blank" rel="noopener">GitHub →</a></div></article>'
      );
    }).join("");
  }

  function renderMetricsPanel(metrics) {
    if (!metrics) return;
    renderHeroStats(metrics.hero);
    renderLiveGrid(metrics.display_cards);
    var updated = $("#metrics-updated");
    if (updated && metrics.generated_at) {
      updated.textContent = "Live snapshot: " + new Date(metrics.generated_at).toLocaleString();
    }
    var section = $("#live-metrics");
    if (section) section.hidden = false;
  }

  function renderHeroStats(hero) {
    if (!hero) return;
    var stats = $(".hero-stats");
    if (!stats) return;
    stats.innerHTML =
      '<div class="stat"><span class="stat-num">' + (hero.platforms_live || 0) + "/" + (hero.platforms_total || 3) + '</span><span class="stat-label">Platforms Live</span></div>' +
      '<div class="stat"><span class="stat-num">' + (hero.agents_and_providers || "14+") + '</span><span class="stat-label">Agents &amp; AI Providers</span></div>' +
      '<div class="stat"><span class="stat-num">' + (hero.federal_years || "10+") + '</span><span class="stat-label">Years Federal Security</span></div>';
  }

  function renderLiveGrid(cards) {
    var grid = $("#live-metrics-grid");
    if (!grid || !cards) return;
    grid.innerHTML = cards.map(function (card) {
      var statsHtml = (card.stats || []).map(function (s) {
        return '<div class="live-stat"><span class="live-stat-val">' + (s.value != null ? s.value : "—") + '</span><span class="live-stat-lbl">' + s.label + "</span></div>";
      }).join("");
      return (
        '<article class="live-card ' + statusClass(card.status) + '">' +
        "<header><h3>" + card.title + '</h3><span class="live-badge ' + statusClass(card.status) + '">' + card.status + "</span></header>" +
        '<div class="live-stats">' + statsHtml + "</div></article>"
      );
    }).join("");
  }

  function initMobileNav() {
    var toggle = $(".nav-toggle");
    var nav = $(".nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  function initYear() {
    var y = $("#year");
    if (y) y.textContent = new Date().getFullYear();
  }

  window.CGDev = {
    fetchJson: fetchJson,
    renderMetricsPanel: renderMetricsPanel,
    statusClass: statusClass,
    ROOT: ROOT,
    METRICS_URL: METRICS_URL
  };

  document.addEventListener("DOMContentLoaded", function () {
    initMobileNav();
    initYear();

    Promise.all([
      fetchJson(PROFILE_URL).catch(function () { return null; }),
      fetchJson(SYSTEMS_URL).catch(function () { return null; }),
      fetchJson(METRICS_URL).catch(function () { return null; })
    ]).then(function (results) {
      var profile = results[0];
      var systems = results[1];
      var metrics = results[2];
      if (profile) {
        renderNav(profile);
        renderProfileHero(profile);
      }
      if (systems) renderSystemCards(systems, metrics);
      if (metrics) renderMetricsPanel(metrics);
    });
  });
})();
