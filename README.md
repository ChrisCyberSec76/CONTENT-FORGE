# 🎬 Content Forge AI – Public Showcase

> **This interface mirrors the production AI content generation platform.**  
> **Actual implementation is private and licensed.**

[![Python](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green.svg)](https://fastapi.tiangolo.com/)
[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](LICENSE)

This repository demonstrates the architecture, design patterns, and capabilities of an AI-driven content and video generation platform. It showcases engineering skill through clean interfaces, comprehensive documentation, and example contracts—without exposing proprietary implementation details.

---

## 🎯 Purpose

This is a **showcase layer** that describes how the system works, not a production-ready implementation. It demonstrates:

- **System boundaries** – Clear separation of concerns (auth, access, generation, media pipeline)
- **IP protection** – Interfaces and contracts without internals
- **Senior engineering** – Architecture-first thinking
- **Clear communication** – Complex media pipelines explained simply
- **Scalable design** – Production-grade patterns for video, voiceover, music, and composition

---

## 📁 Repository Structure

```
content-forge-public/
├── backend/                 # FastAPI backend interfaces
│   ├── app.py               # FastAPI entry point
│   ├── api/                 # API endpoints (mocked)
│   │   ├── health.py        # Health check endpoint
│   │   ├── access.py        # Access / subscription (MOCK)
│   │   └── generation.py   # Video, voiceover, music (MOCK)
│   ├── services/            # Service interfaces
│   │   ├── access_interface.py   # Access contract (abstract)
│   │   └── generation_interface.py  # Generation stub
│   └── models/              # Data schemas
│       └── schemas.py       # Pydantic models
├── docs/                    # Architecture documentation
│   ├── ARCHITECTURE.md      # System architecture
│   ├── ACCESS_AND_AUTH.md   # Access model and auth
│   ├── MEDIA_GENERATION_PIPELINE.md  # Video/voice/music flow
│   └── ROADMAP.md           # Future development plans
├── examples/                # Mock data examples
│   ├── access_response_example.json
│   ├── voiceover_request_example.json
│   ├── video_generate_request_example.json
│   ├── subscription_response_example.json
│   └── media_compose_request_example.json
├── .github/
│   └── workflows/
│       └── ci.yml           # CI workflow
├── requirements.txt         # Python dependencies
└── README.md                # This file
```

---

## 🏗️ Architecture Overview

### System Components

1. **Access & Auth** – Approved-users model; X-User-Id / Authorization; Base44 integration (showcase: interfaces only).
2. **Media Generation Pipeline** – Video (Runway/Leonardo), voiceover (ElevenLabs/OpenAI), music, and multi-clip composition.
3. **Credits & Billing** – Internal credits and optional TEST_MODE bypass (showcase: contracts only).

### Key Design Principles

- **Single entry for auth** – Consistent extraction (X-User-Id first, then Bearer) across all routes.
- **Approval-based access** – Full access or pending; optional admin bypass via Base44 role.
- **Interface-based design** – Clean contracts between API, services, and external providers.
- **Pipeline composition** – Video + voice + music composed through a single media layer.

---

## 📚 Documentation

See the `docs/` directory:

- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** – System architecture and design patterns
- **[ACCESS_AND_AUTH.md](docs/ACCESS_AND_AUTH.md)** – Access model and auth extraction
- **[MEDIA_GENERATION_PIPELINE.md](docs/MEDIA_GENERATION_PIPELINE.md)** – Video, voiceover, music, and compose flow
- **[ROADMAP.md](docs/ROADMAP.md)** – Future development plans

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/<your-org>/content-forge-public.git
cd content-forge-public

# Install dependencies
pip install -r requirements.txt

# Run the showcase API (mocked endpoints)
uvicorn backend.app:app --reload

# API at http://localhost:8000
# Interactive docs: http://localhost:8000/docs
```

### Available Endpoints (Showcase)

- `GET /` – API information
- `GET /api/health` – Health check
- `GET /api/users/me/access` – Access status (MOCK)
- `GET /api/users/me/subscription` – Subscription (MOCK)
- `POST /api/video/generate-long` – Long video request (MOCK)
- `POST /api/voiceover/generate` – Voiceover request (MOCK)
- `POST /api/music/generate` – Music request (MOCK)

---

## ⚠️ Important Notice

**This repository contains:**

- ✅ Architecture documentation
- ✅ API contracts and request/response schemas
- ✅ Design patterns and pipeline descriptions
- ✅ Mock implementations for demonstration

**This repository does NOT contain:**

- ❌ Production Runway/Leonardo/VEO integration
- ❌ Real API keys or Base44 configuration
- ❌ Proprietary media composition logic
- ❌ Actual credit or billing implementation

---

## 🛠️ Technology Stack

- **Backend**: Python 3.11+, FastAPI, AsyncIO
- **Architecture**: Interface-based design, approval-based access, media pipeline composition
- **Documentation**: Markdown, architecture docs
- **CI/CD**: GitHub Actions workflow included

---

## 📄 License

This showcase repository is provided for demonstration purposes. The production system and its implementation details remain private and proprietary.

**All Rights Reserved**
