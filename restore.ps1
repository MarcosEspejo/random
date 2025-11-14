# Script para restaurar servicio normal
Write-Host "Restaurando servicio..." -ForegroundColor Cyan

# Eliminar variable de entorno en Vercel
Write-Host "Eliminando variable VITE_MAINTENANCE_MODE de Vercel..." -ForegroundColor Cyan

"y" | vercel env rm VITE_MAINTENANCE_MODE production
"y" | vercel env rm VITE_MAINTENANCE_MODE preview
"y" | vercel env rm VITE_MAINTENANCE_MODE development

Write-Host "Variable de entorno eliminada" -ForegroundColor Green

# Redesplegar en producción
Write-Host ""
Write-Host "Desplegando cambios..." -ForegroundColor Cyan
vercel --prod

Write-Host ""
Write-Host "Servicio completamente restaurado!" -ForegroundColor Green
Write-Host "Tu app esta de nuevo en linea" -ForegroundColor Yellow
