"use client";

import { useRouter } from "next/router";
import { useClientTranslation } from "@/utils/useClientTranslation";

export function useLanguageSwitcher() {
  const router = useRouter();
  const { i18n } = useClientTranslation();

  // Détermine la langue actuelle
  const currentLocale = router.locale || "fr";
  const nextLocale = currentLocale === "en" ? "fr" : "en";

  // Détermine l'icône de drapeau
  const flagIcon = nextLocale === "fr" ? "gb" : "fr";

  // Fonction pour changer la langue
  const switchLanguage = () => {
    i18n.changeLanguage(nextLocale);
    console.log("Current cookies before language change:", document.cookie);
    router.push(router.asPath, undefined, { locale: nextLocale });
    console.log("Current cookies after language change:", document.cookie);
  };

  return { switchLanguage, flagIcon, currentLocale, nextLocale };
}
