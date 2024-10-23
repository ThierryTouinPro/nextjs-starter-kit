import React from "react";
import styles from "./css/Buttons.module.css";

function ButtonSubmit({ action, type, label, mode, disabled }) {

  const isDisabled = disabled ? { disabled, className: styles.styleDisabled } : {};
  return (
    <div className={` ${styles.authButtons}`}>
      <button
        type={type}
        className={`border-0 ${
          mode === "primary" ? styles.buttonPrimary : styles.buttonSecondary
        } ${disabled ? styles.styleDisabled : ''}`}
        onClick={action}
        {...isDisabled}       
      >
        {label}
      </button>
    </div>
  );
}

export default ButtonSubmit;
