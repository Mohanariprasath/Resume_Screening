# Use official Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install essential system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Download SpaCy model
RUN python -m spacy download en_core_web_sm

# Copy the rest of the application
COPY . .

# Create uploads directory with correct permissions
RUN mkdir -p uploads && chmod 777 uploads

# Hugging Face Spaces runs on port 7860 by default
EXPOSE 7860

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
