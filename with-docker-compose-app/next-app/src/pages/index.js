import Head from "next/head";
import MainHome from "../components/Home/MainHome";

let logger;
if (typeof window === 'undefined') {
  // Nous sommes dans un environnement côté serveur
  logger = require('../config/winston');
}

export default function Home() {
  return (
    <>
      <div className="container home">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>NSK Site - NextJS</title>
        </Head>
        <MainHome />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  // Vérifiez si le logger est défini (cela signifie que nous sommes côté serveur)
  if (logger) {
    logger.info("Page d'accueil rendue avec succès - Niveau Info");
    logger.error("Une erreur fictive est survenue - Niveau Error");
    logger.debug("Debugging les données du serveur - Niveau Debug");
  }

  return {
    props: {}, // Possible de passer des props ici si nécessaire
  };
}
