
"""
Backend server startup script
"""
import uvicorn

if __name__ == "__main__":
    print(" Starting Resume Screening Backend Server...")
    print(" Server will be available at: http://localhost:8000")
    print(" API docs available at: http://localhost:8000/docs")
    print(" Press Ctrl+C to stop the server")
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )