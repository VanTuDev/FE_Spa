# YUMI SPA - Show Access Information
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    YUMI SPA - ACCESS INFORMATION" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check container status
Write-Host "[1] Container Status:" -ForegroundColor Yellow
$container = docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | Select-String "yumi-spa-frontend"
if ($container) {
    Write-Host "✅ Running" -ForegroundColor Green
    Write-Host $container -ForegroundColor Gray
} else {
    Write-Host "❌ Not running" -ForegroundColor Red
}

Write-Host ""
Write-Host "[2] Your IP Addresses:" -ForegroundColor Yellow

# Get IP addresses
$ips = Get-NetIPAddress | Where-Object { $_.AddressFamily -eq "IPv4" -and $_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.*" }
foreach ($ip in $ips) {
    Write-Host "   $($ip.IPAddress)" -ForegroundColor White
}

Write-Host ""
Write-Host "[3] Access URLs:" -ForegroundColor Yellow
Write-Host "   Local:  http://localhost:3000" -ForegroundColor Green
foreach ($ip in $ips) {
    Write-Host "   Network: http://$($ip.IPAddress):3000" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan