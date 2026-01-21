# Recruitment Assistant: AI-Powered Resume Screening & Skill Matching



Recruitment Assistant is a state-of-the-art **Resume Screening & Skill Matching System** designed to streamline the hiring process. Using advanced Natural Language Processing (NLP) and Machine Learning, it automatically parses resumes, matches them against job descriptions, and provides detailed analytics on candidate suitability.

---

## ✨ Key Features

- **🚀 Bulk Resume Parsing**: Process multiple resumes simultaneously in PDF, DOCX, and TXT formats.
- **🧠 AI-Powered Match Scoring**: Uses `Sentence Transformers` and `Cosine Similarity` to calculate precise match percentages.
- **🔍 Skill Gap Analysis**: Automatically identifies matched skills and highlights missing requirements for each candidate.
- **📊 Interactive Analytics**: Visualize your talent pool with dynamic charts and deep insights into candidate distribution.
- **💎 Premium UI/UX**: A sleek, modern dashboard built with React 19, featuring smooth transitions via Framer Motion and GSAP.
- **⚡ Real-time Processing**: Fast, asynchronous processing powered by FastAPI.

---

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **NLP Engine**: SpaCy (`en_core_web_sm`)
- **ML Models**: Sentence Transformers (`all-MiniLM-L6-v2`)
- **Data Science**: Scikit-Learn, NumPy
- **Parsing**: PyPDF, Python-docx

### Frontend
- **Framework**: React 19 (Vite)
- **Animations**: Framer Motion, GSAP
- **Charts**: Recharts
- **Styling**: Vanilla CSS (Premium Glassmorphic Design)
- **Icons**: Lucide React

---


---

## 📂 Project Structure

```text
Resume_Screening/
├── backend/            # FastAPI Project
│   ├── main.py         # API Endpoints
│   ├── nlp_engine.py   # AI & Matching Logic
│   ├── resume_parser.py# Document Text Extraction
│   └── uploads/        # Temporary File Storage
├── frontend/           # React Project (Vite)
│   ├── src/
│   │   ├── components/ # Reusable UI Components
│   │   ├── App.jsx     # Main Application Logic
│   │   └── index.css   # Main Styles
│   └── public/         # Static Assets
└── sample_resumes/     # Test Data
```

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

---
**Human written. Thinked by [Mohanariprasath](https://github.com/Mohanariprasath)**
