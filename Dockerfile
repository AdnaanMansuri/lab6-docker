# Lab 6 - Containerization using Docker
# Dockerfile that packages the Node.js/Express app into an image.

# 1. Start from an official, lightweight Node.js base image
FROM node:20-alpine

# 2. Create and use /app as the working directory inside the image
WORKDIR /app

# 3. Copy only the manifest first so Docker can cache the npm install layer
COPY package*.json ./

# 4. Install production dependencies
RUN npm install --omit=dev

# 5. Copy the rest of the application source into the image
COPY . .

# 6. Document the port the app listens on
EXPOSE 3000

# 7. Command that runs when the container starts
CMD ["node", "server.js"]
