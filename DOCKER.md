# Docker Setup Guide

This guide explains how to build and run the MERN Todo application using Docker.

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)

## Quick Start

### Development Environment

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MernTodo
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your configuration.

3. **Start all services**
   ```bash
   docker-compose up -d
   ```

4. **View logs**
   ```bash
   # All services
   docker-compose logs -f
   
   # Specific service
   docker-compose logs -f server
   docker-compose logs -f client
   docker-compose logs -f mongodb
   ```

5. **Stop all services**
   ```bash
   docker-compose down
   ```

6. **Stop and remove volumes (clean slate)**
   ```bash
   docker-compose down -v
   ```

### Production Environment

1. **Create production environment file**
   ```bash
   cp .env.example .env.prod
   ```
   Edit `.env.prod` with production values.

2. **Start production services**
   ```bash
   docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d
   ```

## Services

### MongoDB
- Port: 27017
- Default credentials: admin/password (change in production!)
- Data persistence: Docker volume `mongodb_data`

### Server (Backend)
- Port: 3000
- Environment: Development mode with hot reload
- Depends on: MongoDB

### Client (Frontend)
- Port: 5173 (development) or 80 (production)
- Development: Vite dev server with hot reload
- Production: Nginx serving static files
- Depends on: Server

## Building Individual Images

### Build Server Image
```bash
cd server
docker build -t mern-todo-server:latest .
```

### Build Client Image
```bash
cd client
docker build -t mern-todo-client:latest --build-arg VITE_BACKEND_URL=http://localhost:3000 .
```

## Environment Variables

### Server
- `PORT`: Server port (default: 3000)
- `MONGO_URI`: MongoDB connection string
- `CLIENT_URL`: Frontend URL for CORS
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Environment (development/production)

### Client
- `VITE_BACKEND_URL`: Backend API URL

### MongoDB
- `MONGO_USERNAME`: MongoDB root username
- `MONGO_PASSWORD`: MongoDB root password
- `MONGO_DB_NAME`: Database name

## Troubleshooting

### Port Already in Use
If ports are already in use, modify the port mappings in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Change host port
```

### Database Connection Issues
1. Check if MongoDB container is running: `docker-compose ps`
2. Check MongoDB logs: `docker-compose logs mongodb`
3. Verify MONGO_URI in environment variables

### Client Not Connecting to Server
1. Verify `VITE_BACKEND_URL` matches server URL
2. Check CORS settings in server
3. Ensure both containers are on the same network

### Rebuild After Code Changes
```bash
# Rebuild and restart
docker-compose up -d --build

# Rebuild specific service
docker-compose up -d --build server
```

## Production Deployment

### Security Checklist
- [ ] Change default MongoDB credentials
- [ ] Use strong JWT_SECRET
- [ ] Enable HTTPS
- [ ] Set up proper firewall rules
- [ ] Use secrets management (Docker secrets, etc.)
- [ ] Enable MongoDB authentication
- [ ] Set up proper logging
- [ ] Configure backup strategy

### Health Checks
All services include health checks. Monitor with:
```bash
docker-compose ps
```

### Backup MongoDB
```bash
# Backup
docker exec mern-todo-mongodb mongodump --out /backup

# Restore
docker exec -i mern-todo-mongodb mongorestore /backup
```

## CI/CD Integration

The GitHub Actions workflow automatically:
1. Lints and tests code
2. Builds Docker images
3. Pushes to GitHub Container Registry
4. Deploys to production (configure deployment steps)

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [MongoDB Docker Image](https://hub.docker.com/_/mongo)
- [Node.js Docker Image](https://hub.docker.com/_/node)
- [Nginx Docker Image](https://hub.docker.com/_/nginx)

