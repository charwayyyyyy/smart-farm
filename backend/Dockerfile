# Use Node.js 20 as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install --only=production

# Copy source code
COPY . .

# Create a .env file if it doesn't exist
RUN touch .env

# Expose the port the app will run on
EXPOSE 5000

# Start the application
CMD ["npm", "start"]