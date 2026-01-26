FROM python:3.10-slim

WORKDIR /app

# Install only essential build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy and install requirements with PyTorch CPU-only for faster build
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -U pip setuptools wheel && \
    pip install --no-cache-dir torch --index-url https://download.pytorch.org/whl/cpu && \
    pip install --no-cache-dir -r requirements.txt && \
    python -m spacy download en_core_web_sm

# Copy application code (this changes frequently, so it's last)
COPY backend/ .

# Start the application
CMD gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app --timeout 120 -b 0.0.0.0:${PORT:-8000}
