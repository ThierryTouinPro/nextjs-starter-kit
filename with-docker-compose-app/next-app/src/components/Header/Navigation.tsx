import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./css/Navigation.module.css";
import { mainMenus } from "../../data/main-menus";
import { useTranslation } from "react-i18next";
import { AuthButton } from "components/Interface/AuthButton";
import { useAuth } from "components/Authentification/Logout/useAuth";

interface Menu {
  groupTitle: string;
  subMenus: string[];
}

function Navigation(): JSX.Element {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { t } = useTranslation(); // Initialisation du hook pour la traduction
  const menus = mainMenus();

  const { isLoggedIn, handleLogout } = useAuth();

  const toggleDropdown = (menuTitle: string) => {
    setOpenDropdown(openDropdown === menuTitle ? null : menuTitle);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      ref={dropdownRef}
      className={`d-flex align-items-center col-12 ${styles.nav}`}
    >
      {menus.map((menu: Menu, index: number) => (
        <div className="nav-item dropdown" key={index}>
          <button
            onClick={() => toggleDropdown(menu.groupTitle)}
            className={`${styles.navLink} d-flex align-items-baseline`}
            id={`${menu.groupTitle}Dropdown`}
          >
            {menu.groupTitle}
            <span
              className={`${styles.arrowIcon} ${
                openDropdown === menu.groupTitle ? styles.open : ""
              }`}
            >
              <picture>
                <source
                  srcSet="/images/icon-arrow-light.svg"
                  media="(min-width:50rem)"
                />
                <img src="/images/icon-arrow-dark.svg" alt="Arrow Icon" />
              </picture>
            </span>
          </button>
          <ul
            className={`dropdown-menu ${styles.dropdownMenu} ${
              openDropdown === menu.groupTitle ? styles.show : ""
            }`}
            aria-labelledby={`${menu.groupTitle.toLowerCase()}Dropdown`}
          >
            {menu.subMenus.map((subMenu: string, subIndex: number) => (
              <li key={subIndex}>
                <Link
                  href={`/${subMenu.toLowerCase()}`}
                  className={`dropdown-item ${styles.dropdownItem}`}
                >
                  {subMenu}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="d-flex flex-column align-items-center d-lg-none d-xl-none d-xxl-none justify-content-center gap-2">
        <AuthButton isLoggedIn={isLoggedIn} onLogout={handleLogout} t={t} />
      </div>
    </nav>
  );
}

export default Navigation;
