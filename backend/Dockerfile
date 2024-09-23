# Use an official Node.js runtime as the base image
FROM node:20

# Set environment variables for the application
ENV MONGO_URL="mongodb+srv://deriver-essential:edriver-essential-password@edriver-cluster.nacqigi.mongodb.net/EjobTesting?retryWrites=true&w=majority&appName=edriver-cluster" \
    PORT=3003 \
    SALT=15 \
    SECRET="iamwhatiam"

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the application will run on
EXPOSE 3003

# Command to run the application
CMD ["npm", "run", "start"]
