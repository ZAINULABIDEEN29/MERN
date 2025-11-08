# Build Troubleshooting Guide

## Common Build Issues

### 1. TypeScript Compilation Errors

If you're getting TypeScript compilation errors:

1. **Check TypeScript version compatibility**
   ```bash
   npm list typescript
   ```

2. **Test build locally**
   ```bash
   cd server
   npm run build
   ```

3. **Check for type errors**
   ```bash
   npx tsc --noEmit
   ```

### 2. Missing Dependencies

If build fails due to missing dependencies:

1. **Clean install**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check package.json**
   - Ensure all dependencies are listed
   - Check for peer dependency warnings

### 3. Environment Variables

If build fails due to missing environment variables:

1. **Server**: No build-time env vars needed (uses .env at runtime)
2. **Client**: Ensure `VITE_BACKEND_URL` is set in GitHub Secrets or as build arg

### 4. Docker Build Issues

If Docker build fails:

1. **Test Docker build locally**
   ```bash
   # Server
   docker build -t test-server ./server
   
   # Client
   docker build -t test-client --build-arg VITE_BACKEND_URL=http://localhost:3000 ./client
   ```

2. **Check Docker logs**
   ```bash
   docker build --progress=plain -t test-server ./server 2>&1 | tee build.log
   ```

3. **Verify .dockerignore**
   - Ensure important files aren't being ignored
   - Check that source files are being copied

### 5. GitHub Actions Build Issues

If CI/CD build fails:

1. **Check workflow logs**
   - Go to Actions tab in GitHub
   - Click on failed workflow
   - Check build step logs

2. **Verify secrets**
   - `VITE_BACKEND_URL` (optional, has default)
   - `GITHUB_TOKEN` (automatically provided)

3. **Check image name**
   - Repository name is converted to lowercase
   - Format: `ghcr.io/username/repository-server:latest`

## Debugging Steps

### Step 1: Test Local Build

```bash
# Server
cd server
npm install
npm run build

# Client
cd client
npm install
npm run build
```

### Step 2: Test Docker Build Locally

```bash
# Build server
docker build -t mern-todo-server:test ./server

# Build client
docker build -t mern-todo-client:test --build-arg VITE_BACKEND_URL=http://localhost:3000 ./client
```

### Step 3: Check TypeScript Configuration

```bash
# Check for TypeScript errors
cd server
npx tsc --noEmit

# Check TypeScript version
npx tsc --version
```

### Step 4: Verify File Structure

```bash
# Check if all source files are present
ls -la server/src/
ls -la client/src/

# Check if dist directory is created after build
ls -la server/dist/
ls -la client/dist/
```

## Common Fixes

### Fix 1: TypeScript Strict Mode

If TypeScript strict mode is causing issues, you can temporarily disable it:

```json
// server/tsconfig.json
{
  "compilerOptions": {
    "strict": false
  }
}
```

### Fix 2: Missing Type Definitions

Install missing type definitions:

```bash
npm install --save-dev @types/node @types/express
```

### Fix 3: Module Resolution Issues

If you have module resolution issues:

```json
// server/tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  }
}
```

### Fix 4: Build Cache Issues

Clear build cache:

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Docker build cache
docker builder prune
```

## Getting Help

If you're still having issues:

1. **Check GitHub Actions logs** for detailed error messages
2. **Test builds locally** to isolate the issue
3. **Check TypeScript errors** with `npx tsc --noEmit`
4. **Verify Docker builds** work locally before pushing

## Useful Commands

```bash
# Test server build
cd server && npm run build

# Test client build
cd client && npm run build

# Docker build with verbose output
docker build --progress=plain --no-cache -t test ./server

# Check TypeScript errors
npx tsc --noEmit --pretty

# List Docker images
docker images

# Check Docker build logs
docker build 2>&1 | tee build.log
```

