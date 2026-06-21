$ErrorActionPreference = "Stop"

Write-Host "Starting CodeQuest..." -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Green
Write-Host "Backend:  http://localhost:8000/health" -ForegroundColor Green
Write-Host ""

docker compose up --build
