#!/usr/bin/env python3
"""
Simple test script for the Resume Screening Backend
"""
import requests
import os

def test_backend():
    """Test the backend API with sample data"""
    
    # Backend URL
    url = "http://localhost:8000/analyze"
    
    # Sample job description
    job_description = """
    We are looking for a Senior Software Engineer with 5+ years of experience in Python, React, and AWS. 
    Strong background in microservices architecture, Docker, Kubernetes, and CI/CD pipelines. 
    Experience with PostgreSQL, Redis, and RESTful APIs required.
    """
    
    # Sample files to upload
    sample_files = [
        "sample_resumes/resume1.txt",
        "sample_resumes/resume2.txt"
    ]
    
    # Prepare the request
    data = {"job_description": job_description}
    files = []
    
    for file_path in sample_files:
        if os.path.exists(file_path):
            files.append(("files", open(file_path, "rb")))
        else:
            print(f"Warning: {file_path} not found")
    
    try:
        print("🚀 Testing Resume Screening API...")
        print(f"📡 Sending request to: {url}")
        print(f"📄 Uploading {len(files)} resume(s)")
        
        # Make the request
        response = requests.post(url, data=data, files=files)
        
        # Close file handles
        for _, file_handle in files:
            file_handle.close()
        
        if response.status_code == 200:
            results = response.json()
            print("✅ API Test Successful!")
            print(f"📊 Analyzed {len(results['results'])} candidates")
            
            print("\n🏆 Results Summary:")
            for i, result in enumerate(results['results'], 1):
                print(f"{i}. {result['filename']} - {result['match_score']}% match")
                print(f"   ✅ Matched: {', '.join(result['matched_skills']) if result['matched_skills'] else 'None'}")
                print(f"   ❌ Missing: {', '.join(result['missing_skills']) if result['missing_skills'] else 'None'}")
                print()
        else:
            print(f"❌ API Test Failed: {response.status_code}")
            print(f"Error: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Connection Error: Backend server is not running")
        print("💡 Start the backend with: python -m uvicorn main:app --reload")
    except Exception as e:
        print(f"❌ Test Error: {e}")

if __name__ == "__main__":
    test_backend()