# chrisgordon.dev — Domain Setup (IONOS + GitHub Pages)

## Portfolio URLs

| Status | URL |
|--------|-----|
| **Live now** | https://chriscybersec76.github.io/CONTENT-FORGE/ |
| **Custom domain (after DNS works)** | https://chrisgordon.dev |

GitHub side is configured (`portfolio/CNAME` + Pages custom domain).  
**Your blocker is IONOS DNS** — the domain does not resolve on the public internet yet.

---

## Why you see `ERR_NAME_NOT_RESOLVED`

That error means **no DNS server on the internet knows about `chrisgordon.dev` yet**.  
It is **not** a GitHub or firewall issue.

Check from your PC:

```powershell
nslookup chrisgordon.dev 8.8.8.8
```

- **Working:** returns an IP (185.199.x.x) and/or nameservers (`*.ui-dns.*`)
- **Broken (your case):** `Non-existent domain` or `can't find chrisgordon.dev`

Compare with your working domain:

```powershell
nslookup quantum-trade.dev 8.8.8.8
```

`quantum-trade.dev` resolves today; `chrisgordon.dev` does not — fix DNS at IONOS for the new domain.

---

## IONOS setup (my.ionos.com)

You already own the domain in IONOS. Complete these steps:

### 1. Open DNS for chrisgordon.dev

1. Go to [my.ionos.com/domains](https://my.ionos.com/domains)
2. Click **`chrisgordon.dev`**
3. Click **Adjust DNS settings** (or **DNS**)

### 2. Use IONOS nameservers (required)

The domain must use **IONOS nameservers** (same pattern as `quantum-trade.dev`):

- `ns*.ui-dns.com`
- `ns*.ui-dns.org`
- `ns*.ui-dns.de`
- `ns*.ui-dns.biz`

If you switched to external nameservers (Cloudflare, etc.), either configure DNS there instead, or switch back to IONOS DNS in the domain settings.

**New registrations** can take **15 minutes to 48 hours** before the `.dev` registry publishes nameservers globally.

### 3. Delete conflicting records

Remove any existing **A**, **AAAA**, or **CNAME** on **`@`** that point elsewhere (old parking page, IONOS website builder, etc.).

### 4. Add GitHub Pages A records (all four)

Click **Add record** for each:

| Type | Host / Name | Points to | TTL |
|------|-------------|-----------|-----|
| A | `@` | `185.199.108.153` | 1 hour |
| A | `@` | `185.199.109.153` | 1 hour |
| A | `@` | `185.199.110.153` | 1 hour |
| A | `@` | `185.199.111.153` | 1 hour |

IONOS may show only one IP in the domain list summary — you still need **four separate A records** in the DNS panel.

When adding records in IONOS, **disable** “Add a DNS registry for www” on A records (add `www` separately below).

### 5. Add www CNAME (optional but recommended)

| Type | Host | Points to |
|------|------|-----------|
| CNAME | `www` | `chriscybersec76.github.io` |

### 6. Save and wait

- IONOS: status may show **“DNS settings were modified”**
- Propagation: usually **15–60 minutes**, sometimes up to **24 hours** for a brand-new `.dev`

---

## GitHub (already done in repo)

- `portfolio/CNAME` contains `chrisgordon.dev`
- Deploy workflow: `.github/workflows/portfolio-pages.yml`
- After DNS resolves, open **CONTENT-FORGE → Settings → Pages** and confirm:
  - Custom domain: `chrisgordon.dev`
  - **DNS check successful** (green)
  - **Enforce HTTPS** enabled

---

## Verify when ready

```powershell
nslookup -type=NS chrisgordon.dev 8.8.8.8
nslookup chrisgordon.dev 8.8.8.8
curl -I https://chrisgordon.dev
```

Expected: NS records appear, A record returns a GitHub IP, HTTPS returns `200`.

---

## Pin repos on GitHub profile (manual)

GitHub does not allow pinning via API. On [github.com/ChrisCyberSec76](https://github.com/ChrisCyberSec76):

1. **Customize your pins** → pin these repos:
   - **CONTENT-FORGE** (portfolio)
   - **quantum-trade-ai**
   - **malwatch-public**
2. Profile README repo **ChrisCyberSec76/ChrisCyberSec76** is already created with live links.

---

## Resume links

**Until DNS works:**

- Portfolio: https://chriscybersec76.github.io/CONTENT-FORGE/
- QTI: https://chriscybersec76.github.io/CONTENT-FORGE/dev/qti.html

**After DNS works:**

- Portfolio: https://chrisgordon.dev
- QTI: https://chrisgordon.dev/dev/qti.html
