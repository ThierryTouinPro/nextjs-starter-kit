import { useTranslation } from "react-i18next";
import classes from "@/components/Footer/css/Footer.module.css";
import { mainMenus } from "@/data/main-menus";
import { useRouter } from "next/router";
import Link from "next/link";

interface FooterMenu {
  groupTitle: string;
  subMenus: string[];
}

function Footer(): JSX.Element {
  const { t } = useTranslation(); // Initialisation du hook pour la traduction
  const menus = mainMenus();
  const router = useRouter();

  // Détermine le préfixe en fonction de la langue
  const getLanguagePrefix = () => {
    if (router.pathname.startsWith("/en")) {
      return "/en";
    }
    // Retourne "/" pour toutes les autres langues (par défaut, Français)
    return "";
  };

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
                    <Link
                      href={`${getLanguagePrefix()}/${subMenu.toLowerCase()}`}
                      passHref
                    >
                      {t(subMenu)}
                    </Link>
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
