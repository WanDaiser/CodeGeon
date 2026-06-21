import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.execute import router as execute_router
from app.routers.execute import ws_router as execute_ws_router


app = FastAPI(title="CodeQuest API")

cors_origins = [origin.strip() for origin in os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(execute_router)
app.include_router(execute_ws_router)


@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}
