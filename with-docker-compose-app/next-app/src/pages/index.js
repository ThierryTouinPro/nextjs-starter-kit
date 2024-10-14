import FeatureFuture from "../components/Home/FeatureFuture";
import FeatureExtras from "../components/Home/FeatureExtras";
import FeatureInfrastructure from "../components/Home/FeatureInfrastructure";
import Head from "next/head";



export default function Home() {
  return (
    <>
      <div className="container home">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Blogr - NextJS</title>
        </Head>
        <section className="row align-items-center my-5">
          <FeatureFuture />
        </section>
        <section className="state-art-section rounded-corners circle-image-background">
          <FeatureInfrastructure />
        </section>
        <section className="row align-items-center my-5">
          <FeatureExtras />
        </section>
      </div>
    </>
  );
}
