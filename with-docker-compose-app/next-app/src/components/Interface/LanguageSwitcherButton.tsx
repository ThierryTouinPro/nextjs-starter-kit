import React from "react";
import { useLanguageSwitcher } from "@/utils/languageSwitcher";
import styles from "@/components/Interface/css/LanguageSwitcherButton.module.css";

export default function LanguageSwitcherButton(): JSX.Element {
  const { switchLanguage, flagIcon } = useLanguageSwitcher();

  return (
    <div
      onClick={switchLanguage}
      aria-label="Switch language"
      className={styles.languageSwitcher}
    >
      <span className={`fi fi-${flagIcon} ${styles.flagIcon}`}></span>
    </div>
  );
}
