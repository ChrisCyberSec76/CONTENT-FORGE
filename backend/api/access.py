"""
Access & Subscription Endpoints (MOCK)

These interfaces mirror the production approved-users and subscription model.
Actual implementation is private and licensed.
"""

from fastapi import APIRouter
from backend.models.schemas import AccessResponse, SubscriptionResponse

router = APIRouter()


@router.get("/access", response_model=AccessResponse)
async def get_my_access():
    """
    Get current user access status (MOCK).
    Production: requires X-User-Id or Authorization; checks approved-users list.
    """
    return AccessResponse(
        user_id="showcase-user",
        approved=True,
        status="full",
        note="Mock response for showcase. Production uses approved-users and Base44."
    )


@router.get("/subscription", response_model=SubscriptionResponse)
async def get_my_subscription():
    """
    Get current user subscription / credits (MOCK).
    Production: integrates with credits and optional billing.
    """
    return SubscriptionResponse(
        user_id="showcase-user",
        credits_remaining=100,
        tier="showcase",
        note="Mock response. Production credits and billing are private."
    )
