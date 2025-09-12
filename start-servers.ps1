# PowerShell script to start both frontend and backend servers

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

Write-Host "Starting SmartFarmGH Development Environment..." -ForegroundColor Green

# Start the backend server in a new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot\backend'; npm run dev"

# Start the frontend server in a new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot\frontend'; npm run dev"

Write-Host "Started both frontend and backend servers in separate windows." -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Backend: http://localhost:5000" -ForegroundColor Yellow
Write-Host "Press Ctrl+C in the respective windows to stop the servers." -ForegroundColor White