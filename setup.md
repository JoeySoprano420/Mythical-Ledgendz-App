Setting up the described application involves several steps, including preparing the environment, configuring the backend and frontend, setting up Docker, and running the application. Here's a step-by-step guide to create the setup:

### Step 1: Clone the Repository

First, clone the repository to your local machine.

```bash
git clone https://github.com/JoeySoprano420/UnifiedApp.git
cd UnifiedApp
```

### Step 2: Backend Setup

Navigate to the `backend` directory and install the necessary dependencies.

```bash
cd backend
npm install
```

Create a `config` directory inside the `backend` directory and add a `default.json` file for configuration.

```bash
mkdir config
nano config/default.json
```

Add the following configuration to `default.json`:

```json
{
  "PORT": 5000,
  "mongoURI": "your_mongodb_connection_string",
  "jwtSecret": "your_jwt_secret"
}
```

### Step 3: Frontend Setup

Navigate to the `frontend` directory and install the necessary dependencies.

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory and add the following environment variables:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 4: Docker Setup

Create a `Dockerfile` in the root directory:

```bash
nano Dockerfile
```

Add the following content to the `Dockerfile`:

```dockerfile
# Backend
FROM node:14-alpine AS backend
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
CMD ["node", "app.js"]

# Frontend
FROM node:14-alpine AS frontend
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Final Stage
FROM nginx:alpine
COPY --from=frontend /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
```

Create a `docker-compose.yml` file in the root directory:

```bash
nano docker-compose.yml
```

Add the following content to `docker-compose.yml`:

```yaml
version: '3'
services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile
      target: backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production

  frontend:
    build:
      context: .
      dockerfile: Dockerfile
      target: frontend
    ports:
      - "3000:80"
    environment:
      - NODE_ENV=production
```

Create a `nginx.conf` file in the root directory:

```bash
nano nginx.conf
```

Add the following content to `nginx.conf`:

```nginx
server {
    listen 80;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Step 5: Deployment Script

Create a `scripts` directory and a `deploy.sh` script:

```bash
mkdir scripts
nano scripts/deploy.sh
```

Add the following content to `deploy.sh`:

```bash
#!/bin/bash

# Pull latest changes
git pull

# Build and start containers
docker-compose up --build -d

# Remove unused images
docker image prune -f
```

Make the script executable:

```bash
chmod +x scripts/deploy.sh
```

### Step 6: Run the Application

Run the deployment script to build and start the application:

```bash
./scripts/deploy.sh
```

### Step 7: Access the Application

Once the containers are up and running, you can access the frontend at `http://localhost:3000` and the backend API at `http://localhost:5000/api`.

### Step 8: Additional Configuration (Optional)

#### Configure MongoDB

Ensure you have MongoDB running and replace the `mongoURI` in the `default.json` file with your MongoDB connection string.

#### Configure Environment Variables

If you have any additional environment variables, configure them in the `.env` file for the frontend and the `default.json` for the backend.

#### Add SSL/TLS (Optional)

For production environments, consider adding SSL/TLS to secure the connections. You can use a reverse proxy like Nginx with Let's Encrypt to achieve this.

---

This setup guide covers the basic configuration and deployment of the unified application. For a production environment, additional steps such as setting up CI/CD pipelines, monitoring, logging, and scaling might be necessary.
