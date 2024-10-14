import React from 'react';
import Link from 'next/link';
import styles from './AuthButtons.module.css';

function AuthButtons() {
  return (
    <div className={`d-flex align-items-center ${styles.authButtons}`}>
      <div className={styles.customHr}></div>
      <Link href="/login" className={`me-2 d-block ${styles.buttonText}`}>
        Login
      </Link>
      <Link href="/signup" className={`d-block ${styles.buttonPrimary}`}>
        Sign Up
      </Link>
    </div>
  );
};

export default AuthButtons;