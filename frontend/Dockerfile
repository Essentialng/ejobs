# Use an official Node.js runtime as a parent image
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a lightweight web server to serve the build
FROM nginx:alpine

# Copy the build output to the Nginx server
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 3005  
EXPOSE 3002  

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
