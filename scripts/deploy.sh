#!/bin/bash

# Pull latest changes
git pull

# Build and start containers
docker-compose up --build -d

# Remove unused images
docker image prune -f
