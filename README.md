# Recruitment Assistant - AI Resume Screening System

The Recruitment Assistant is a project I built to solve a very common problem in hiring: the sheer volume of resumes. When you have hundreds of applicants, finding the right fit manually is almost impossible. I wanted to create something that doesn't just look for keywords but actually understands what a candidate brings to the table.

This system uses Natural Language Processing to read through resumes—whether they are PDFs or Word docs—and matches them against a job description. It doesn't just give you a "yes" or "no"; it provides a deep dive into skill gaps, match percentages, and interactive data to help make better decisions.

---

## What makes it special?

*   **Understanding Meaning, Not Just Keywords**: By using Sentence Transformers, the system understands the context. It knows that "Coding in Python" and "Python Development" are the same thing.
*   **Bulk Workload Handling**: You can drop multiple resumes at once, and the system will process them all, ranking them from the best match to the least.
*   **Gap Finder**: One of the most useful features is the Skill Gap Analysis. It highlights exactly what skills are missing from a candidate's profile based on your requirements.
*   **Visual Dashboard**: I spent a lot of time on the UI. It’s built with React 19 and uses glassmorphic design principles to make the data visualization easy on the eyes.

---

## The Tech Behind It

I chose these technologies because they are fast, modern, and reliable:

**The Backend (The Brain)**
- **FastAPI**: For high-performance API endpoints.
- **SpaCy**: Used for the heavy lifting in text extraction and entity recognition.
- **Sentence-Transformers**: To generate deep semantic embeddings.
- **Scikit-Learn**: For calculating the similarity scores.

**The Frontend (The Face)**
- **React 19 & Vite**: For a lightning-fast user experience.
- **Framer Motion & GSAP**: To make the UI feel alive with smooth transitions.
- **Recharts**: For the interactive analytics.
- **Vanilla CSS**: Kept it clean with custom styles for a premium look.

---

## Project Layout

```text
Resume_Screening/
├── backend/            # Where the AI and API logic lives
├── frontend/           # The React-driven user interface
└── sample_resumes/     # Some test data to get started
```

---

**Human written. Thinked by [Mohanariprasath](https://github.com/Mohanariprasath)**
