import spacy
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import re

class NLPEngine:
    def __init__(self):
        print("Loading NLP models...")
        self.nlp = spacy.load("en_core_web_sm")
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        print("Models loaded.")

        self.skill_db = {
            "python", "java", "c++", "javascript", "typescript", "react", "angular", "vue", "html", "css",
            "node.js", "django", "flask", "fastapi", "spring boot", "sql", "postgresql", "mysql", "mongodb",
            "aws", "azure", "gcp", "docker", "kubernetes", "git", "linux", "machine learning", "deep learning",
            "nlp", "tensorflow", "pytorch", "scikit-learn", "pandas", "numpy"
        }

    def normalize_text(self, text):
        text = text.lower()
        text = re.sub(r'[^a-z0-9\s]', ' ', text)
        return " ".join(text.split())

    def extract_skills(self, text):
        doc = self.nlp(text.lower())
        found_skills = set()

        tokens = [token.text for token in doc]
        for token in tokens:
            if token in self.skill_db:
                found_skills.add(token)

        text_lower = text.lower()
        for skill in self.skill_db:
            if " " in skill and skill in text_lower:
                found_skills.add(skill)

        return list(found_skills)

    def generate_embedding(self, text):
        return self.model.encode(text)

    def calculate_similarity(self, embedding1, embedding2):
        similarity = cosine_similarity([embedding1], [embedding2])[0][0] * 100
        return float(similarity)
