import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, UploadCloud, BarChart2, PieChart } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'job_desc', label: 'Job Description', icon: Briefcase },
    { id: 'upload', label: 'Resume Upload', icon: UploadCloud },
    { id: 'results', label: 'Ranking Results', icon: BarChart2 },
    { id: 'analytics', label: 'Deep Analytics', icon: PieChart },
  ];

  return (
    <div style={{
      width: '280px',
      height: '100vh',
      background: 'var(--bg-sidebar)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem 1.5rem',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 50
    }}>
      <div style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Placeholder Logo - In production replace with real logo */}
        <div style={{
          width: '40px',
          height: '40px',
          background: 'black',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold'
        }}>RA</div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', lineHeight: 1.2, color: 'black' }}>
          Recruitment<br />Assistant
        </h2>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              whileHover={{ scale: 1.01, x: 2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: isActive ? 'black' : 'transparent',
                border: 'none',
                borderRadius: '12px',
                color: isActive ? 'white' : 'var(--text-muted)',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '0.95rem',
                fontWeight: isActive ? '600' : '500',
                transition: 'all 0.2s',
              }}
            >
              <Icon size={20} strokeWidth={2} />
              {item.label}
            </motion.button>
          );
        })}
      </nav>


    </div >
  );
};

export default Sidebar;
