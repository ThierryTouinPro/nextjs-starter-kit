import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './css/Navigation.module.css';
import { mainMenus } from '../../data/main-menus'
import ButtonLink from '../Interface/ButtonLink';

function Navigation() {
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRef = useRef(null);

    const toggleDropdown = (menuTitle) => {
        setOpenDropdown(openDropdown === menuTitle ? null : menuTitle);
    };

    // Ajout d'un effet pour fermer le menu en cliquant en dehors
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null); // Ferme le menu de navigation
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav ref={dropdownRef} className={`d-flex align-items-center col-12 ${styles.nav}`}>
            {mainMenus.map((menu, index) => (
                <div className="nav-item dropdown" key={index}>
                    <button 
                        onClick={() => toggleDropdown(menu.groupTitle)} 
                        className={`${styles.navLink} d-flex align-items-baseline`} 
                        id={`${menu.groupTitle}Dropdown`}
                    >
                        {menu.groupTitle}
                        <span className={`${styles.arrowIcon} ${openDropdown === menu.groupTitle ? styles.open : ''}`}>
                        <picture>
                            <source srcSet="/images/icon-arrow-light.svg" media="(min-width:50rem)" />
                            <img src="/images/icon-arrow-dark.svg" alt="Arrow Icon" />
                        </picture>
                        </span>
                    </button>
                    <ul 
                        className={`dropdown-menu ${styles.dropdownMenu} ${openDropdown === menu.groupTitle ? styles.show : ''}`} 
                        aria-labelledby={`${menu.groupTitle.toLowerCase()}Dropdown`}
                    >
                        {menu.subMenus.map((subMenu, subIndex) => (
                            <li key={subIndex}>
                                <Link href={`/${subMenu.toLowerCase()}`} className={`dropdown-item ${styles.dropdownItem}`}>
                                    {subMenu}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <div className="d-flex d-lg-none d-xl-none d-xxl-none justify-content-center gap-2">
                <ButtonLink label="Connexion" mode="primary" href="/auth/connexion" />
                {/* <ButtonLink label="Inscription" mode={typeof window !== 'undefined' && window.innerWidth < 768 ? 'secondary' : 'primary'} href="/auth/registration" /> */}
            </div> 
        </nav>
    );
};

export default Navigation;
