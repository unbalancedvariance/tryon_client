

import React from 'react';

function GeneratedLoadOut({ images = [] }) {

  if (!images || images.length === 0) {
    return null;
}

  return (
    <div style={{
      position: 'fixed',
      top: '70px', 
      left: '20px', 
      background: '#f5f5f5', 
      padding: '10px', 
      borderRadius: '5px',
      
      maxHeight: '400px', 
      overflowY: 'scroll',
      width: 'calc(50% - 40px)',
      border: '2px light blue'
    }}>
      <h3>Generated Image</h3>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        gap: '10px',
        justifyContent: 'flex-start',
      }}>
        {images.map((img, index) => (
          <div 
            key={index} 
            style={{ 
              width: 'calc(33.33% - 10px)', 
              textAlign: 'center',
            }}
          >
            <img 
              src={img} 
              alt="Generated Image" 
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GeneratedLoadOut;
