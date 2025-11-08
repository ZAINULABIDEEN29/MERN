# MERN Todo Application

A full-stack Todo application built with MongoDB, Express, React, and Node.js (MERN stack).

## Features

- ✅ User Authentication (Login/Register)
- ✅ JWT-based authentication with HTTP-only cookies
- ✅ Create, Read, Update, Delete Todos
- ✅ User-specific todos
- ✅ Modern UI with Tailwind CSS
- ✅ Dockerized application
- ✅ CI/CD Pipeline with GitHub Actions

## Tech Stack

### Frontend
- React 19
- TypeScript
- Redux Toolkit
- React Router
- Tailwind CSS
- Vite
- Axios

### Backend
- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)
- JWT Authentication
- Zod Validation
- Bcrypt

### DevOps
- Docker
- Docker Compose
- GitHub Actions
- Nginx

## Quick Start

### Prerequisites

- Node.js (v20 or higher)
- MongoDB (or use Docker)
- Docker and Docker Compose (optional)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MernTodo
   ```

2. **Install dependencies**
   ```bash
   # Server
   cd server
   npm install
   
   # Client
   cd ../client
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Server - Create .env file in server directory
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/mern_todo
   CLIENT_URL=http://localhost:5173
   JWT_SECRET=your-secret-key
   NODE_ENV=development
   
   # Client - Create .env file in client directory
   VITE_BACKEND_URL=http://localhost:3000
   ```

4. **Start MongoDB** (if not using Docker)
   ```bash
   mongod
   ```

5. **Start the application**
   ```bash
   # Terminal 1 - Server
   cd server
   npm run dev
   
   # Terminal 2 - Client
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

### Docker Setup

See [DOCKER.md](./DOCKER.md) for detailed Docker setup instructions.

**Quick start with Docker:**
```bash
# Using setup script (Linux/Mac)
chmod +x scripts/setup.sh
./scripts/setup.sh

# Or using setup script (Windows)
.\scripts\setup.ps1

# Or manually
docker-compose up -d
```

## Project Structure

```
MernTodo/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── features/      # Redux slices
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── store/         # Redux store
│   └── Dockerfile
├── server/                 # Backend Express application
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # Express routes
│   │   ├── services/      # Business logic
│   │   ├── middlewares/   # Express middlewares
│   │   └── validator/     # Zod schemas
│   └── Dockerfile
├── docker-compose.yml      # Docker Compose configuration
├── .github/
│   └── workflows/         # GitHub Actions CI/CD
└── scripts/               # Setup scripts
```

## API Endpoints

### Authentication
- `POST /api/users/create` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile
- `GET /api/users/logout` - Logout user

### Todos
- `GET /api/todos/get-todos` - Get all user todos
- `GET /api/todos/get-todo/:id` - Get single todo
- `POST /api/todos/create-todo` - Create new todo
- `PUT /api/todos/update-todo/:id` - Update todo
- `DELETE /api/todos/delete-todo/:id` - Delete todo

## Environment Variables

### Server
- `PORT` - Server port (default: 3000)
- `MONGO_URI` - MongoDB connection string
- `CLIENT_URL` - Frontend URL for CORS
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)

### Client
- `VITE_BACKEND_URL` - Backend API URL

## Scripts

### Server
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code

## CI/CD Pipeline

The application includes a GitHub Actions workflow that:
1. Lints and tests code on push/PR
2. Builds Docker images
3. Pushes to GitHub Container Registry
4. Deploys to production (configure deployment steps)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, email support@example.com or open an issue in the repository.

