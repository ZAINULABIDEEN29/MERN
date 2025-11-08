# Troubleshooting 500 Internal Server Error

## Common Causes and Solutions

### 1. Missing JWT_SECRET in .env

**Error**: `JWT_SECRET is not defined`

**Solution**: Add JWT_SECRET to your `server/.env` file:
```env
JWT_SECRET=your_secret_key_here_make_it_long_and_random
```

### 2. MongoDB Connection Issues

**Error**: `Error connecting to database` or `MongooseError`

**Solution**: 
- Verify your `MONGO_URI` in `server/.env` is correct
- Make sure your MongoDB Atlas cluster is running
- Check that your IP is whitelisted in MongoDB Atlas (use `0.0.0.0/0` for development)
- Verify your database user has the correct permissions

### 3. Port Mismatch

**Error**: Frontend can't connect to backend

**Solution**: 
- Check what port your backend is running on (check server logs)
- Update `client/.env` or `client/src/config/config.ts`:
```env
VITE_BACKEND_URL=http://localhost:8000
```
(Replace 8000 with your actual backend port)

### 4. Validation Errors

**Error**: `Validation Failed`

**Solution**: 
- Check that all required fields are provided
- Username: 2-40 characters
- Email: Valid email format
- Password: 8-40 characters

### 5. User Already Exists

**Error**: `User already exists`

**Solution**: 
- Use a different email address
- Or login with existing credentials

### 6. CORS Issues

**Error**: CORS errors in browser console

**Solution**: 
- Verify backend CORS is configured for `http://localhost:5173`
- Check that `credentials: true` is set in both frontend and backend

## Checking Server Logs

When you see a 500 error, check your server terminal for the actual error message. The server will log:
- Database connection errors
- Validation errors
- JWT errors
- Other runtime errors

## Testing Backend Manually

You can test the backend API directly using curl or Postman:

```bash
# Register a user
curl -X POST http://localhost:8000/api/users/create \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:8000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  -c cookies.txt
```

## Environment Variables Checklist

Make sure your `server/.env` has:
- ✅ `PORT=8000` (or your preferred port)
- ✅ `MONGO_URI=your_mongodb_connection_string`
- ✅ `JWT_SECRET=your_secret_key`

Make sure your `client/.env` has:
- ✅ `VITE_BACKEND_URL=http://localhost:8000` (match your backend port)

