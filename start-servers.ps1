# PowerShell script to start both frontend and backend servers

# Start the backend server in a new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd $PSScriptRoot\backend; npm run dev"

# Start the frontend server in a new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd $PSScriptRoot\frontend; npm run dev"

Write-Host "Started both frontend and backend servers in separate windows."
Write-Host "Frontend: http://localhost:3000"
Write-Host "Backend: http://localhost:5000"