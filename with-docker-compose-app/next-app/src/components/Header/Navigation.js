import React, { useState } from 'react';
import Link from 'next/link';
import styles from './css/Navigation.module.css';
import { mainMenus } from '../../constants/main-menus'
import Buttons from '../Interface/Buttons';

function Navigation() {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (menuTitle) => {
        setOpenDropdown(openDropdown === menuTitle ? null : menuTitle);
    };

    return (
        <nav className={`d-flex align-items-center col-12 ${styles.nav}`}>
            {mainMenus.map((menu, index) => (
                <div className="nav-item dropdown " key={index}>
                    <button 
                        onClick={() => toggleDropdown(menu.groupTitle)} 
                        className={`${styles.navLink} d-flex align-items-baseline`} 
                        id={`${menu.groupTitle}Dropdown`}
                    >
                        {menu.groupTitle}
                        <span className={`${styles.arrowIcon} ${openDropdown === menu.groupTitle ? styles.open : ''}`}>
                        <picture>
                            <source srcSet="images/icon-arrow-light.svg" media="(min-width:50rem)" />
                            <img src="images/icon-arrow-dark.svg" alt="Arrow Icon" />
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
            <div className="d-flex d-lg-none d-xl-none d-xxl-none justify-content-center gap-4">
                <Buttons label="Connexion" mode="secondary" />
                <Buttons label="Sign Up" mode="primary" />
            </div> 
        </nav>
    );
};

export default Navigation;
