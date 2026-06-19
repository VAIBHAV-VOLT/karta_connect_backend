FROM node:20-alpine
WORKDIR /app

# Install only production dependencies by default
COPY package*.json ./
RUN npm ci --only=production

# Copy app source
COPY . .

# Ensure uploads directory exists
RUN mkdir -p uploads/resumes

EXPOSE 3001
CMD ["node", "server.js"]
