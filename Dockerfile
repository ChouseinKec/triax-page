# Stage 1: Build the app
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine

WORKDIR /app

# Copy only package.json & package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built Next.js app from builder stage
COPY --from=builder /app/.next ./.next

EXPOSE 3000
CMD ["npm", "start"]
