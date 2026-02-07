"""
Generation Interface

Abstract interface for media generation (video, voiceover, music).
Production implementation includes:
- Runway / Leonardo / VEO for video
- ElevenLabs / OpenAI for voiceover
- Music service and media composition (MoviePy, FFmpeg)
- 402 and credits handling
"""

from abc import ABC, abstractmethod
from typing import Any, Dict, Optional


class VideoGenerationInterface(ABC):
    """
    Abstract interface for long-form video generation.

    Production uses Runway, Leonardo, VEO, etc. Actual implementation is private.
    """

    @abstractmethod
    async def generate_long(self, prompt: str, **kwargs: Any) -> Dict[str, Any]:
        """
        Submit long-form video generation job.

        Args:
            prompt: Text prompt for generation
            **kwargs: Duration, style, etc.

        Returns:
            dict: job_id, status, optional poll URL
        """
        ...


class VoiceoverGenerationInterface(ABC):
    """
    Abstract interface for voiceover generation.

    Production uses ElevenLabs, OpenAI TTS, etc. Actual implementation is private.
    """

    @abstractmethod
    async def generate(self, text: str, voice_id: Optional[str] = None, **kwargs: Any) -> Dict[str, Any]:
        """
        Submit voiceover generation job.

        Args:
            text: Script text
            voice_id: Optional voice identifier
            **kwargs: Language, speed, etc.

        Returns:
            dict: job_id, status, optional audio URL when ready
        """
        ...


class GenerationStub:
    """
    Stub implementation for showcase only.
    No real API calls or keys; demonstrates the contract.
    """

    async def generate_long(self, prompt: str, **kwargs: Any) -> Dict[str, Any]:
        """Stub: no real video generation."""
        return {"job_id": "stub-video-001", "status": "stub", "message": "Showcase only"}

    async def generate_voiceover(self, text: str, **kwargs: Any) -> Dict[str, Any]:
        """Stub: no real voiceover generation."""
        return {"job_id": "stub-voice-001", "status": "stub", "message": "Showcase only"}
