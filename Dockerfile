# Stage 2: Build Backend
FROM node:20-alpine AS backend-builder

WORKDIR /app

COPY ./backend/package.json ./


RUN npm install

COPY ./backend ./

RUN npm run build

# Stage 3: Final Stage
FROM node:20-alpine

WORKDIR /app

# Copy built frontend and backend artifacts
COPY --from=backend-builder /app/ /app
COPY ./frontend/dist /app/dist/public

# Install production dependencies for the final stage
# COPY ./backend/package.json ./
# RUN npm install

# Expose the port your backend application runs on
EXPOSE 80

# Start the backend application
CMD [ "npm", "start" ]
