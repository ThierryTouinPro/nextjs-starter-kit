import { useTranslation } from "react-i18next";
import classes from "./css/Footer.module.css";
import { mainMenus } from "../../data/main-menus";

interface FooterMenu {
  groupTitle: string;
  subMenus: string[];
}

function Footer(): JSX.Element {
  const { t } = useTranslation(); // Initialisation du hook pour la traduction
  const menus = mainMenus();

  return (
    <footer className={classes.footer}>
      <div className="container p-2">
        <div className="row mt-5 mb-5">
          {/* Section pour le titre du site */}
          <div className="col-12 col-md-auto xs-auto text-center text-md-left">
            <h2 className="fw-bold mb-4 text-white">NSK Site</h2>
          </div>

          {/* Boucle sur les menus principaux */}
          {menus.map((footerMenu: FooterMenu) => (
            <div
              className="col-12 col-md-auto mx-auto text-center text-md-left"
              key={footerMenu.groupTitle}
            >
              {/* Affichage du titre du groupe de menu */}
              <h4 className="fw-bold mb-3 text-white">
                {t(footerMenu.groupTitle)} {/* Traduction du titre de groupe */}
              </h4>
              <ul className="list-unstyled text-white">
                {/* Boucle sur les sous-menus et traduction */}
                {footerMenu.subMenus.map((subMenu: string) => (
                  <li className="mb-1" key={subMenu}>
                    <a href={`/${subMenu.toLowerCase()}`}>{t(subMenu)}</a>{" "}
                    {/* Traduction de chaque sous-menu */}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
