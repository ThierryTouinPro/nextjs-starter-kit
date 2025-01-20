import Link from "next/link";
import styles from "@/components/Interface/css/Buttons.module.css";

interface ButtonLinkProps {
  label: string;
  mode: "primary" | "secondary";
  href: string;
  target: string;
}

function ButtonLink({ label, mode, href }: ButtonLinkProps): JSX.Element {
  return (
    <div className={`d-flex align-items-center ${styles.authButtons}`}>
      <Link
        href={href}
        className={`d-block ${
          mode === "primary" ? styles.buttonPrimary : styles.buttonSecondary
        }`}
        target={
          (typeof target === 'undefined') ? '_self' : target
        }
      >
        {label}
      </Link>
    </div>
  );
}

export default ButtonLink;
