# Script para restaurar servicio normal
Write-Host "🔄 Restaurando servicio..." -ForegroundColor Cyan

# Eliminar variable de entorno en Vercel
Write-Host "📝 Eliminando variable VITE_MAINTENANCE_MODE de Vercel..." -ForegroundColor Cyan

vercel env rm VITE_MAINTENANCE_MODE production
vercel env rm VITE_MAINTENANCE_MODE preview
vercel env rm VITE_MAINTENANCE_MODE development

Write-Host "✅ Variable de entorno eliminada" -ForegroundColor Green

# Redesplegar en producción
Write-Host "`n🚀 Desplegando cambios..." -ForegroundColor Cyan
vercel --prod

Write-Host "`n✅ Servicio completamente restaurado!" -ForegroundColor Green
Write-Host "🌐 Tu app está de nuevo en línea" -ForegroundColor Yellow
