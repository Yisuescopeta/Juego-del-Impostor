# Actualizar App Nativa
Write-Host "🔄 Actualizando aplicación nativa..." -ForegroundColor Cyan

# 1. Construir web
Write-Host "📦 Construyendo versión web..." -ForegroundColor Yellow
npm run build

# 2. Sincronizar con Android
Write-Host "📲 Sincronizando con Android..." -ForegroundColor Yellow
npx cap sync android

Write-Host "✅ ¡Listo! Abre Android Studio para generar el nuevo APK" -ForegroundColor Green
Write-Host "   (O ejecuta 'npx cap open android')" -ForegroundColor Gray
