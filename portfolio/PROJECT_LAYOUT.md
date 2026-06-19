# Portfolio & Project Layout

Canonical paths for **chrisgordon.dev** and the three production systems + public showcases.

## Production (private)

| System | Local path |
|--------|------------|
| **Malwatch** | `C:\Users\gordo\OneDrive\Desktop\Malwatch` |
| **Content Forge** | `C:\Users\gordo\Content-Forge` |
| **Quantum Trade / QTI** | `C:\Users\gordo\OneDrive\Desktop\TradingProject\TradingProject` |

## Public showcases (GitHub-ready)

| System | Local path | GitHub repo |
|--------|------------|-------------|
| **Portfolio site** | `Content-Forge\content-forge-public\portfolio\` | `ChrisCyberSec76/CONTENT-FORGE` |
| **Malwatch showcase** | `Malwatch\malwatch-public\` | `ChrisCyberSec76/malwatch-public` |
| **Content Forge showcase** | `Content-Forge\content-forge-public\` | `ChrisCyberSec76/CONTENT-FORGE` |
| **QTI showcase** | `TradingProject\quantum-trade-ai-public\` | `ChrisCyberSec76/quantum-trade-ai` |

> **Note:** An older copy of `quantum-trade-ai-public` may still exist on the Desktop until deleted manually.  
> The legacy `Desktop\chrisgordon.dev` folder is optional — **CONTENT-FORGE/portfolio** is canonical.

## Live URLs (after deploy)

| Resource | URL |
|----------|-----|
| Portfolio | https://chrisgordon.dev |
| GitHub profile | https://github.com/ChrisCyberSec76 |

## Push portfolio updates

```powershell
cd C:\Users\gordo\Content-Forge\content-forge-public
git add portfolio/
git commit -m "Update portfolio site"
git push origin main
```

GitHub Actions workflow `.github/workflows/portfolio-pages.yml` deploys `portfolio/` to Pages.

## Port map (local dev — no conflicts)

| System | API | UI |
|--------|-----|-----|
| Malwatch | 8800 | 3100 |
| Content Forge | 8000 | 3000 |
| Quantum Trade | 8000 (Railway prod) | 5173 (Base44) |

Malwatch operator console docs: `Malwatch\bat\README.md`
