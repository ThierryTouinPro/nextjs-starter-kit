import ButtonLink from "@/components/Interface/ButtonLink";
import ButtonSubmit from "@/components/Interface/ButtonSubmit";

interface AuthButtonProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  t: (key: string) => string;
}

export function AuthButton({ isLoggedIn, onLogout, t }: AuthButtonProps) {
  // Déterminer le mode selon la taille de l'écran
  const buttonMode =
    typeof window !== "undefined" && window.innerWidth < 768
      ? "secondary"
      : "primary";

  return (
    <>
      {isLoggedIn ? (
        <>
          <ButtonLink
            label={t("link-profile")}
            mode={buttonMode}
            href="/profile"
          />
          <ButtonSubmit
            type="button"
            label={t("button-logout")}
            mode={buttonMode}
            action={onLogout}
          />
        </>
      ) : (
        <>
          <ButtonLink
            label={t("title-connection")}
            mode={buttonMode}
            href="/auth/connexion"
          />
          <ButtonLink
            label={t("title-register")}
            mode={buttonMode}
            href="/auth/registration"
          />
        </>
      )}
    </>
  );
}
