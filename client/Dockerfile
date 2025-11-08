# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build arguments for environment variables
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL:-http://localhost:3000}

# Verify environment variable is set
RUN echo "Building with VITE_BACKEND_URL=${VITE_BACKEND_URL}"

# Build the application with verbose output
RUN echo "Starting Vite build..." && \
    npm run build && \
    echo "Build completed successfully" && \
    ls -la dist/ || (echo "Build failed - dist directory not found" && exit 1)

# Production stage with nginx
FROM nginx:alpine

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

