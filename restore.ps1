# Script para restaurar servicio normal
Write-Host "🔄 Restaurando servicio..." -ForegroundColor Cyan

# Verificar si hay backup
if (-not (Test-Path "index.html.backup")) {
    Write-Host "❌ No hay backup. La app ya está activa." -ForegroundColor Red
    exit 1
}

# Restaurar index original
Move-Item -Path "index.html.backup" -Destination "index.html" -Force
Write-Host "✅ Servicio restaurado" -ForegroundColor Green

# Subir cambios a Git
Write-Host "`n📤 Subiendo cambios..." -ForegroundColor Cyan
git add .
git commit -m "✅ Restaurar servicio normal"
git push

Write-Host "`n✅ Servicio completamente restaurado!" -ForegroundColor Green
Write-Host "🌐 Tu app está de nuevo en línea" -ForegroundColor Yellow
