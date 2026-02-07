# ContentForge AI — Public Showcase

ContentForge is a **full-stack AI application showcase** demonstrating frontend UX concepts, backend APIs, and AI-powered content workflows.  
This repository is intentionally designed to **show architecture, contracts, and outputs** without exposing proprietary logic, prompts, models, or credentials.

🔗 Website: https://contentforge-ai.io

---

## Purpose of This Repository

This is a **public showcase** repository.

It exists to demonstrate:

- System and API design for an AI content platform
- Backend architecture using FastAPI and Pydantic
- Interface-based service boundaries for AI providers
- End-to-end content workflows (prompt → media → post)
- Example outputs that show what the app can produce

It does **not** include:

- Production prompts or prompt-engineering logic
- AI provider SDK implementations
- Orchestration, retry, or cost logic
- Authentication secrets, API keys, or `.env` files
- Billing, admin, or approval backends

---

## Repository Structure

content-forge-public/
├── backend/ # Showcase FastAPI backend (mock logic only)
├── docs/ # Architecture and pipeline documentation
├── examples/ # Example JSON + example output media
│ └── media/ # Sample generated videos
├── .github/ # CI workflow
├── README.md
└── requirements.txt


Each folder is intentionally scoped to illustrate **how the system works**, not how production is implemented.

---

## Architecture Overview

At a high level, ContentForge is built around a **single-prompt → post-ready asset** pipeline.

1. A user submits a prompt
2. The system generates media assets (video, optional voiceover, optional music)
3. Assets are composed into a final post
4. A job-based response is returned to the client

In this public repo:

- API routes exist
- Request/response schemas are real
- Service interfaces are defined
- Implementations return mock data only

See:
- `docs/ARCHITECTURE.md`
- `docs/MEDIA_GENERATION_PIPELINE.md`
- `docs/ACCESS_AND_AUTH.md`

---

## Example: Build a Post From One Prompt

To make the system concrete, this repository includes a **real example output artifact**.

### 🎬 Single-Prompt Video Example

👉 **[View example video](examples/media/single_prompt_video_example.mp4)**

This video is a **reference output** for the core use case:

**one text prompt → full video post**

In the production application, a single prompt is processed through the media pipeline (video generation, optional voiceover, optional music, and composition) to produce a post-ready asset.  
This file represents the **final output** of that process and is included so reviewers can see what the app produces end-to-end.

> ⚠️ This repository contains example outputs only.  
> Production prompts, providers, orchestration logic, and credentials are intentionally excluded.

---

## Example Data (JSON Contracts)

The `examples/` folder contains request and response samples that mirror production API contracts:

- `access_response_example.json` – access/approval response
- `subscription_response_example.json` – subscription and credits response
- `voiceover_request_example.json` – voiceover generation request
- `video_generate_request_example.json` – video generation request
- `media_compose_request_example.json` – multi-clip composition request
- `api_response_example.json` – combined API response examples

These examples show **what the API expects and returns**, without performing real generation.

---

## Quick Start (Showcase API)

You can run the showcase backend locally to explore the API shape.

### Requirements
- Python 3.11+

### Setup

```bash
git clone https://github.com/ChrisCyberSec76/CONTENT-FORGE.git
cd CONTENT-FORGE
pip install -r requirements.txt

Run
uvicorn backend.app:app --reload
