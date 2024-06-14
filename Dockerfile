# Use a Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the application code
COPY . .

# Build the application
RUN npm run build

# Set the command to start the application
CMD ["npm", "start"]
