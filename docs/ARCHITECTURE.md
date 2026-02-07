# System Architecture

## Overview

Content Forge AI is an AI-driven content and video generation platform that combines approved-user access, multiple media providers (Runway, ElevenLabs, etc.), and a unified media composition pipeline. The system is designed with clear boundaries, single auth entry, and interface-based services.

---

## Core Principles

### 1. Single Auth Entry

**One place for user extraction and approval.**

- User identity is resolved from `X-User-Id` first, then `Authorization` Bearer when needed
- All protected routes use the same `get_user_from_request` pattern
- Approved-users list plus optional Base44 admin role determine full access
- TEST_MODE and admin bypass are configured in production only (not in this repo)

### 2. Approval-Based Access

**Explicit allow-list for full access.**

- Users are either **approved** (full access) or **pending** (limited)
- Admin bypass via Base44 role for support and testing
- Credits and subscription state are separate from approval (showcase: contracts only)

### 3. Media Pipeline Composition

**Video + voice + music composed in one flow.**

- **Video**: Long-form generation (Runway, Leonardo, VEO) with 402 and credits handled internally
- **Voiceover**: ElevenLabs / OpenAI TTS with optional guest fallback
- **Music**: Internal music service; showcase exposes contract only
- **Compose**: Multi-clip assembly (MoviePy, FFmpeg, etc.) — implementation private

### 4. Interface-Based Design

**Clean contracts between API, services, and providers.**

- Access: `AccessInterface` (is_approved, get_access_status, get_credits)
- Generation: `VideoGenerationInterface`, `VoiceoverGenerationInterface` (stubs in showcase)
- Data flows through Pydantic schemas (access, video, voiceover, music, compose)

---

## System Components

### Backend (FastAPI)

- **App entry**: `backend.app` — CORS, health, access, generation routes
- **Access API**: `/api/users/me/access`, `/api/users/me/subscription` (mock in showcase)
- **Generation API**: `/api/video/generate-long`, `/api/voiceover/generate`, `/api/music/generate` (mock)
- **Models**: Pydantic schemas for requests and responses
- **Services**: Abstract interfaces and stubs only; no real API keys or provider logic

### Production-Only (Not in This Repo)

- Runway / Leonardo / VEO integration and 402 handling
- ElevenLabs / OpenAI voice and guest fallback logic
- Music service and media composition implementation
- Base44 integration, credits, and billing
- Approved-users list and env configuration

---

## Data Flow (High Level)

1. **Request** → FastAPI route
2. **Auth** → Extract user (X-User-Id or Bearer); optional approval check
3. **Access** → Return access/subscription from service (production: real list and credits)
4. **Generation** → Accept request body; production submits to provider and returns job_id; showcase returns mock job_id
5. **Compose** (production) → Assemble clips into final asset; not exposed in public API contract here

---

## Security Notes (Production)

- No `.env` or real keys in this repository
- Production uses approved-users list and Base44 for admin
- TEST_MODE and 402 bypass are environment-driven and not part of the public contract

---

## Documentation Index

- [ACCESS_AND_AUTH.md](ACCESS_AND_AUTH.md) — Access model and auth extraction
- [MEDIA_GENERATION_PIPELINE.md](MEDIA_GENERATION_PIPELINE.md) — Video, voiceover, music, compose
- [ROADMAP.md](ROADMAP.md) — Future development plans
