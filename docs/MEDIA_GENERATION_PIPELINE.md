# Media Generation Pipeline

## Overview

Content Forge composes final media from several steps: **video** (long-form), **voiceover**, **music**, and **composition**. This doc describes the high-level flow and contracts; implementation details and provider integrations are private.

---

## Pipeline Stages

### 1. Video Generation

- **Purpose**: Long-form video from text/prompts.
- **Providers (production)**: Runway, Leonardo, VEO, etc.; 402 and credits handled internally.
- **Contract**: Request (prompt, duration_seconds, style) → Response (job_id, status).
- **Showcase**: POST `/api/video/generate-long` returns a mock job_id; no real calls.

### 2. Voiceover Generation

- **Purpose**: Speech from text (TTS).
- **Providers (production)**: ElevenLabs, OpenAI TTS; optional guest fallback and logging.
- **Contract**: Request (text, voice_id, language) → Response (job_id, status; when ready, audio URL in production).
- **Showcase**: POST `/api/voiceover/generate` returns a mock job_id.

### 3. Music Generation

- **Purpose**: Background or standalone music.
- **Production**: Internal music service; details private.
- **Contract**: Request (style, duration_seconds, mood) → Response (job_id, status).
- **Showcase**: POST `/api/music/generate` returns a mock job_id.

### 4. Media Composition

- **Purpose**: Combine multiple clips (video, voice, music) into one output.
- **Production**: MoviePy, FFmpeg, or similar; logic and formats private.
- **Contract**: Request (clips list, output_format) → Response (job_id, status).
- **Showcase**: Schema only in `models/schemas.py`; no route in minimal showcase.

---

## Flow (Production)

1. Client requests video → backend creates video job → returns job_id.
2. Client (or backend workflow) requests voiceover → voice job created → job_id.
3. Music and other assets similarly created.
4. When assets are ready, compose job is submitted with clip references.
5. Final asset URL or file is returned after composition completes.

Showcase does not implement polling or webhooks; those are part of the private implementation.

---

## Interfaces (Showcase)

- **VideoGenerationInterface**: `generate_long(prompt, **kwargs)` → dict with job_id, status.
- **VoiceoverGenerationInterface**: `generate(text, voice_id, **kwargs)` → dict with job_id, status.
- **GenerationStub**: Implements stubs for showcase only; no API keys or real calls.

---

## What This Repo Contains

- Pydantic request/response models for video, voiceover, music, and compose.
- Mock endpoints that return fixed job_id and status.
- No Runway/Leonardo/ElevenLabs/OpenAI code or credentials.
