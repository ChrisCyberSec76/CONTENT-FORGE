# Access and Authentication

## Overview

Content Forge uses an **approval-based access model**: only users on the approved list (or with Base44 admin role) get full access. Auth is resolved in one place and reused across all protected routes.

---

## User Resolution

**Order of precedence:**

1. **X-User-Id** header — primary; used when the gateway or frontend has already identified the user.
2. **Authorization: Bearer &lt;token&gt;** — fallback; production may decode token to obtain user id (implementation private).

Result: a single `user_id` (or None) passed into access and generation logic.

---

## Approval Check

- **Approved users**: Listed in production config (e.g. approved-users list); not present in this repo.
- **Base44 admin**: Production can grant full access based on Base44 role; config and implementation are private.
- **TEST_MODE**: In production, optional bypass for local/testing; never enabled by default in public layer.

Response to client:

- **Approved**: `approved: true`, `status: "full"` (or similar).
- **Pending**: `approved: false`, `status: "pending"` (or limited access).

---

## Credits and Subscription

- Separate from approval: a user can be approved but have zero credits (production behavior).
- Endpoints: `/api/users/me/access` (approval + status), `/api/users/me/subscription` (credits, tier).
- In this showcase, both return mock data only; no real billing or credit logic.

---

## API Contracts (Showcase)

- **GET /api/users/me/access** → `AccessResponse`: `user_id`, `approved`, `status`, optional `note`.
- **GET /api/users/me/subscription** → `SubscriptionResponse`: `user_id`, `credits_remaining`, `tier`, optional `note`.

Headers (production; not enforced in showcase mocks):

- `X-User-Id`: preferred user identifier.
- `Authorization: Bearer <token>`: alternative when no X-User-Id.

---

## What This Repo Contains

- Interface: `AccessInterface` (is_approved, get_access_status, get_credits).
- Mock routes that return fixed showcase payloads.
- No approved-users list, no Base44 config, no real credentials.
