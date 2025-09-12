# SmartFarmGH Development Server Starter
# This script starts both frontend and backend servers in parallel

Write-Host "Starting SmartFarmGH Development Environment..." -ForegroundColor Green

# Function to check if a directory exists
function Test-DirectoryExists {
    param (
        [string]$Path
    )
    return Test-Path -Path $Path -PathType Container
}

# Check if frontend and backend directories exist
if (-not (Test-DirectoryExists -Path "$PSScriptRoot\frontend")) {
    Write-Host "Error: Frontend directory not found!" -ForegroundColor Red
    exit 1
}

if (-not (Test-DirectoryExists -Path "$PSScriptRoot\backend")) {
    Write-Host "Error: Backend directory not found!" -ForegroundColor Red
    exit 1
}

# Start frontend and backend in separate processes
try {
    Write-Host "Starting Frontend (Next.js)..." -ForegroundColor Cyan
    Start-Process -FilePath "powershell" -ArgumentList "-Command", "cd '$PSScriptRoot\frontend' && npm run dev" -NoNewWindow
    
    Write-Host "Starting Backend (Node.js)..." -ForegroundColor Yellow
    Start-Process -FilePath "powershell" -ArgumentList "-Command", "cd '$PSScriptRoot\backend' && npm run dev" -NoNewWindow
    
    Write-Host "\nSmartFarmGH is running!" -ForegroundColor Green
    Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
    Write-Host "Backend: http://localhost:5000" -ForegroundColor Yellow
    Write-Host "\nPress Ctrl+C to stop all servers" -ForegroundColor White
    
    # Keep the script running until user presses Ctrl+C
    while ($true) {
        Start-Sleep -Seconds 1
    }
}
finally {
    # This will execute when the user presses Ctrl+C
    Write-Host "\nStopping all servers..." -ForegroundColor Red
    Get-Process -Name "node" | Where-Object { $_.CommandLine -like "*next*" -or $_.CommandLine -like "*backend*" } | Stop-Process -Force
    Write-Host "All servers stopped." -ForegroundColor Green
}