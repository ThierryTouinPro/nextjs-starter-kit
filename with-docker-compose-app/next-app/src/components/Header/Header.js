import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./css/Header.module.css";
import Logo from "./Logo";
import Navigation from "./Navigation";
import ButtonLink from "../Interface/ButtonLink";

function Header() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isHome, setisHome] = useState(false);
  const navbarRef = useRef(null);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  const handleClickOutside = useCallback(
    (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        navbarOpen
      ) {
        setNavbarOpen(false);
      }
    },
    [navbarOpen]
  );

  useEffect(() => {
    setisHome(true);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <header
      className={`${styles.header} container-fluid pt-4 ${
        isHome && window.location.pathname === "/" ? styles.headerHome : ""
      }`}
      style={{ backgroundColor: "transparent" }}
    >
      {isHome && window.location.pathname === "/" && (
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
          </nav>
          <div className="col-4 d-none d-lg-block">
            <div className="d-flex justify-content-end gap-4">
              <ButtonLink label="Connexion" mode="primary" href="/auth/connexion" className="me-2" />
              {/* <ButtonLink label="Inscription" mode="primary" href="/auth/registration" /> */}
            </div>
          </div>
        </div>
      </div>
      {isHome && window.location.pathname === "/" && (
        <section className={`text-center ${styles.section}`}>
          <div className="container">
            <h1 className="display-4">Next.js Starter Kit</h1>
            <p className="lead text-center display-4">
              Présentation des concepts et fonctionnalités de NextJS pour une
              réutilisation dans un projet.
            </p>
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
