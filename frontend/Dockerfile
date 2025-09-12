# Use Node.js 20 as the base image
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production image
FROM node:20-alpine AS production
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production

# Copy built assets from the build stage
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]