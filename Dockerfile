# Use an official Node runtime as a parent image
FROM node:17-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port on which the Node.js app will run
EXPOSE 3000

# Command to run the Node.js app
CMD ["node", "index.js"]
