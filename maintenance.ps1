# Script para activar modo mantenimiento
Write-Host "Activando modo mantenimiento..." -ForegroundColor Yellow

# Configurar variable de entorno en Vercel
Write-Host "Agregando variable VITE_MAINTENANCE_MODE=true en Vercel..." -ForegroundColor Cyan

# Crear archivo temporal con el valor
"true" | Out-File -FilePath ".\.maintenance_mode" -NoNewline -Encoding utf8

# Agregar variable en Vercel para todos los entornos
Get-Content ".\.maintenance_mode" | vercel env add VITE_MAINTENANCE_MODE production
Get-Content ".\.maintenance_mode" | vercel env add VITE_MAINTENANCE_MODE preview
Get-Content ".\.maintenance_mode" | vercel env add VITE_MAINTENANCE_MODE development

# Limpiar archivo temporal
Remove-Item -Path ".\.maintenance_mode" -Force -ErrorAction SilentlyContinue

Write-Host "Variable de entorno configurada" -ForegroundColor Green

# Redesplegar en producción
Write-Host ""
Write-Host "Desplegando cambios..." -ForegroundColor Cyan
vercel --prod

Write-Host ""
Write-Host "Modo mantenimiento activado!" -ForegroundColor Green
Write-Host "Para restaurar ejecuta: .\restore.ps1" -ForegroundColor Yellow
