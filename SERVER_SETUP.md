# Backend Server Setup Guide

## Issue: ERR_CONNECTION_REFUSED

This error occurs when the backend server is not running. Follow these steps to start the server:

## Step 1: Install Dependencies

```bash
cd server
npm install
```

## Step 2: Set Up Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key_here
```

### Getting MongoDB Atlas Connection String:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)
4. Replace `<password>` with your database password
5. Add the database name at the end (e.g., `?retryWrites=true&w=majority` becomes `?retryWrites=true&w=majority&appName=TodoApp`)

### JWT Secret:
Use any random string (e.g., `mySuperSecretJWTKey123!@#`)

## Step 3: Start the Server

```bash
# Development mode (with hot reload)
npm run dev

# OR Production mode
npm run build
npm start
```

## Step 4: Verify Server is Running

You should see:
```
Db Connected <your-cluster-host>
PORT Running on http://localhost:3000
```

## Step 5: Test the Server

Open your browser and go to: `http://localhost:3000`

You should see: "Server Running Successfully"

## Troubleshooting

### If you get "Cannot find module 'cors'":
```bash
npm install cors
```

### If you get "Cannot find module 'tsx'":
```bash
npm install --save-dev tsx
```

### If MongoDB connection fails:
- Check your MONGO_URI in .env file
- Make sure your MongoDB Atlas IP whitelist includes `0.0.0.0/0` (for development)
- Verify your database user has the correct permissions

### If port 3000 is already in use:
Change the PORT in your .env file to a different port (e.g., 3001) and update the frontend config accordingly.

## Running Both Frontend and Backend

### Terminal 1 - Backend:
```bash
cd server
npm run dev
```

### Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

Now your frontend should be able to connect to the backend!

