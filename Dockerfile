FROM python:3.9.18-slim

# Install backend environment
WORKDIR /personal-site/
COPY backend/requirements.txt .
RUN pip install -r requirements.txt

# Copy in the frontend
COPY frontend/build frontend_build_static/

# Copy in the backend
COPY backend/ .

EXPOSE 8000

# Run the backend
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
