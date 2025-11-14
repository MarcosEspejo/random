# Script para activar modo mantenimiento
Write-Host "🔧 Activando modo mantenimiento..." -ForegroundColor Yellow

# Configurar variable de entorno en Vercel
Write-Host "📝 Agregando variable VITE_MAINTENANCE_MODE=true en Vercel..." -ForegroundColor Cyan

# Crear archivo temporal con el valor
"true" | Out-File -FilePath ".maintenance_mode" -NoNewline -Encoding utf8

# Agregar variable en Vercel para todos los entornos
vercel env add VITE_MAINTENANCE_MODE production < .maintenance_mode
vercel env add VITE_MAINTENANCE_MODE preview < .maintenance_mode
vercel env add VITE_MAINTENANCE_MODE development < .maintenance_mode

# Limpiar archivo temporal
Remove-Item -Path ".maintenance_mode" -Force

Write-Host "✅ Variable de entorno configurada" -ForegroundColor Green

# Redesplegar en producción
Write-Host "`n🚀 Desplegando cambios..." -ForegroundColor Cyan
vercel --prod

Write-Host "`n✅ Modo mantenimiento activado!" -ForegroundColor Green
Write-Host "📝 Para restaurar ejecuta: .\restore.ps1" -ForegroundColor Yellow
