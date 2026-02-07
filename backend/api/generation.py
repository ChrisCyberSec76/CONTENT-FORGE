"""
Media Generation Endpoints (MOCK)

These interfaces mirror the production video, voiceover, and music pipelines.
Actual implementation (Runway, ElevenLabs, etc.) is private and licensed.
"""

from fastapi import APIRouter
from backend.models.schemas import (
    VideoGenerateRequest,
    VideoGenerateResponse,
    VoiceoverRequest,
    VoiceoverResponse,
    MusicGenerateRequest,
    MusicGenerateResponse,
)

router = APIRouter()


@router.post("/video/generate-long", response_model=VideoGenerateResponse)
async def generate_long_video(request: VideoGenerateRequest):
    """
    Long-form video generation request (MOCK).
    Production: Runway / Leonardo / VEO integration; 402 and credits handled internally.
    """
    return VideoGenerateResponse(
        job_id="mock-video-job-001",
        status="accepted",
        message="Mock: production uses Runway/Leonardo/VEO. No real generation.",
    )


@router.post("/voiceover/generate", response_model=VoiceoverResponse)
async def generate_voiceover(request: VoiceoverRequest):
    """
    Voiceover generation request (MOCK).
    Production: ElevenLabs / OpenAI TTS; guest fallback and logging are private.
    """
    return VoiceoverResponse(
        job_id="mock-voice-job-001",
        status="accepted",
        message="Mock: production uses ElevenLabs/OpenAI. No real generation.",
    )


@router.post("/music/generate", response_model=MusicGenerateResponse)
async def generate_music(request: MusicGenerateRequest):
    """
    Music generation request (MOCK).
    Production: music service and media composition are private.
    """
    return MusicGenerateResponse(
        job_id="mock-music-job-001",
        status="accepted",
        message="Mock: production music and compose pipeline are private.",
    )
