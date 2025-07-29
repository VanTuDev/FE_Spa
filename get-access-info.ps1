# YUMI SPA - Docker Access Information Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    YUMI SPA - DOCKER ACCESS INFO" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check Docker container status
Write-Host "[1] Checking Docker container status..." -ForegroundColor Yellow
$containerStatus = docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | Select-String "yumi-spa-frontend"

if ($containerStatus) {
    Write-Host "✅ Container is running!" -ForegroundColor Green
    Write-Host $containerStatus -ForegroundColor Gray
} else {
    Write-Host "❌ Container is not running!" -ForegroundColor Red
    Write-Host "Starting container..." -ForegroundColor Yellow
    docker-compose up -d
    Start-Sleep -Seconds 3
}

Write-Host ""
Write-Host "[2] Getting your IP address..." -ForegroundColor Yellow

# Get IP addresses
$ipAddresses = @()
$networkInterfaces = Get-NetIPAddress | Where-Object { $_.AddressFamily -eq "IPv4" -and $_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.*" }

foreach ($interface in $networkInterfaces) {
    $ipAddresses += $interface.IPAddress
}

if ($ipAddresses.Count -gt 0) {
    Write-Host "✅ Found IP addresses:" -ForegroundColor Green
    foreach ($ip in $ipAddresses) {
        Write-Host "   $ip" -ForegroundColor White
    }
    
    Write-Host ""
    Write-Host "🌐 Access URLs:" -ForegroundColor Cyan
    Write-Host "   Local:  http://localhost:3000" -ForegroundColor White
    foreach ($ip in $ipAddresses) {
        Write-Host "   Network: http://$ip`:3000" -ForegroundColor White
    }
    
    Write-Host ""
    Write-Host "📱 Other devices on the same network can access:" -ForegroundColor Cyan
    foreach ($ip in $ipAddresses) {
        Write-Host "   http://$ip`:3000" -ForegroundColor Green
    }
} else {
    Write-Host "❌ No IP addresses found!" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 