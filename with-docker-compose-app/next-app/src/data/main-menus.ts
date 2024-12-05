export interface SubMenu {
    groupTitle: string;
    subMenus: string[];
  }
  
  export const mainMenus: SubMenu[] = [
    {
      groupTitle: "Documentation",
      subMenus: ["Jira", "Confluence", "Tutoriels"],
    },
    {
      groupTitle: "Inetum",
      subMenus: ["Équipe", "Ressources"],
    },
    {
      groupTitle: "Installation",
      subMenus: ["Guide", "Prérequis", "Configuration"],
    },
  ];
  