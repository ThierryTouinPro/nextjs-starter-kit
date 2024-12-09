import { useTranslation } from "react-i18next";

export interface SubMenu {
  groupTitle: string;
  subMenus: string[];
}

export const mainMenus = (): SubMenu[] => {
  const { t } = useTranslation(); // Initialiser le hook de traduction

  return [
    {
      groupTitle: t("Documentation"),
      subMenus: [t("Jira"), t("Confluence"), t("Tutoriels")],
    },
    {
      groupTitle: t("Inetum"),
      subMenus: [t("Équipe"), t("Ressources")],
    },
    {
      groupTitle: t("Installation"),
      subMenus: [t("Guide"), t("Prérequis"), t("Configuration")],
    },
  ];
};
