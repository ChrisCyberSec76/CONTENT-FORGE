# chrisgordon.dev — Domain Setup

## Current status

The portfolio is **live** at:

**https://chriscybersec76.github.io/CONTENT-FORGE/**

The custom domain `chrisgordon.dev` is **not registered yet** (RDAP lookup returns 404). GitHub Pages cannot serve HTTPS on a custom domain until you own the name and point DNS at GitHub.

---

## Step 1 — Register the domain

Register `chrisgordon.dev` at any `.dev` registrar, for example:

- [Google Domains / Squarespace](https://domains.google)
- [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/)
- [Namecheap](https://www.namecheap.com)

Typical cost: ~$12–16/year for `.dev`.

---

## Step 2 — DNS A records (apex domain)

At your registrar DNS panel, add **four A records** for `@` (apex):

| Type | Name | Value |
|------|------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

Optional `www` CNAME:

| Type | Name | Value |
|------|------|-------|
| CNAME | `www` | `chriscybersec76.github.io` |

---

## Step 3 — Enable custom domain on GitHub

1. Restore `portfolio/CNAME` with content: `chrisgordon.dev`
2. Push to `main` (triggers deploy workflow)
3. **CONTENT-FORGE → Settings → Pages → Custom domain:** `chrisgordon.dev`
4. Wait for DNS check + HTTPS certificate (usually 10–60 minutes)

Or via API after DNS propagates:

```powershell
# After portfolio/CNAME is restored and pushed
curl -X PUT -H "Authorization: Bearer YOUR_TOKEN" `
  -H "Accept: application/vnd.github+json" `
  -H "Content-Type: application/json" `
  -d '{"cname":"chrisgordon.dev","build_type":"workflow"}' `
  https://api.github.com/repos/ChrisCyberSec76/CONTENT-FORGE/pages
```

---

## Verify

```powershell
Resolve-DnsName chrisgordon.dev -Server 8.8.8.8
curl -I https://chrisgordon.dev
```

Site should return `200` with your portfolio HTML.
