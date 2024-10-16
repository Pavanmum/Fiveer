# Use the appropriate Node.js image
FROM node:18

# Set the working directory inside the Docker container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with the legacy-peer-deps flag
RUN npm install --legacy-peer-deps

# Copy the rest of the application files
COPY . .

# Expose the port your app runs on
EXPOSE 5173

# Start the application
CMD ["npm", "start"]
