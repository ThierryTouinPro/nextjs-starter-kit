import Head from "next/head";
import MainHome from "../components/Home/MainHome";
const logger = require('../logger');


export default function Home() {

  logger.info('Home page loaded'); // Un log de niveau "info"
  
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
