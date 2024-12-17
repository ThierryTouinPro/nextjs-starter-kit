import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import styles from "./css/Header.module.css";
import Logo from "./Logo";
import Navigation from "./Navigation";
import ButtonLink from "../Interface/ButtonLink";
import LanguageSwitcherButton from "../Interface/LanguageSwitcherButton"; // Importez le bouton de changement de langue
import { useClientTranslation } from "../../../utils/useClientTranslation";

function Header(): JSX.Element {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);
  const [isHome, setIsHome] = useState<boolean>(false);
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const navbarTogglerRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node) &&
        navbarOpen
      ) {
        setNavbarOpen(false);
      }
    },
    [navbarOpen]
  );

  useEffect(() => {
    // Vérifie si l'URL actuelle est "/" ou "/en" ou "/fr"
    setIsHome(
      router.pathname === "/" ||
        router.pathname === "/en" ||
        router.pathname === "/fr"
    );

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside, router.pathname]);

  useEffect(() => {
    const handleRouteChange = () => {
      if (navbarTogglerRef.current && navbarOpen) {
        navbarTogglerRef.current.click();
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, navbarOpen]);

  const { t, isClient } = useClientTranslation("common"); // Utilisez le hook avec le namespace 'common'

  if (!isClient) {
    return null; // Évite le rendu côté serveur
  }

  return (
    <header
      className={`${styles.header} container-fluid pt-4 ${
        isHome ? styles.headerHome : ""
      }`}
      style={{ backgroundColor: "transparent" }}
    >
      {isHome && (
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
      )}
      <div className="container pb-4 pt-2">
        <div className="row">
          <nav
            className={`navbar navbar-expand-lg ${styles.navBar} col-md-12 col-lg-8`}
            ref={navbarRef}
          >
            <Logo />
            <button
              ref={navbarTogglerRef}
              className={`navbar-toggler ${styles.navToggler} ms-auto`}
              type="button"
              aria-controls="navbarNav"
              aria-expanded={navbarOpen ? "true" : "false"}
              onClick={toggleNavbar}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={`collapse navbar-collapse ${
                navbarOpen ? "show" : ""
              } ${styles.navbarCollapse}`}
              id="navbarNav"
            >
              <Navigation />
            </div>
            <div className="d-lg-none">
              <LanguageSwitcherButton />
            </div>
          </nav>
          <div className="col-4 d-none d-lg-block">
            <div className="d-flex justify-content-end gap-4">
              <ButtonLink
                label="Inscription"
                mode="primary"
                href="/auth/registration"
              />
              <LanguageSwitcherButton />
            </div>
          </div>
        </div>
      </div>
      {isHome && (
        <section className={`text-center ${styles.section}`}>
          <div className="container">
            <h1 className="display-4">{t("title-home")}</h1>
            <p className="lead text-center display-4">{t("text-home")}</p>
            <div
              className={`d-flex flex-md-row align-items-center justify-content-center ${styles.buttons}`}
            >
              <ButtonLink
                label="Jira"
                mode="primary"
                href="https://delivery.inetum.com/jira/secure/RapidBoard.jspa?rapidView=4869&view=planning&selectedIssue=DPPCP-113&issueLimit=100#"
              />
              <ButtonLink
                label="Confluence"
                mode="secondary"
                href="https://delivery.inetum.com/confluence/display/DPPS2402/Projet+Collaboratif+Interne+%3A+Next.js+Starter+Kit"
              />
            </div>
          </div>
        </section>
      )}
    </header>
  );
}

export default Header;
