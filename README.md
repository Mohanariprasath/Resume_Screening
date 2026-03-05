# Recruitment Assistant: AI-Powered Resume Screening & Skill Matching



Recruitment Assistant is a state-of-the-art **Resume Screening & Skill Matching System** designed to streamline the hiring process. Using advanced Natural Language Processing (NLP) and Machine Learning, it automatically parses resumes, matches them against job descriptions, and provides detailed analytics on candidate suitability.

---

##  Key Features

-  Bulk Resume Parsing : Process multiple resumes simultaneously in PDF, DOCX, and TXT formats.
-  AI-Powered Match Scoring : Uses `Sentence Transformers` and `Cosine Similarity` to calculate precise match percentages.
-  Skill Gap Analysis : Automatically identifies matched skills and highlights missing requirements for each candidate.
-  Interactive Analytics : Visualize your talent pool with dynamic charts and deep insights into candidate distribution.
-  Premium UI/UX : A sleek, modern dashboard built with React 19, featuring smooth transitions via Framer Motion and GSAP.
-  Real-time Processing : Fast, asynchronous processing powered by FastAPI.

---

##  Tech Stack

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

##  Getting Started

### Prerequisites
- Python 3.9+ 🐍
- Node.js (Latest LTS) 🟢
- npm or yarn 📦

### 1. Clone the Repository
```bash
git clone https://github.com/Mohanariprasath/Resume-Screening.git
cd Resume-Screening
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # Windows:
   .\venv\Scripts\activate
   # Linux/macOS:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Download the SpaCy model:
   ```bash
   python -m spacy download en_core_web_sm
   ```
5. Start the server:
   ```bash
   python start_server.py
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173`.*

###  Cloud Deployment (Backend)
Since this project uses AI models, we recommend **Hugging Face Spaces** (Docker) for hosting the backend due to its generous 16GB RAM free tier.

1. **Create a Space**: Go to [Hugging Face Spaces](https://huggingface.co/spaces) and create a new Space.
2. **Select Docker**: Choose the **Docker** SDK and the **Blank** template.
3. **Connect Code**: Upload the `backend/` folder or connect your GitHub repo.
4. **Environment**: Ensure the Space is set to use the provided `Dockerfile`.
5. **Port**: The backend will automatically run on port `7860`.

---

##  Project Structure

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
└── sample_resumes/     # Test Data
```

---

##  License
This project is licensed under the MIT License - see the LICENSE file for details.

---

##  Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

---

