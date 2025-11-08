# MERN Todo Application Setup Script for Windows

Write-Host "🚀 Setting up MERN Todo Application..." -ForegroundColor Cyan

# Check if Docker is installed
try {
    $null = docker --version
    Write-Host "✅ Docker is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not installed. Please install Docker Desktop first." -ForegroundColor Red
    exit 1
}

# Check if Docker Compose is installed
try {
    $null = docker-compose --version
    Write-Host "✅ Docker Compose is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker Compose is not installed. Please install Docker Compose first." -ForegroundColor Red
    exit 1
}

# Create .env file if it doesn't exist
if (-Not (Test-Path .env)) {
    Write-Host "📝 Creating .env file from .env.example..." -ForegroundColor Yellow
    if (Test-Path .env.example) {
        Copy-Item .env.example .env
        Write-Host "✅ .env file created. Please edit it with your configuration." -ForegroundColor Green
    } else {
        Write-Host "⚠️  .env.example not found. Creating basic .env file..." -ForegroundColor Yellow
        @"
# Server Environment Variables
PORT=3000
MONGO_URI=mongodb://admin:password@mongodb:27017/mern_todo?authSource=admin
CLIENT_URL=http://localhost:5173
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development

# MongoDB Environment Variables
MONGO_USERNAME=admin
MONGO_PASSWORD=password
MONGO_DB_NAME=mern_todo

# Client Environment Variables
VITE_BACKEND_URL=http://localhost:3000
"@ | Out-File -FilePath .env -Encoding utf8
    }
} else {
    Write-Host "✅ .env file already exists." -ForegroundColor Green
}

# Build and start containers
Write-Host "🏗️  Building Docker images..." -ForegroundColor Cyan
docker-compose build

Write-Host "🚀 Starting containers..." -ForegroundColor Cyan
docker-compose up -d

Write-Host "⏳ Waiting for services to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Check if services are running
Write-Host "📊 Checking service status..." -ForegroundColor Cyan
docker-compose ps

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Services:" -ForegroundColor Cyan
Write-Host "   - Frontend: http://localhost"
Write-Host "   - Backend: http://localhost:3000"
Write-Host "   - MongoDB: localhost:27017"
Write-Host ""
Write-Host "📋 Useful commands:" -ForegroundColor Cyan
Write-Host "   - View logs: docker-compose logs -f"
Write-Host "   - Stop services: docker-compose down"
Write-Host "   - Restart services: docker-compose restart"
Write-Host "   - Rebuild: docker-compose up -d --build"
Write-Host ""

