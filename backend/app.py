"""
FastAPI Entry Point - Public Showcase Layer

This interface mirrors the production AI content generation platform.
Actual implementation is private and licensed.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api import health, access, generation

app = FastAPI(
    title="Content Forge AI - Showcase API",
    description="Public-facing interface demonstrating system architecture",
    version="1.0.0-showcase"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Showcase only - production uses specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(health.router, prefix="/api", tags=["Health"])
app.include_router(access.router, prefix="/api/users/me", tags=["Access"])
app.include_router(generation.router, prefix="/api", tags=["Generation"])


@app.get("/")
async def root():
    """Root endpoint - API information"""
    return {
        "name": "Content Forge AI - Showcase API",
        "description": "Public-facing interface demonstrating system architecture",
        "version": "1.0.0-showcase",
        "note": "This interface mirrors the production content generation platform. Actual implementation is private and licensed.",
        "endpoints": {
            "health": "/api/health",
            "access": "/api/users/me/access",
            "subscription": "/api/users/me/subscription",
            "video": "/api/video/generate-long",
            "voiceover": "/api/voiceover/generate",
            "music": "/api/music/generate"
        }
    }
