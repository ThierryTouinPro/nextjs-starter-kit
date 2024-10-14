import React, { useState } from 'react';
import styles from './Header.module.css';
import Logo from './Logo';
import Navigation from './Navigation';
import AuthButtons from '../Interface/AuthButtons';
import Link from 'next/link';
 
function Header() {
    const [navbarOpen, setNavbarOpen] = useState(false);

    const toggleNavbar = () => {
        setNavbarOpen(!navbarOpen);
    };
    return (
        <div className="container-fluid">
            <header className={styles.header}>
                <picture>
                    <source
                    srcSet="/images/bg-pattern-intro-desktop.svg"
                    media="(min-width: 50rem)"
                    />
                    <img
                    className={styles.headerBg}
                    src="/images/bg-pattern-intro-mobile.svg"
                    alt="background for header"
                    />
                </picture>
                <nav className={`navbar navbar-expand-lg ${styles.navBar} container pt-4`}>
                    <Logo />
                    <button 
                        className={`navbar-toggler d-lg-none ${styles.navToggler}`} 
                        type="button" 
                        data-bs-toggle="collapse" 
                        aria-controls="navbarNav" 
                        aria-expanded={navbarOpen ? "true" : "false"}                      
                        onClick={toggleNavbar}>
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${navbarOpen ? 'show' : ''} ${styles.navbarCollapse}`} id="navbarNav">
                        <Navigation />
                        <AuthButtons />
                    </div>
                </nav>
                <section className={`text-center ${styles.section}`}>
                    <div className="container">
                        <h1 className="display-4">A modern publishing platform</h1>
                        <p className="lead">
                        Grow your audience and build your online brand
                        </p>
                        <div className={`text-center d-flex align-items-center justify-content-center ${styles.buttons}`}>
                            <Link href="#" className={`btn me-2 ${styles.buttonPrimary}`}>Start for free</Link>
                            <Link href="#" className={`btn ${styles.buttonText}`}>Learn more</Link>
                        </div>
                    </div>
                </section>
            </header>
        </div>
      );
}

export default Header;