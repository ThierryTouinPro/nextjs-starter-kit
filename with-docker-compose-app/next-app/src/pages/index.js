import Head from "next/head";
import MainHome from "../components/Home/MainHome";


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
