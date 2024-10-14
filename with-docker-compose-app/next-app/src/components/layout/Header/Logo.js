import React from 'react';
import Link from 'next/link';
import styles from './Logo.module.css';
import Image from 'next/image';

function Logo() {
  return (
    <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="Blogr"
            width={100}
            height={50}
            className={styles.logo}
          />
    </Link>
  );
};

export default Logo;