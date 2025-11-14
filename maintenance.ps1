# Script para activar modo mantenimiento
Write-Host "Activando modo mantenimiento..." -ForegroundColor Yellow

# Verificar si ya está en mantenimiento
if (Test-Path "index.html.backup") {
    Write-Host "Ya esta en modo mantenimiento" -ForegroundColor Red
    exit 1
}

# Hacer backup del index actual
Copy-Item -Path "index.html" -Destination "index.html.backup" -Force
Write-Host "Backup creado: index.html.backup" -ForegroundColor Green

# Reemplazar con página de mantenimiento
Copy-Item -Path "maintenance.html" -Destination "index.html" -Force
Write-Host "Pagina de mantenimiento activada" -ForegroundColor Green

# Subir cambios a Git
Write-Host ""
Write-Host "Subiendo cambios..." -ForegroundColor Cyan
git add index.html index.html.backup
git commit -m "Activar modo mantenimiento"
git push

Write-Host ""
Write-Host "Modo mantenimiento activado!" -ForegroundColor Green
Write-Host "Para restaurar ejecuta: .\restore.ps1" -ForegroundColor Yellow
