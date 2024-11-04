import FeatureFuture from "./FeatureFuture";
import FeatureExtras from "./FeatureExtras";
import FeatureInfrastructure from "./FeatureInfrastructure";

export default function MainHome(): JSX.Element {
  return (
    <>
      <section className="row align-items-center my-5">
        <FeatureFuture />
      </section>
      <section className="state-art-section rounded-corners circle-image-background">
        <FeatureInfrastructure />
      </section>
      <section className="row align-items-center my-5">
        <FeatureExtras />
      </section>
    </>
  );
}
