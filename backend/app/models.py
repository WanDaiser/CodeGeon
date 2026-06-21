from __future__ import annotations

from datetime import datetime
from enum import Enum

from sqlalchemy import Boolean, DateTime, Enum as SqlEnum, ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class ProgressStatus(str, Enum):
    LOCKED = "locked"
    AVAILABLE = "available"
    COMPLETE = "complete"


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String(320), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    display_name: Mapped[str] = mapped_column(String(80))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    progress: Mapped[list[Progress]] = relationship(back_populates="user", cascade="all, delete-orphan")
    stars: Mapped[list[Star]] = relationship(back_populates="user", cascade="all, delete-orphan")


class Level(Base):
    __tablename__ = "levels"
    __table_args__ = (UniqueConstraint("world_id", "order_index", name="uq_level_world_order"),)

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    world_id: Mapped[int] = mapped_column(Integer, index=True)
    order_index: Mapped[int] = mapped_column(Integer)
    title: Mapped[str] = mapped_column(String(120))
    concept: Mapped[str] = mapped_column(String(80))
    is_capstone: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    challenge: Mapped[Challenge] = relationship(back_populates="level", cascade="all, delete-orphan")
    progress_records: Mapped[list[Progress]] = relationship(back_populates="level", cascade="all, delete-orphan")
    stars: Mapped[list[Star]] = relationship(back_populates="level", cascade="all, delete-orphan")


class Challenge(Base):
    __tablename__ = "challenges"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    level_id: Mapped[int] = mapped_column(ForeignKey("levels.id"), unique=True, index=True)
    mascot_line: Mapped[str] = mapped_column(String(300))
    task_description: Mapped[str] = mapped_column(Text)
    starter_code: Mapped[str] = mapped_column(Text, default="")
    hidden_tests: Mapped[list[dict[str, str]]] = mapped_column(JSONB, default=list)
    error_hints: Mapped[dict[str, str]] = mapped_column(JSONB, default=dict)
    bonus: Mapped[dict | None] = mapped_column(JSONB, nullable=True)

    level: Mapped[Level] = relationship(back_populates="challenge")


class Progress(Base):
    __tablename__ = "progress"
    __table_args__ = (UniqueConstraint("user_id", "level_id", name="uq_progress_user_level"),)

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    level_id: Mapped[int] = mapped_column(ForeignKey("levels.id"), index=True)
    status: Mapped[ProgressStatus] = mapped_column(SqlEnum(ProgressStatus), default=ProgressStatus.AVAILABLE)
    attempts: Mapped[int] = mapped_column(Integer, default=0)
    completed_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user: Mapped[User] = relationship(back_populates="progress")
    level: Mapped[Level] = relationship(back_populates="progress_records")


class Star(Base):
    __tablename__ = "stars"
    __table_args__ = (UniqueConstraint("user_id", "level_id", "kind", name="uq_star_user_level_kind"),)

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    level_id: Mapped[int] = mapped_column(ForeignKey("levels.id"), index=True)
    kind: Mapped[str] = mapped_column(String(20), default="completion")
    earned_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped[User] = relationship(back_populates="stars")
    level: Mapped[Level] = relationship(back_populates="stars")
