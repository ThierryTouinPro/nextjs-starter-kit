import FeatureFuture from "../../components/Home/FeatureFuture";
import FeatureExtras from "../../components/Home/FeatureExtras";
import FeatureInfrastructure from "../../components/Home/FeatureInfrastructure";

export default function MainHome() {
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
    
  )
}
