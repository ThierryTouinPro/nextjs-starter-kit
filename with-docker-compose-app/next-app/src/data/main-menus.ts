import { useTranslation } from "react-i18next";

export interface SubMenu {
  groupTitle: string;
  subMenus: string[];
  routes: string[];
}

export const mainMenus = (): SubMenu[] => {
  const { t } = useTranslation(); // Initialiser le hook de traduction

  return [
    {
      groupTitle: t("Documentation"),
      subMenus: [t("Jira"), t("Confluence"), t("Tutoriels")],
      routes: ["jira", "confluence", "tutoriels"],
    },
    {
      groupTitle: t("Inetum"),
      subMenus: [t("Équipe"), t("Ressources")],
      routes: ["equipe", "ressources"],
    },
    {
      groupTitle: t("Installation"),
      subMenus: [t("Guide"), t("Prérequis"), t("Configuration")],
      routes: ["guide", "Prerequis", "configuration"],
    },
  ];
};
