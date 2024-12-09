import styles from "./css/Buttons.module.css";

interface ButtonSubmitProps {
  action?: () => void;
  type: "button" | "submit" | "reset";
  label: string;
  mode: "primary" | "secondary";
}

function ButtonSubmit({
  action,
  type,
  label,
  mode,
}: ButtonSubmitProps): JSX.Element {
  return (
    <div className={` ${styles.authButtons}`}>
      <button
        type={type}
        className={`border-0 ${
          mode === "primary" ? styles.buttonPrimary : styles.buttonSecondary
        }`}
        onClick={action}
      >
        {label}
      </button>
    </div>
  );
}

export default ButtonSubmit;
