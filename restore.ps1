# Script para restaurar servicio normal
Write-Host "Restaurando servicio..." -ForegroundColor Cyan

# Verificar si hay backup
if (-not (Test-Path "index.html.backup")) {
    Write-Host "No hay backup. La app ya esta activa." -ForegroundColor Red
    exit 1
}

# Restaurar index original
Copy-Item -Path "index.html.backup" -Destination "index.html" -Force
Write-Host "Servicio restaurado" -ForegroundColor Green

# Eliminar backup
Remove-Item -Path "index.html.backup" -Force
Write-Host "Backup eliminado" -ForegroundColor Green

# Subir cambios a Git
Write-Host ""
Write-Host "Subiendo cambios..." -ForegroundColor Cyan
git add index.html
git commit -m "Restaurar servicio normal"
git push

Write-Host ""
Write-Host "Servicio completamente restaurado!" -ForegroundColor Green
Write-Host "Tu app esta de nuevo en linea" -ForegroundColor Yellow
