# Use Node.js image
FROM node:20-alpine

# Set work directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Expose port
EXPOSE 5000

# Start app
CMD ["npm", "start"]
