import React from "react";
import styles from "./css/Register.module.css";

export function Sidebar({ currentStep }) {
  const steps = [
    { number: 1, stepName: "Étape 1", label: "Informations personnelles" },
    { number: 2, stepName: "Étape 2", label: "Choisir un mot de passe" },
  ];

  console.log(currentStep);

  return (
    <div className={styles.sidebar}>
      <ul className="list-group list-unstyled d-flex flex-column align-items-center justify-content-center">
        {steps.map(({ number, stepName, label }) => (
          <li
            key={number}
            className={`d-flex align-items-center ${
              currentStep === number ? styles.active : ""
            }`}
          >
            <span className="d-flex align-items-center justify-content-center">
              <div
                className={`text-uppercase small me-2 ${
                  currentStep === number ? styles.activeText : "d-none"
                }`}
              >
              {stepName} :
              </div>
              <div
                className={`text-uppercase ${
                  currentStep === number ? styles.activeText : "d-none"
                }`} >
                {label}
              </div>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
