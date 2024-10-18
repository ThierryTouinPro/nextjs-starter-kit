import React from 'react';
import Link from 'next/link';
import styles from './css/Logo.module.css';
import Image from 'next/image';

function Logo() {
  return (
    // <Link href="/">
    //       <Image
    //         src="/images/logo.svg"
    //         alt="NSK Site"
    //         width={100}
    //         height={40}
    //         className={styles.logo}
    //       />
    // 

    <Link href="/">
        <h2 class="fw-bold text-white">NSK Site</h2>  
    </Link>

  );
};

export default Logo;