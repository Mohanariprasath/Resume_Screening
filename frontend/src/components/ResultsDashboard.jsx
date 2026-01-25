import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, TrendingUp, User, CheckCircle, XCircle } from 'lucide-react';

const ResultsDashboard = ({ results }) => {
  if (!results || results.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel"
        style={{ padding: '3rem', textAlign: 'center' }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
        <h3>No Results Yet</h3>
        <p style={{ color: 'var(--text-muted)' }}>Upload resumes and run analysis to see candidate rankings</p>
      </motion.div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--success)';
    if (score >= 60) return 'var(--warning)';
    return 'var(--danger)';
  };

  const getScoreGradient = (score) => {
    if (score >= 80) return 'linear-gradient(135deg, #10b981, #059669)';
    if (score >= 60) return 'linear-gradient(135deg, #f59e0b, #d97706)';
    return 'linear-gradient(135deg, #ef4444, #dc2626)';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel card-hover hover-glow"
          style={{ padding: '1.5rem', textAlign: 'center' }}
        >
          <Trophy size={32} color="var(--warning)" className="icon-hover floating" style={{ marginBottom: '0.5rem' }} />
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>
            {results[0]?.match_score}%
          </div>
          <div className="text-hover" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Top Score</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel card-hover hover-glow"
          style={{ padding: '1.5rem', textAlign: 'center' }}
        >
          <User size={32} color="var(--primary)" className="icon-hover floating" style={{ marginBottom: '0.5rem' }} />
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>
            {results.length}
          </div>
          <div className="text-hover" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Candidates</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel card-hover hover-glow"
          style={{ padding: '1.5rem', textAlign: 'center' }}
        >
          <TrendingUp size={32} color="var(--accent)" className="icon-hover floating" style={{ marginBottom: '0.5rem' }} />
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>
            {(results.reduce((sum, r) => sum + r.match_score, 0) / results.length).toFixed(1)}%
          </div>
          <div className="text-hover" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Average Score</div>
        </motion.div>
      </div>

      {/* Results List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {results.map((result, index) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="glass-panel cursor-target card-hover hover-glow"
            style={{ 
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Rank Badge */}
            <div className="hover-bounce" style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: index === 0 ? 'linear-gradient(135deg, #ffd700, #ffed4e)' : 
                         index === 1 ? 'linear-gradient(135deg, #c0c0c0, #e5e5e5)' :
                         index === 2 ? 'linear-gradient(135deg, #cd7f32, #daa520)' : 'var(--bg-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '1.1rem',
              color: index < 3 ? '#000' : 'var(--text-main)',
              border: '2px solid var(--border)'
            }}>
              {index + 1}
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <h3 className="text-hover" style={{ 
                    color: 'var(--text-main)', 
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    margin: 0
                  }}>
                    {result.filename}
                  </h3>
                  {index === 0 && <Star size={20} color="var(--warning)" fill="var(--warning)" className="floating" />}
                </div>

                {/* Skills Section */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      marginBottom: '0.5rem'
                    }}>
                      <CheckCircle size={16} color="var(--success)" className="icon-hover" />
                      <span style={{ 
                        fontSize: '0.9rem', 
                        color: 'var(--text-secondary)', 
                        fontWeight: '500'
                      }}>
                        Matched Skills ({result.matched_skills.length})
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {result.matched_skills.length > 0 ? (
                        result.matched_skills.map(skill => (
                          <motion.span 
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * result.matched_skills.indexOf(skill) }}
                            className="hover-bounce"
                            style={{
                              padding: '0.4rem 0.8rem',
                              background: 'rgba(16, 185, 129, 0.15)',
                              color: 'var(--success)',
                              border: '1px solid rgba(16, 185, 129, 0.3)',
                              borderRadius: '20px',
                              fontSize: '0.8rem',
                              fontWeight: '500'
                            }}
                          >
                            {skill}
                          </motion.span>
                        ))
                      ) : (
                        <span style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                          No matching skills found
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      marginBottom: '0.5rem'
                    }}>
                      <XCircle size={16} color="var(--danger)" className="icon-hover" />
                      <span style={{ 
                        fontSize: '0.9rem', 
                        color: 'var(--text-secondary)', 
                        fontWeight: '500'
                      }}>
                        Missing Skills ({result.missing_skills.length})
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {result.missing_skills.length > 0 ? (
                        result.missing_skills.map(skill => (
                          <span 
                            key={skill}
                            className="hover-bounce"
                            style={{
                              padding: '0.4rem 0.8rem',
                              background: 'rgba(239, 68, 68, 0.15)',
                              color: 'var(--danger)',
                              border: '1px solid rgba(239, 68, 68, 0.3)',
                              borderRadius: '20px',
                              fontSize: '0.8rem',
                              fontWeight: '500'
                            }}
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                          All required skills present
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Score Display */}
              <div style={{ textAlign: 'center', minWidth: '120px' }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + (0.1 * index), type: "spring", stiffness: 200 }}
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: getScoreGradient(result.match_score),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    boxShadow: `0 8px 25px ${getScoreColor(result.match_score)}40`,
                    marginBottom: '0.5rem'
                  }}
                >
                  {result.match_score}%
                </motion.div>
                <div style={{ 
                  fontSize: '0.8rem', 
                  color: 'var(--text-muted)',
                  fontWeight: '500'
                }}>
                  Match Score
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ResultsDashboard;
