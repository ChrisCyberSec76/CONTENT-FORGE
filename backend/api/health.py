"""
Health Check Endpoint

This interface mirrors the production health check system.
Actual implementation is private and licensed.
"""

from fastapi import APIRouter
from datetime import datetime

router = APIRouter()


@router.get("/health")
async def health_check():
    """
    Health check endpoint.

    Returns:
        dict: System health status
    """
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "content-forge-ai-showcase",
        "version": "1.0.0-showcase"
    }
