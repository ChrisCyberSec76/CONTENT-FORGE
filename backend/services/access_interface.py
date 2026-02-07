"""
Access Interface

Abstract interface for approved-users and subscription/credits.
Production implementation includes:
- Approved-users list and Base44 role check
- X-User-Id / Authorization extraction
- Credits and optional billing
"""

from abc import ABC, abstractmethod
from typing import Optional


class AccessInterface(ABC):
    """
    Abstract interface for user access and approval.

    This interface mirrors the production approved-users and Base44 integration.
    Actual implementation is private and licensed.
    """

    @abstractmethod
    async def is_approved(self, user_id: str) -> bool:
        """
        Check whether the user is in the approved-users list or has Base44 admin.

        Args:
            user_id: User identifier (from X-User-Id or token)

        Returns:
            bool: True if user has full access
        """
        ...

    @abstractmethod
    async def get_access_status(self, user_id: str) -> dict:
        """
        Get full access status (approved, pending, etc.).

        Args:
            user_id: User identifier

        Returns:
            dict: status, approved, tier, etc.
        """
        ...

    @abstractmethod
    async def get_credits(self, user_id: str) -> Optional[int]:
        """
        Get remaining credits for the user (if applicable).

        Args:
            user_id: User identifier

        Returns:
            Optional[int]: Credits remaining or None
        """
        ...
