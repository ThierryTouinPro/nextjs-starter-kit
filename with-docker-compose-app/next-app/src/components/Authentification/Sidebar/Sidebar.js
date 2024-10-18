import React from "react";
import styles from "./css/Sidebar.module.css";

export function Sidebar({ step }) {
  const steps = [
    { number: 1, stepName: "Etape 1", label: "Informations personnelles" },
    { number: 2, stepName: "Etape 2", label: "Choisir un mot de passe" },
  ];

  return (
    <div className={styles.sidebar}>
      <ul className="list-group list-unstyled">
        {steps.map(({ number, stepName, label }) => (
          <li
            key={number}
            className={`d-flex align-items-center gap-1 mb-3 ${
              step === number ? styles.active : ""
            }`}
          >
            <span
              className={`me-2 ${styles.stepCircle} ${
                step === number ? styles.activeStepCircle : ""
              }`}
            >
              {number}
            </span>

            <span className="ms-4 d-flex flex-column justify-content-center">
              <div
                className={`text-muted text-uppercase small ${
                  step === number ? styles.activeText : ""
                }`}
              >
                {stepName}
              </div>
              <div
                className={`text-secondary text-uppercase mt-1 fw-semibold ${
                  step === number ? styles.activeText : ""
                }`}
              >
                {label}
              </div>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
