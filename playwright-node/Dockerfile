# Use the official Playwright image
FROM mcr.microsoft.com/playwright:v1.50.0-noble AS base

# Set working directory
WORKDIR /usr/src/app

# Create a non-root user and group
RUN groupadd -r node && useradd -r -g node node

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the source files
COPY . .

# Build the application
RUN npm run build

# Run as a non-root user
USER node

# Expose the application port
EXPOSE ${PORT}

# Run the application
CMD ["npm", "start"]