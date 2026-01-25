import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, Users, Award, Target } from 'lucide-react';

const Analytics = ({ results }) => {
  if (!results || results.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel"
        style={{ padding: '3rem', textAlign: 'center' }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
        <h3>No Analytics Available</h3>
        <p style={{ color: 'var(--text-muted)' }}>Upload resumes and analyze them to see detailed analytics</p>
      </motion.div>
    );
  }

  // Prepare data for charts
  const scoreDistribution = results.map((result, index) => ({
    name: `Candidate ${index + 1}`,
    score: result.match_score,
    filename: result.filename
  }));

  const skillsAnalysis = results.reduce((acc, result) => {
    result.matched_skills.forEach(skill => {
      acc[skill] = (acc[skill] || 0) + 1;
    });
    return acc;
  }, {});

  const topSkills = Object.entries(skillsAnalysis)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([skill, count]) => ({ skill, count }));

  const avgScore = results.reduce((sum, r) => sum + r.match_score, 0) / results.length;
  const topCandidate = results[0];
  const totalSkillsFound = new Set(results.flatMap(r => r.matched_skills)).size;

  const COLORS = ['#6366f1', '#38bdf8', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel card-hover hover-glow"
          style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
        >
          <div className="hover-bounce" style={{
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            padding: '1rem',
            borderRadius: '12px'
          }}>
            <TrendingUp size={24} color="white" />
          </div>
          <div>
            <div className="text-hover" style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-main)' }}>
              {avgScore.toFixed(1)}%
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Average Match Score</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel card-hover hover-glow"
          style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
        >
          <div className="hover-bounce" style={{
            background: 'linear-gradient(135deg, var(--success), #059669)',
            padding: '1rem',
            borderRadius: '12px'
          }}>
            <Users size={24} color="white" />
          </div>
          <div>
            <div className="text-hover" style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-main)' }}>
              {results.length}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Candidates Analyzed</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel card-hover hover-glow"
          style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
        >
          <div className="hover-bounce" style={{
            background: 'linear-gradient(135deg, var(--warning), #d97706)',
            padding: '1rem',
            borderRadius: '12px'
          }}>
            <Award size={24} color="white" />
          </div>
          <div>
            <div className="text-hover" style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-main)' }}>
              {topCandidate.match_score}%
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Top Candidate Score</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel card-hover hover-glow"
          style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
        >
          <div className="hover-bounce" style={{
            background: 'linear-gradient(135deg, var(--accent), #0284c7)',
            padding: '1rem',
            borderRadius: '12px'
          }}>
            <Target size={24} color="white" />
          </div>
          <div>
            <div className="text-hover" style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-main)' }}>
              {totalSkillsFound}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Unique Skills Found</div>
          </div>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        {/* Score Distribution Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-panel card-hover hover-glow"
          style={{ padding: '2rem' }}
        >
          <h3 className="text-hover" style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Candidate Match Scores</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scoreDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="name"
                stroke="var(--text-muted)"
                fontSize={12}
              />
              <YAxis
                stroke="var(--text-muted)"
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  color: 'var(--text-main)'
                }}
                formatter={(value, name, props) => [
                  `${value}%`,
                  'Match Score',
                  props.payload.filename
                ]}
              />
              <Bar
                dataKey="score"
                fill="url(#colorGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--accent)" stopOpacity={0.6} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Top Candidates Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-panel card-hover hover-glow"
        style={{ padding: '2rem' }}
      >
        <h3 className="text-hover" style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Top Candidates Ranking</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Rank</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Candidate</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Match Score</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Skills Matched</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Skills Missing</th>
              </tr>
            </thead>
            <tbody>
              {results.slice(0, 5).map((result, index) => (
                <tr key={result.id} className="hover-lift" style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem' }}>
                    <div className="hover-bounce" style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      background: index === 0 ? 'linear-gradient(135deg, #ffd700, #ffed4e)' :
                        index === 1 ? 'linear-gradient(135deg, #c0c0c0, #e5e5e5)' :
                          index === 2 ? 'linear-gradient(135deg, #cd7f32, #daa520)' : 'var(--bg-card)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      fontSize: '0.9rem'
                    }}>
                      {index + 1}
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span className="text-hover" style={{ color: 'var(--text-main)', fontWeight: '500' }}>
                      {result.filename}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{
                      background: `linear-gradient(90deg, var(--primary) 0%, var(--primary) ${result.match_score}%, var(--bg-card) ${result.match_score}%, var(--bg-card) 100%)`,
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      minWidth: '80px',
                      textAlign: 'center',
                      isolation: 'isolate' // Ensure blending works within this context
                    }}>
                      <span style={{ mixBlendMode: 'difference' }}>{result.match_score}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--success)' }}>
                    {result.matched_skills.length}
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--danger)' }}>
                    {result.missing_skills.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;