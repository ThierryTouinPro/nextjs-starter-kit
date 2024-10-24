import React from "react";
import styles from "./css/Buttons.module.css";

function ButtonSubmit({ action, type, label, mode }) {

  return (
    <div className={` ${styles.authButtons}`}>
      <button
        type={type}
        className={`border-0 ${
          mode === "primary" ? styles.buttonPrimary : styles.buttonSecondary} `}
        onClick={action}    
      >
        {label}
      </button>
    </div>
  );
}

export default ButtonSubmit;
