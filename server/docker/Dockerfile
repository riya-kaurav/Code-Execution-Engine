# server/docker/Dockerfile
FROM python:3.11-slim

# install Node
RUN apt-get update && apt-get install -y curl ca-certificates gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# create a non-root user for security
RUN useradd -m runner
WORKDIR /home/runner
USER runner

# container will execute user code mounted at /home/runner/code.<ext>
