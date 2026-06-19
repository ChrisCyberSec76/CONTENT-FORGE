/* Dev showcase pages — QTI, Malwatch, Content Forge */

(function () {
  "use strict";

  var ROOT = document.documentElement.dataset.root || "../";

  function el(id) { return document.getElementById(id); }

  function listItems(arr) {
    return (arr || []).map(function (x) { return "<li>" + x + "</li>"; }).join("");
  }

  function renderQTI(data, metrics) {
    el("qti-title").textContent = data.product;
    el("qti-brand").textContent = data.brand_line;
    el("qti-summary").textContent = data.summary;

    var pillars = el("qti-pillars");
    pillars.innerHTML = (data.pillars || []).map(function (p) {
      return '<div class="pillar-card"><h4>' + p.title + "</h4><ul>" + listItems(p.items) + "</ul></div>";
    }).join("");

    el("bnai-name").textContent = data.bnai.name;
    el("bnai-desc").textContent = data.bnai.description;
    el("bnai-rules").innerHTML = listItems(data.bnai.rules);

    var tiers = el("qti-agent-tiers");
    tiers.innerHTML = (data.agents.tiers || []).map(function (t) {
      return '<div class="tier-card"><h4>' + t.name + '</h4><ul>' + listItems(t.agents) + "</ul></div>";
    }).join("");

    el("qti-cycle").innerHTML = listItems(data.automation_cycle);
    el("qti-compliance").innerHTML = (data.compliance || []).map(function (c) {
      return '<div class="compliance-card"><strong>' + c.title + "</strong><p>" + c.text + "</p></div>";
    }).join("");
    el("qti-built").innerHTML = listItems(data.built_now);
    el("qti-diff").innerHTML = listItems(data.differentiators);

    var qm = (metrics && metrics.systems && metrics.systems.quantum_trade) || {};
    var m = qm.metrics || {};
    var live = el("qti-live-stats");
    if (live) {
      live.innerHTML =
        '<div class="live-stat"><span class="live-stat-val">' + (m.railway_checks_passed || "—") + "/" + (m.railway_checks_total || 8) + '</span><span class="live-stat-lbl">Railway checks</span></div>' +
        '<div class="live-stat"><span class="live-stat-val">' + (m.agents_reporting || 14) + '</span><span class="live-stat-lbl">Agents reporting</span></div>' +
        '<div class="live-stat"><span class="live-stat-val">' + (m.open_positions != null ? m.open_positions : "—") + '</span><span class="live-stat-lbl">Open positions</span></div>' +
        '<div class="live-stat"><span class="live-stat-val">' + (m.autotrade_loop_active ? "active" : "—") + '</span><span class="live-stat-lbl">Autotrade loop</span></div>';
    }
    var badge = el("qti-status-badge");
    if (badge) {
      badge.textContent = qm.status || "unknown";
      badge.className = "live-badge " + (window.CGDev ? CGDev.statusClass(qm.status) : "");
    }
  }

  function renderMalwatch(metrics) {
    var mw = (metrics && metrics.systems && metrics.systems.malwatch) || {};
    var m = mw.metrics || {};
    el("mw-live-stats").innerHTML =
      '<div class="live-stat"><span class="live-stat-val">' + (m.ai_providers_online || "—") + '</span><span class="live-stat-lbl">AI providers</span></div>' +
      '<div class="live-stat"><span class="live-stat-val">' + (m.python_modules || "—") + '</span><span class="live-stat-lbl">Python modules</span></div>' +
      '<div class="live-stat"><span class="live-stat-val">' + (m.api_endpoints_ok || 0) + "/" + (m.api_endpoints_probed || 6) + '</span><span class="live-stat-lbl">API probes OK</span></div>' +
      '<div class="live-stat"><span class="live-stat-val">' + (mw.status || "—") + '</span><span class="live-stat-lbl">Status</span></div>';
    var probes = el("mw-probes");
    if (probes && mw.provider_probe) {
      probes.innerHTML = mw.provider_probe.map(function (p) {
        var ok = p.indexOf(": OK") >= 0;
        return '<li class="' + (ok ? "ok" : "fail") + '">' + p.split(" — ")[0] + "</li>";
      }).join("");
    }
  }

  function renderContentForge(metrics) {
    var cf = (metrics && metrics.systems && metrics.systems.content_forge) || {};
    var m = cf.metrics || {};
    el("cf-live-stats").innerHTML =
      '<div class="live-stat"><span class="live-stat-val">' + (m.api_route_groups || "—") + '</span><span class="live-stat-lbl">API route groups</span></div>' +
      '<div class="live-stat"><span class="live-stat-val">' + (m.generated_audio || 0) + '</span><span class="live-stat-lbl">Audio assets</span></div>' +
      '<div class="live-stat"><span class="live-stat-val">' + (m.generated_videos || 0) + '</span><span class="live-stat-lbl">Video assets</span></div>' +
      '<div class="live-stat"><span class="live-stat-val">' + (cf.status || "—") + '</span><span class="live-stat-lbl">Status</span></div>';
  }

  document.addEventListener("DOMContentLoaded", function () {
    var page = document.body.dataset.page;
    if (!page) return;

    var metricsP = window.CGDev
      ? CGDev.fetchJson(CGDev.METRICS_URL)
      : fetch(ROOT + "data/portfolio-metrics.json").then(function (r) { return r.json(); });

    if (page === "qti") {
      Promise.all([
        fetch(ROOT + "data/qti-showcase.json").then(function (r) { return r.json(); }),
        metricsP.catch(function () { return null; })
      ]).then(function (res) { renderQTI(res[0], res[1]); });
    } else if (page === "malwatch") {
      metricsP.then(renderMalwatch).catch(function () {});
    } else if (page === "content-forge") {
      metricsP.then(renderContentForge).catch(function () {});
    }
  });
})();
