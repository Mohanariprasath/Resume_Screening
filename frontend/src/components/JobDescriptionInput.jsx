import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Sparkles } from 'lucide-react';

const JobDescriptionInput = ({ value, onChange }) => {
  const [focused, setFocused] = useState(false);



  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
      {/* Main Input */}
      <motion.div
        className="glass-panel"
        style={{ padding: '3rem' }}
        animate={{
          boxShadow: focused ? 'var(--shadow-hover)' : 'var(--shadow-soft)'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ padding: '12px', background: 'rgba(0,0,0,0.05)', borderRadius: '12px' }}>
            <Briefcase size={24} color="black" strokeWidth={2} />
          </div>
          <div>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '0.25rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
              Job Description
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
              Define the role requirements and skills you're looking for
            </p>
          </div>
        </div>

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="e.g. We are looking for a Software Engineer with experience in Python, React, and AWS..."
          className="input-dark"
          style={{
            minHeight: '200px',
            fontSize: '1rem',
            lineHeight: '1.6',
            resize: 'vertical',
            padding: '1.5rem',
            borderRadius: '20px'
          }}
        />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1.5rem',
          fontSize: '0.9rem',
          color: 'var(--text-muted)'
        }}>
          <span>{value.length} characters</span>
        </div>
      </motion.div>


    </div>
  );
};

export default JobDescriptionInput;
