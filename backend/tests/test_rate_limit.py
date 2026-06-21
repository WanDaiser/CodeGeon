from __future__ import annotations

from redis.exceptions import RedisError

from app.services.rate_limit import ExecutionRateLimiter


class OfflineRedis:
    async def incr(self, key: str) -> int:
        raise RedisError("offline")


async def test_rate_limiter_falls_back_when_redis_is_unavailable() -> None:
    limiter = ExecutionRateLimiter(limit=2, window_seconds=60)
    limiter.redis = OfflineRedis()  # type: ignore[assignment]
    assert (await limiter.allow("learner"))[0] is True
    assert (await limiter.allow("learner"))[0] is True
    allowed, retry_after = await limiter.allow("learner")
    assert allowed is False
    assert retry_after > 0
