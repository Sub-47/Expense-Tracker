import React from 'react';

function ErrorMessage({ error, onClose }) {
  if (!error) return null;

  const getErrorMessage = (error) => {
    if (error.includes('Not authenticated')) {
      return 'Please log in to continue';
    }
    if (error.includes('Failed to fetch')) {
      return 'Unable to connect to server. Please check your connection.';
    }
    if (error.includes('Category not found')) {
      return 'Selected category does not exist';
    }
    return error;
  };

  return (
    <div style={{
      backgroundColor: '#ffebee',
      color: '#c62828',
      padding: '12px',
      borderRadius: '4px',
      marginBottom: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <span>{getErrorMessage(error)}</span>
      {onClose && (
        <button onClick={onClose} style={{
          background: 'none',
          border: 'none',
          color: '#c62828',
          cursor: 'pointer',
          fontSize: '18px'
        }}>
          ×
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;