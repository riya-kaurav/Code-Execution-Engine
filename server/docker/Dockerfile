FROM python:3.11-slim

# Install Node.js
RUN apt-get update && apt-get install -y curl ca-certificates gnupg \
  && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
  && apt-get install -y nodejs build-essential \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN useradd -m runner
USER runner
WORKDIR /home/runner

ENV PATH="/home/runner/.local/bin:${PATH}"

CMD ["bash"]
