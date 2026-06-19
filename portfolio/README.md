# chrisgordon.dev (portfolio/)

Developer profile and live showcase for **Christopher Gordon** — Senior Backend Engineer, AI Platform & Cybersecurity.

**Live site (now):** https://chriscybersec76.github.io/CONTENT-FORGE/

**Custom domain (after you register DNS):** https://chrisgordon.dev — see [docs/DOMAIN_SETUP.md](docs/DOMAIN_SETUP.md)

**GitHub repo:** [ChrisCyberSec76/CONTENT-FORGE](https://github.com/ChrisCyberSec76/CONTENT-FORGE)

## Quick preview

```powershell
cd C:\Users\gordo\Content-Forge\content-forge-public\portfolio
python -m http.server 8080
# http://localhost:8080
# http://localhost:8080/dev/qti.html
```

## What's on the site

| Page | Purpose |
|------|---------|
| `/` | Dev profile — loads `data/profile.json` + live metrics |
| `/dev/qti.html` | **Quantum Trade OS** showcase (from AI Trading Operating System deck) |
| `/dev/malwatch.html` | Malwatch cybersecurity platform |
| `/dev/content-forge.html` | Content Forge media pipeline |

## Data-driven logic

Edit JSON, not HTML:

- `data/profile.json` — name, title, skills, repo links
- `data/systems.json` — system cards on homepage
- `data/qti-showcase.json` — QTI pillars, BNAI, 14 agents, compliance (from PPT)
- `data/portfolio-metrics.json` — **generated** live stats (Railway, Malwatch, Content Forge)

## Deploy & metrics refresh

See **[docs/GITHUB_SETUP.md](docs/GITHUB_SETUP.md)** for GitHub Pages + DNS + metrics workflow.

GitHub profile README template: **[docs/GITHUB_PROFILE_README.md](docs/GITHUB_PROFILE_README.md)**

## Project paths

See **[PROJECT_LAYOUT.md](PROJECT_LAYOUT.md)**
