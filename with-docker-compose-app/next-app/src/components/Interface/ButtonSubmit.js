import React from 'react';
import Link from 'next/link';
import styles from './css/Buttons.module.css';

function ButtonSubmit( { type, label, mode } ) {

    return (
        <div className={` ${styles.authButtons}`}>
            <button type={type} className={`border-0 ${mode === 'primary' ? styles.buttonPrimary : styles.buttonSecondary}`}>
                {label}
            </button>
        </div>
    );
};


export default ButtonSubmit;
