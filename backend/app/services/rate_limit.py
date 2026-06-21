from __future__ import annotations

import os
import time
from collections import defaultdict, deque

from redis.asyncio import Redis
from redis.exceptions import RedisError


class ExecutionRateLimiter:
    def __init__(self, limit: int = 20, window_seconds: int = 60) -> None:
        self.limit = limit
        self.window_seconds = window_seconds
        self.redis = Redis.from_url(os.getenv("REDIS_URL", "redis://localhost:6379/0"), decode_responses=True)
        self.fallback: dict[str, deque[float]] = defaultdict(deque)

    async def allow(self, key: str) -> tuple[bool, int]:
        bucket = f"codequest:execute:{key}"
        try:
            count = await self.redis.incr(bucket)
            if count == 1:
                await self.redis.expire(bucket, self.window_seconds)
            ttl = await self.redis.ttl(bucket)
            return count <= self.limit, max(ttl, 1)
        except RedisError:
            return self._allow_fallback(key)

    def _allow_fallback(self, key: str) -> tuple[bool, int]:
        now = time.monotonic()
        attempts = self.fallback[key]
        while attempts and now - attempts[0] >= self.window_seconds:
            attempts.popleft()
        if len(attempts) >= self.limit:
            retry_after = max(1, int(self.window_seconds - (now - attempts[0])))
            return False, retry_after
        attempts.append(now)
        return True, self.window_seconds
