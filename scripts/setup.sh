#!/bin/bash

# MERN Todo Application Setup Script

set -e

echo "🚀 Setting up MERN Todo Application..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✅ .env file created. Please edit it with your configuration."
    else
        echo "⚠️  .env.example not found. Creating basic .env file..."
        cat > .env << EOF
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
EOF
    fi
else
    echo "✅ .env file already exists."
fi

# Build and start containers
echo "🏗️  Building Docker images..."
docker-compose build

echo "🚀 Starting containers..."
docker-compose up -d

echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if services are running
echo "📊 Checking service status..."
docker-compose ps

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Services:"
echo "   - Frontend: http://localhost"
echo "   - Backend: http://localhost:3000"
echo "   - MongoDB: localhost:27017"
echo ""
echo "📋 Useful commands:"
echo "   - View logs: docker-compose logs -f"
echo "   - Stop services: docker-compose down"
echo "   - Restart services: docker-compose restart"
echo "   - Rebuild: docker-compose up -d --build"
echo ""

