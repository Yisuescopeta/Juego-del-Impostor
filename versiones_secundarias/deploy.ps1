# Script de Despliegue Rápido - El Impostor

Write-Host "🚀 Preparando El Impostor para distribución..." -ForegroundColor Cyan

# 1. Construir la aplicación
Write-Host "`n📦 Construyendo aplicación..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error al construir la aplicación" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Aplicación construida exitosamente" -ForegroundColor Green

# 2. Mostrar información
Write-Host "`n📊 Información de la build:" -ForegroundColor Cyan
$distSize = (Get-ChildItem -Path "dist" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Host "   Tamaño total: $([math]::Round($distSize, 2)) MB" -ForegroundColor White

# 3. Opciones de despliegue
Write-Host "`n🌐 Opciones de despliegue:" -ForegroundColor Cyan
Write-Host "   1. Netlify Drop (arrastra carpeta 'dist' a netlify.com/drop)" -ForegroundColor White
Write-Host "   2. Vercel (arrastra carpeta 'dist' a vercel.com)" -ForegroundColor White
Write-Host "   3. Servidor local (ejecuta: serve dist -l 3000)" -ForegroundColor White

# 4. Preguntar si quiere servidor local
Write-Host "`n¿Quieres iniciar un servidor local? (S/N): " -ForegroundColor Yellow -NoNewline
$respuesta = Read-Host

if ($respuesta -eq "S" -or $respuesta -eq "s") {
    Write-Host "`n🌐 Iniciando servidor local..." -ForegroundColor Cyan
    
    # Verificar si serve está instalado
    $serveInstalled = Get-Command serve -ErrorAction SilentlyContinue
    
    if (-not $serveInstalled) {
        Write-Host "📥 Instalando 'serve'..." -ForegroundColor Yellow
        npm install -g serve
    }
    
    # Obtener IP local
    $ip = (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias "Wi-Fi*" | Select-Object -First 1).IPAddress
    
    if (-not $ip) {
        $ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -notlike "127.*"} | Select-Object -First 1).IPAddress
    }
    
    Write-Host "`n✅ Servidor iniciado!" -ForegroundColor Green
    Write-Host "`n📱 Comparte esta URL con tus amigos:" -ForegroundColor Cyan
    Write-Host "   http://$ip:3000" -ForegroundColor White
    Write-Host "`n   (Deben estar en la misma red WiFi)" -ForegroundColor Gray
    Write-Host "`nPresiona Ctrl+C para detener el servidor`n" -ForegroundColor Yellow
    
    serve dist -l 3000
} else {
    Write-Host "`n📁 La carpeta 'dist' está lista para subir" -ForegroundColor Green
    Write-Host "   Abre la carpeta y arrástrala a Netlify o Vercel" -ForegroundColor White
    
    # Abrir carpeta dist
    Invoke-Item "dist"
}

Write-Host "`n✨ ¡Listo para compartir!" -ForegroundColor Green
