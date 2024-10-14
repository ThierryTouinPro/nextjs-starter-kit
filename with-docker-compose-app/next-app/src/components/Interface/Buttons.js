import React from 'react';
import Link from 'next/link';
import styles from './css/Buttons.module.css';

function Buttons( { label, mode } ) {
  return (
    <div className={`d-flex align-items-center ${styles.authButtons}`}>
      <Link 
        href="/signup" 
        className={`d-block ${mode === 'primary' ? styles.buttonPrimary : styles.buttonSecondary}`}
      >
        {label}
      </Link>
    </div>
  );
};

export default Buttons;
