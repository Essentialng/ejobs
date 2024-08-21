# Stage 1: Build the React application
FROM node:20 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the build output to the Nginx server's default directory
COPY --from=build /app/build /usr/share/nginx/html

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Expose the application on port 3002
EXPOSE 3002

# Copy a custom Nginx configuration file (if needed)
# If you're configuring Nginx inside the container:
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

# Optional: Add a health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s CMD curl -f http://localhost:3002 || exit 1
