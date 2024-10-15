import React, { useState, useEffect, useRef } from 'react';
import styles from './css/Header.module.css';
import Logo from './Logo';
import Navigation from './Navigation';
import Buttons from '../Interface/Buttons';
 
function Header() {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const navbarRef = useRef(null);

    const toggleNavbar = () => {
        setNavbarOpen(!navbarOpen);
    };

    // Fonction pour gérer les clics en dehors du menu
    const handleClickOutside = (event) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target) && navbarOpen) {
            setNavbarOpen(false);
        }
    };

    useEffect(() => {
        // Ajout de l'écouteur d'événements
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Nettoyage de l'écouteur d'événements
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className={`${styles.header} container-fluid pt-4`} style={{ backgroundColor: 'transparent' }}>
            <picture>
                <source
                srcSet="/images/bg-pattern-intro-desktop.svg"
                media="(min-width: 50rem)"
                />
                <img
                className={`${styles.headerBg}`}
                src="/images/bg-pattern-intro-mobile.svg"
                alt="background for header"
                />
            </picture>
            <div className="container">
                <div className="row">
                    <nav className={`navbar navbar-expand-lg ${styles.navBar} col-md-12 col-lg-8`}>
                        <Logo />
                        <button 
                            className={`navbar-toggler ${styles.navToggler} ms-auto`} 
                            type="button" 
                            data-bs-toggle="collapse" 
                            aria-controls="navbarNav" 
                            aria-expanded={navbarOpen ? "true" : "false"}                      
                            onClick={toggleNavbar}>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className={`collapse navbar-collapse ${navbarOpen ? 'show' : ''} ${styles.navbarCollapse}`} id="navbarNav">
                            <Navigation />     
                        </div>
                    </nav>
                    <div className='col-4 d-none d-lg-block'>
                        <div className="d-flex justify-content-end gap-4">
                            <Buttons label="Connexion" mode="secondary" href="/connexion" className="me-2" />
                            <Buttons label="Sign Up" mode="primary" href="/signup" />
                        </div>  
                    </div>
                </div> 
            </div>
            <section className={`text-center ${styles.section}`}>
                <div className="container">
                    <h1 className="display-4">A modern publishing platform</h1>
                    <p className="lead">
                        Grow your audience and build your online brand
                    </p>
                    <div className={`d-flex flex-md-row align-items-center justify-content-center ${styles.buttons}`}>
                        <Buttons label="Start for free" mode="primary" href="/start-free" />
                        <Buttons label="Learn more" mode="secondary" href="/learn-more" />

                    </div>
                </div>
            </section>
        </header>
      );
}

export default Header;
