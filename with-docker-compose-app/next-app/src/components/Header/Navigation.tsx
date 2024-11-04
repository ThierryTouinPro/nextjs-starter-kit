import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './css/Navigation.module.css';
import { mainMenus } from '../../data/main-menus';
import ButtonLink from '../Interface/ButtonLink';

interface Menu {
  groupTitle: string;
  subMenus: string[];
}

function Navigation(): JSX.Element {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = (menuTitle: string) => {
    setOpenDropdown(openDropdown === menuTitle ? null : menuTitle);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav ref={dropdownRef} className={`d-flex align-items-center col-12 ${styles.nav}`}>
      {mainMenus.map((menu: Menu, index: number) => (
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
            {menu.subMenus.map((subMenu: string, subIndex: number) => (
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
        <ButtonLink 
          label="Inscription" 
          mode={typeof window !== 'undefined' && window.innerWidth < 768 ? 'secondary' : 'primary'} 
          href="/auth/registration" 
        />
      </div> 
      
    </nav>
  );
};

export default Navigation;
