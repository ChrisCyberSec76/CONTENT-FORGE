# Deploy chrisgordon.dev via CONTENT-FORGE

The portfolio site lives in **`portfolio/`** inside this repo (`ChrisCyberSec76/CONTENT-FORGE`).  
GitHub Pages serves that folder at **https://chrisgordon.dev** — no separate repo needed.

## One-time setup

### 1. Push portfolio to GitHub

```powershell
cd C:\Users\gordo\Content-Forge\content-forge-public
git add portfolio/ .github/workflows/portfolio-pages.yml
git commit -m "Add chrisgordon.dev portfolio site with live metrics"
git push origin main
```

### 2. Enable GitHub Pages

- Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**
- Workflow: `.github/workflows/portfolio-pages.yml` (deploys `portfolio/` on push)

### 3. Custom domain

- **Settings → Pages → Custom domain:** `chrisgordon.dev`
- DNS A records → GitHub Pages IPs:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- `portfolio/CNAME` already contains `chrisgordon.dev`

### 4. GitHub profile README

Copy content from `portfolio/docs/GITHUB_PROFILE_README.md` to `ChrisCyberSec76/ChrisCyberSec76` README.

Pin: **CONTENT-FORGE**, **quantum-trade-ai**, **malwatch-public**, **content-forge-public**

---

## Site architecture

```
content-forge-public/
└── portfolio/                  # GitHub Pages root (chrisgordon.dev)
    ├── index.html              # Dev profile (loads JSON + live metrics)
    ├── dev/
    │   ├── qti.html            # Quantum Trade OS showcase
    │   ├── malwatch.html
    │   └── content-forge.html
    ├── data/
    │   ├── profile.json        # Profile logic — edit here, not HTML
    │   ├── systems.json        # System cards metadata
    │   ├── qti-showcase.json   # QTI content from AI Trading OS deck
    │   ├── snapshots/          # Per-system exports (generated)
    │   └── portfolio-metrics.json  # Merged live metrics (generated)
    ├── js/
    │   ├── app.js              # Profile + metrics loader
    │   └── showcase.js         # Dev page renderers
    └── scripts/
        └── merge_portfolio_metrics.py
```

**Logic lives in JSON + JS** — update `data/profile.json` or `data/qti-showcase.json`, push to GitHub, site updates automatically.

---

## Refresh live metrics (weekly or before job applications)

Run in each project terminal:

```powershell
# Malwatch (API on :8800)
cd C:\Users\gordo\OneDrive\Desktop\Malwatch
python scripts/export_portfolio_snapshot.py

# Content Forge (API on :8000)
cd C:\Users\gordo\Content-Forge\backend\content-forge-backend
python scripts/export_portfolio_snapshot.py

# QTI (Railway — reads .env token)
cd C:\Users\gordo\OneDrive\Desktop\TradingProject\TradingProject
python scripts/export_portfolio_snapshot.py

# Merge + commit in CONTENT-FORGE
python C:\Users\gordo\Content-Forge\content-forge-public\portfolio\scripts\merge_portfolio_metrics.py
cd C:\Users\gordo\Content-Forge\content-forge-public
git add portfolio/data/
git commit -m "Update live portfolio metrics"
git push
```

Override snapshot output directory (optional):

```powershell
$env:PORTFOLIO_DATA_DIR = "C:\Users\gordo\Content-Forge\content-forge-public\portfolio\data\snapshots"
```

---

## Showcase repos (separate GitHub repos)

| Local path | GitHub repo |
|------------|-------------|
| `Malwatch\malwatch-public` | `ChrisCyberSec76/malwatch-public` |
| `TradingProject\quantum-trade-ai-public` | `ChrisCyberSec76/quantum-trade-ai` |
| `Content-Forge\content-forge-public` | `ChrisCyberSec76/CONTENT-FORGE` (this repo) |

See `portfolio/PROJECT_LAYOUT.md` for full map.
