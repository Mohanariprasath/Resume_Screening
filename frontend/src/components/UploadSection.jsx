import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, X } from 'lucide-react';

const UploadSection = ({ onFilesSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    processFiles(selectedFiles);
  };

  const processFiles = (newFiles) => {
    const validFiles = newFiles.filter(file =>
      ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
        .includes(file.type) || file.name.endsWith('.pdf') || file.name.endsWith('.docx') || file.name.endsWith('.txt')
    );

    const updatedFiles = [...files, ...validFiles];
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  const removeFile = (indexToRemove) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Upload Area */}
      <motion.div
        className="glass-panel"
        style={{ padding: '8rem 3rem', textAlign: 'center', cursor: 'pointer', borderStyle: 'dashed', borderWidth: '2px', borderColor: isDragging ? 'black' : 'rgba(0,0,0,0.1)', height: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
        whileHover={{ scale: 1.01, borderColor: 'rgba(0,0,0,0.2)' }}
        animate={{
          background: isDragging ? 'rgba(0,0,0,0.02)' : 'var(--bg-card)'
        }}
      >
        <motion.div
          animate={{
            scale: isDragging ? 1.1 : 1,
            rotate: isDragging ? 5 : 0
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ marginBottom: '2rem' }}
        >
          <div style={{ width: '80px', height: '80px', background: 'black', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
            <Upload size={32} color="white" />
          </div>
        </motion.div>

        <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)', fontSize: '1.5rem', fontWeight: 'bold' }}>
          {isDragging ? 'Drop files here!' : 'Drag & Drop Resumes'}
        </h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
          Supports PDF, DOCX, and TXT using AI parsing
        </p>

        <button className="btn-primary" style={{ marginBottom: '2rem' }}>
          Browse Files
        </button>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          fontSize: '0.9rem',
          color: 'var(--text-light)',
          fontWeight: '500'
        }}>
          <span>PDF</span>
          <span>DOCX</span>
          <span>TXT</span>
        </div>

        <input
          type="file"
          multiple
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileInput}
          accept=".pdf,.docx,.txt"
        />
      </motion.div>

      {/* File List */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel card-hover"
          style={{ padding: '2rem' }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h3 className="text-hover" style={{ color: 'var(--text-main)' }}>
              Selected Files ({files.length})
            </h3>
            <motion.button
              className="btn-primary cursor-target btn-interactive"
              onClick={() => fileInputRef.current.click()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.9rem'
              }}
            >
              + Add More
            </motion.button>
          </div>

          <div style={{
            display: 'grid',
            gap: '1rem',
            maxHeight: '300px',
            overflowY: 'auto'
          }}>
            {files.map((file, index) => (
              <motion.div
                key={`${file.name}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="hover-lift"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: 'var(--bg-card)',
                  borderRadius: '12px',
                  border: '1px solid var(--border)'
                }}
              >
                <FileText size={20} color="var(--primary)" className="icon-hover" />
                <div style={{ flex: 1 }}>
                  <div className="text-hover" style={{
                    color: 'var(--text-main)',
                    fontWeight: '500',
                    fontSize: '0.95rem'
                  }}>
                    {file.name}
                  </div>
                  <div style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem'
                  }}>
                    {(file.size / 1024).toFixed(1)} KB
                  </div>
                </div>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="cursor-target hover-bounce"
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '6px',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X size={16} color="var(--danger)" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UploadSection;
