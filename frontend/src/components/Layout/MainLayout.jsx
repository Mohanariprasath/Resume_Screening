import React from 'react';
import { motion } from 'framer-motion';

const MainLayout = ({ children }) => {
  return (
    <div style={{
      marginLeft: '280px',
      minHeight: '100vh',
      background: 'transparent', // Body handles the aurora background
      position: 'relative'
    }}>
      {/* Aurora blobs are now on body, so we keep this clean */}
      <main style={{ position: 'relative', zIndex: 1, padding: '2rem' }}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
