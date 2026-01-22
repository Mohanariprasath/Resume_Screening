from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import shutil
import os
import uuid
import json
from resume_parser import parse_resume
from nlp_engine import NLPEngine

app = FastAPI(title="Resume Screening API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    nlp_engine = NLPEngine()
except Exception as e:
    print(f"Failed to load NLP Engine: {e}")
    nlp_engine = None

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def read_root():
    return {"message": "Resume Screening API is running"}

@app.post("/analyze")
async def analyze_resumes(
    job_description: str = Form(...),
    files: List[UploadFile] = File(...)
):
    if not nlp_engine:
        raise HTTPException(status_code=500, detail="NLP Engine not loaded")
        
    results = []

    jd_text = nlp_engine.normalize_text(job_description)
    jd_embedding = nlp_engine.generate_embedding(jd_text)
    jd_skills = nlp_engine.extract_skills(job_description) # distinct from normalized?
    
    for file in files:

        file_ext = os.path.splitext(file.filename)[1]
        file_id = str(uuid.uuid4())
        file_path = os.path.join(UPLOAD_DIR, f"{file_id}{file_ext}")
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            

        resume_text = parse_resume(file_path)
        

        os.remove(file_path)
        
        if not resume_text:
            results.append({
                "filename": file.filename,
                "error": "Could not extract text"
            })
            continue
            

        clean_resume_text = nlp_engine.normalize_text(resume_text)
        resume_embedding = nlp_engine.generate_embedding(clean_resume_text)
        resume_skills = nlp_engine.extract_skills(resume_text)

        match_score = nlp_engine.calculate_similarity(resume_embedding, jd_embedding)

        missing_skills = [skill for skill in jd_skills if skill not in resume_skills]
        
        results.append({
            "id": file_id,
            "filename": file.filename,
            "match_score": round(float(match_score), 2), 
            "matched_skills": list(set(resume_skills).intersection(set(jd_skills))),
            "missing_skills": missing_skills,
            "all_skills": resume_skills
        })

    results.sort(key=lambda x: x.get("match_score", 0), reverse=True)
    
    return {"results": results}
