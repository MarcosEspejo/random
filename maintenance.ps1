# Script para activar modo mantenimiento
Write-Host "🔧 Activando modo mantenimiento..." -ForegroundColor Yellow

# Verificar si ya está en mantenimiento
if (Test-Path "index.html.backup") {
    Write-Host "❌ Ya está en modo mantenimiento" -ForegroundColor Red
    exit 1
}

# Hacer backup del index actual
Move-Item -Path "index.html" -Destination "index.html.backup" -Force
Write-Host "✅ Backup creado: index.html.backup" -ForegroundColor Green

# Activar página de mantenimiento
Copy-Item -Path "maintenance.html" -Destination "index.html" -Force
Write-Host "✅ Página de mantenimiento activada" -ForegroundColor Green

# Subir cambios a Git
Write-Host "`n📤 Subiendo cambios..." -ForegroundColor Cyan
git add .
git commit -m "🔧 Activar modo mantenimiento"
git push

Write-Host "`n✅ Modo mantenimiento activado!" -ForegroundColor Green
Write-Host "📝 Para restaurar ejecuta: .\restore.ps1" -ForegroundColor Yellow
