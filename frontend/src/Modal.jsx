import React from 'react';
import ReactDom from 'react-dom';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'rgb(34,34,34)',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '90%',
  borderRadius: '10px', // Optional: Rounded corners for the modal
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000,
};

const X_BUTTON_STYLES = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: '#ff4d4d',  // Soft red color
  border: 'none',
  borderRadius: '50%',
  color: 'white',
  fontSize: '1.5rem',
  width: '40px',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
};

const X_BUTTON_HOVER_STYLES = {
  backgroundColor: '#ff1a1a', // Darker red on hover
  transform: 'scale(1.1)',
};

export default function Modal({ children, onClose }) {

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button
          className='btn'
          style={X_BUTTON_STYLES}
          onMouseEnter={e => e.target.style.backgroundColor = X_BUTTON_HOVER_STYLES.backgroundColor}
          onMouseLeave={e => e.target.style.backgroundColor = X_BUTTON_STYLES.backgroundColor}
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  );
}
