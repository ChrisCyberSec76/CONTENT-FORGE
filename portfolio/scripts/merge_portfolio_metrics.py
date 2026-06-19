#!/usr/bin/env python3
"""
Merge per-system snapshots into portfolio-metrics.json for the site.

Run after all three export scripts:
  python scripts/merge_portfolio_metrics.py
"""
from __future__ import annotations

import json
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SNAP = ROOT / "data" / "snapshots"
OUT = ROOT / "data" / "portfolio-metrics.json"


def _load(name: str) -> dict:
    path = SNAP / name
    if not path.exists():
        return {"status": "missing", "error": f"Run export script first — {path}"}
    return json.loads(path.read_text(encoding="utf-8"))


def main() -> int:
    malwatch = _load("malwatch.json")
    forge = _load("content-forge.json")
    qti = _load("qti.json")

    mw = malwatch.get("metrics") or {}
    cf = forge.get("metrics") or {}
    qt = qti.get("metrics") or {}

    agents_total = (mw.get("ai_providers_online") or 0) + (cf.get("autonomous_agents_configured") or 0) + (qt.get("agents_reporting") or 14)

    merged = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "systems": {
            "malwatch": malwatch,
            "content_forge": forge,
            "quantum_trade": qti,
        },
        "hero": {
            "platforms_live": sum(1 for s in (malwatch, forge, qti) if s.get("status") in ("live", "degraded")),
            "platforms_total": 3,
            "agents_and_providers": agents_total,
            "federal_years": "10+",
        },
        "display_cards": [
            {
                "id": "malwatch",
                "title": "Malwatch",
                "status": malwatch.get("status", "missing"),
                "stats": [
                    {"label": "AI providers online", "value": mw.get("ai_providers_online", "—")},
                    {"label": "Modules healthy", "value": mw.get("monitoring_modules_healthy", "—")},
                    {"label": "Files scanned", "value": mw.get("files_scanned", "—")},
                    {"label": "Python modules", "value": mw.get("python_modules", "—")},
                ],
            },
            {
                "id": "qti",
                "title": "Quantum Trade Intelligence",
                "status": qti.get("status", "missing"),
                "stats": [
                    {"label": "Railway checks", "value": f"{qt.get('railway_checks_passed', '—')}/{qt.get('railway_checks_total', 8)}"},
                    {"label": "Open positions", "value": qt.get("open_positions", "—")},
                    {"label": "Agents reporting", "value": qt.get("agents_reporting", "—")},
                    {"label": "Python modules", "value": qt.get("python_modules", "—")},
                ],
            },
            {
                "id": "content_forge",
                "title": "Content Forge AI",
                "status": forge.get("status", "missing"),
                "stats": [
                    {"label": "API route groups", "value": cf.get("api_route_groups", "—")},
                    {"label": "Agents configured", "value": cf.get("autonomous_agents_configured", "—")},
                    {"label": "Media generated", "value": (cf.get("generated_videos") or 0) + (cf.get("generated_audio") or 0)},
                    {"label": "Providers live", "value": cf.get("media_providers_configured", "—")},
                ],
            },
        ],
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(merged, indent=2), encoding="utf-8")
    print(f"Wrote {OUT}")
    print(json.dumps(merged["hero"], indent=2))
    missing = [k for k, v in merged["systems"].items() if v.get("status") == "missing"]
    return 1 if missing else 0


if __name__ == "__main__":
    sys.exit(main())
