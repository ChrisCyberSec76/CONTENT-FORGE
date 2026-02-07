"""
Data Schemas

Pydantic models defining API contracts and data structures.
These schemas mirror the production system's data contracts.
"""

from pydantic import BaseModel, Field
from typing import Optional, List


# ----- Access & Auth -----


class AccessResponse(BaseModel):
    """User access status (approved-users model)."""
    user_id: str
    approved: bool
    status: str  # full | pending | ...
    note: Optional[str] = None


class SubscriptionResponse(BaseModel):
    """User subscription / credits (mock)."""
    user_id: str
    credits_remaining: int
    tier: str
    note: Optional[str] = None


# ----- Video -----


class VideoGenerateRequest(BaseModel):
    """Long-form video generation request contract."""
    prompt: Optional[str] = None
    duration_seconds: Optional[int] = None
    style: Optional[str] = None


class VideoGenerateResponse(BaseModel):
    """Video generation job response."""
    job_id: str
    status: str
    message: Optional[str] = None


# ----- Voiceover -----


class VoiceoverRequest(BaseModel):
    """Voiceover generation request contract."""
    text: str
    voice_id: Optional[str] = None
    language: Optional[str] = None


class VoiceoverResponse(BaseModel):
    """Voiceover generation job response."""
    job_id: str
    status: str
    message: Optional[str] = None


# ----- Music -----


class MusicGenerateRequest(BaseModel):
    """Music generation request contract."""
    style: Optional[str] = None
    duration_seconds: Optional[int] = None
    mood: Optional[str] = None


class MusicGenerateResponse(BaseModel):
    """Music generation job response."""
    job_id: str
    status: str
    message: Optional[str] = None


# ----- Media Compose (multi-clip) -----


class MediaComposeRequest(BaseModel):
    """Multi-clip media composition request contract."""
    clips: List[dict] = Field(default_factory=list)
    output_format: Optional[str] = None


class MediaComposeResponse(BaseModel):
    """Media composition job response."""
    job_id: str
    status: str
    message: Optional[str] = None
