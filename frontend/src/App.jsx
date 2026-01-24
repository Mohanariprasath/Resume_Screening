import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Layout/Sidebar';
import MainLayout from './components/Layout/MainLayout';
import UploadSection from './components/UploadSection';
import JobDescriptionInput from './components/JobDescriptionInput';
import ResultsDashboard from './components/ResultsDashboard';
import Analytics from './components/Analytics';
import TargetCursor from './components/TargetCursor';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('job_desc');
  const [files, setFiles] = useState([]);
  const [jobDescription, setJobDescription] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (files.length === 0) {
      setError("Please upload at least one resume.");
      return;
    }
    if (!jobDescription.trim()) {
      setError("Please enter a job description.");
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    const formData = new FormData();
    formData.append('job_description', jobDescription);
    files.forEach(file => {
      formData.append('files', file);
    });

    const apiUrl = import.meta.env.VITE_API_URL || 'https://mohanariprasath-resume-screening-api.hf.space';

    try {
      const response = await fetch(`${apiUrl}/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data.results);
      setActiveTab('results'); // Auto-switch to results tab
    } catch (err) {
      console.error(err);
      setError("Failed to analyze resumes. Is the backend server running?");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'job_desc':
        return (
          <motion.div
            key="job_desc"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: '3rem',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              maxWidth: '1400px',
              margin: '0 auto'
            }}>
              {/* Left Column: Input */}
              <div style={{ width: '100%' }}>
                <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
                  <h1 className="text-hero" style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-main)', lineHeight: '1', letterSpacing: '-0.03em' }}>
                    Define the Role
                  </h1>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', fontWeight: '400' }}>
                    Enter the job details below to find the best candidates.
                  </p>
                </div>
                <JobDescriptionInput
                  value={jobDescription}
                  onChange={setJobDescription}
                />
              </div>

              {/* Right Column: Project Description */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingLeft: '1rem' }}>
                <div>
                  <div style={{ display: 'inline-flex', padding: '8px 16px', background: 'rgba(0,0,0,0.05)', borderRadius: '20px', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>✨ Recruitment Assistant</span>
                  </div>
                  <h3 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)', lineHeight: '1.2' }}>
                    Automated Resume<br />Screening System
                  </h3>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    Streamline hiring with our intelligent screening engine. We use advanced NLP to match candidates to your requirements.
                  </p>
                </div>


              </div>
            </div>
          </motion.div>
        );

      case 'upload':
        return (
          <motion.div
            key="upload"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: '3rem',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              maxWidth: '1400px',
              margin: '0 auto'
            }}>
              {/* Left Column: Upload Section */}
              <div style={{ width: '100%' }}>
                <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
                  <h1 className="text-hero" style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-main)', lineHeight: '1', letterSpacing: '-0.03em' }}>
                    Upload Resumes
                  </h1>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', fontWeight: '400' }}>
                    Bulk upload PDF or DOCX files. We handle the parsing automatically.
                  </p>
                </div>
                <UploadSection onFilesSelected={setFiles} />

                {/* Analyze Button */}
                <div style={{ marginTop: '3rem' }}>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        color: '#ef4444',
                        marginBottom: '1.5rem',
                        padding: '1rem',
                        background: '#fef2f2',
                        borderRadius: '12px',
                        border: '1px solid #fee2e2',
                        display: 'inline-block',
                        fontWeight: '500'
                      }}
                    >
                      {error}
                    </motion.div>
                  )}

                  <motion.button
                    className="btn-primary"
                    onClick={handleAnalyze}
                    disabled={loading || files.length === 0 || !jobDescription.trim()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      minWidth: '250px',
                      opacity: (files.length === 0 || !jobDescription.trim()) ? 0.5 : 1
                    }}
                  >
                    {loading ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          border: '2px solid rgba(255,255,255,0.3)',
                          borderRadius: '50%',
                          borderTopColor: 'white',
                          animation: 'spin 1s linear infinite'
                        }}></div>
                        Processing...
                      </div>
                    ) : (
                      "Start Analysis"
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Right Column: Description */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingLeft: '1rem' }}>
                <div>

                  <h3 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)', lineHeight: '1.2' }}>
                    Bulk Resume Parsing
                  </h3>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    Upload multiple candidate resumes at once. Our system automatically extracts key details, work history, and skills from PDF, DOCX, and TXT files. We use advanced parsing algorithms to normalize data structure, ensuring consistent analysis across varied resume formats. Simply drag and drop your files or browse to select them.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'results':
        return (
          <motion.div
            key="results"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: '3rem',
              alignItems: 'start', // Align start for results list
              height: '100%',
              width: '100%',
              maxWidth: '1400px',
              margin: '0 auto'
            }}>
              {/* Left Column: Results List */}
              <div style={{ width: '100%' }}>
                <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
                  <h1 className="text-hero" style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)' }}>
                    Ranking Results
                  </h1>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px' }}>
                    AI-powered candidate ranking and skill matching based on your criteria.
                  </p>
                </div>
                <ResultsDashboard results={results} />
              </div>

              {/* Right Column: Description */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingLeft: '1rem', paddingTop: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)', lineHeight: '1.2' }}>
                    Smart Candidate<br />Ranking & Analysis
                  </h3>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    Our system ranks candidates by analyzing how well their resumes match the provided job description. We look at key skills, experience relevance, and contextual fit to provide you with a prioritized list of the best talent.
                  </p>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                    Match Score
                  </h4>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    The match score indicates the percentage overlap between the candidate's qualifications and your requirements. Scores above 80% indicate a strong fit.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'analytics':
        return (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: '3rem',
              alignItems: 'start',
              height: '100%',
              width: '100%',
              maxWidth: '1400px',
              margin: '0 auto'
            }}>
              {/* Left Column: Analytics Content */}
              <div style={{ width: '100%' }}>
                <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
                  <h1 className="text-hero" style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)' }}>
                    Deep Analytics
                  </h1>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px' }}>
                    Comprehensive insights and data visualization of your candidate pool.
                  </p>
                </div>
                <Analytics results={results} />
              </div>

              {/* Right Column: Description */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingLeft: '1rem', paddingTop: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)', lineHeight: '1.2' }}>
                    Visualizing Talent<br />Data
                  </h3>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    Gain deeper insights into your applicant pool with our analytics dashboard. We visualize key metrics such as skill distribution, experience levels, and overall candidate suitability to help you make data-driven hiring decisions.
                  </p>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <h4 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                    Data-Driven Hiring
                  </h4>
                  <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    Spot trends and identify gaps in your talent pipeline. Our charts break down the strengths and weaknesses of your current candidate batch relative to the job requirements.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'transparent' }}>
      {/* TargetCursor removed for cleaner UI */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <MainLayout>
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </MainLayout>
    </div>
  );
}

export default App;
