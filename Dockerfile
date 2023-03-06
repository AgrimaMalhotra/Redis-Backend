# Use a Node.js base image
FROM node:14

# Create and set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Set the command to start the application
ENTRYPOINT ["npm", "start"]
