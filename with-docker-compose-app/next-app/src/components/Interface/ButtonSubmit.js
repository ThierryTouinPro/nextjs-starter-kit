import React from "react";
import styles from "./css/Buttons.module.css";

function ButtonSubmit({ type, label, mode, onClick }) {
  return (
    <div className={` ${styles.authButtons}`}>
      <button
        type={type}
        {...(type === "button" && { onClick })}
        className={`border-0 ${
          mode === "primary" ? styles.buttonPrimary : styles.buttonSecondary
        }`}
      >
        {label}
      </button>
    </div>
  );
}

export default ButtonSubmit;
