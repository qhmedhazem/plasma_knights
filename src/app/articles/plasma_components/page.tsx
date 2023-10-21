import Image from "next/image";
import ArticleImg from "../../../../public/magnetosphere.jpeg";

import FlowSpeed from "./flow_speed/page";
import ProtonTemperature from "./proton_temperature/page";
import ProtonDensity from "./proton_density/page";
import ProtonVelocity from "./proton_velocity/page";

// const PlasmaComponents = [
//   {
//     name: "Flow Speed",
//     description: "",
//     href: "/articles/plasma_components/flow_speed",
//   },
//   {
//     name: "Proton Temperature",
//     description: "",
//     href: "/articles/plasma_components/proton_temperature",
//   },
//   {
//     name: "Proton Density",
//     description: "",
//     href: "/articles/plasma_components/proton_density",
//   },
//   {
//     name: "Proton Velocity",
//     description: "",
//     href: "/articles/plasma_components/proton_velocity",
//   },
// ];

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen text-lg">
      <div className="relative w-full min-h-[420px] rounded-lg overflow-hidden bg-black">
        <div className="w-full h-full">
          <Image
            src={ArticleImg}
            alt="magnetosphere"
            className="h-full object-cover absolute right-0 z-10"
          />
        </div>

        <h1
          className="text-5xl font-bold text-white absolute bottom-0 py-12 px-12 w-full z-20"
          style={{
            backgroundImage: "linear-gradient(transparent, rgba(0,0,0,0.9))",
          }}
        >
          Plasma Components
        </h1>
      </div>
      <section className="mt-8">
        <p>
          Plasma, the fourth state of matter, is a complex and electrifying
          medium with diverse components crucial for understanding its behavior.
          Within a plasma, protons, along with other charged particles, exhibit
          varying flow speeds, making it essential to investigate their
          velocities to comprehend dynamic phenomena. Proton temperature, a
          measure of kinetic energy, influences plasma stability and reactions.
          Proton density, the concentration of these positively charged
          particles, plays a pivotal role in determining plasma properties.
          Additionally, the proton velocity distribution is essential for
          predicting particle interactions and transport phenomena. This
          Overview sets the stage for exploring the multifaceted nature of
          plasmas and their constituents.
        </p>
      </section>
      <div className="flex flex-col gap-8 mt-8">
        <FlowSpeed />
        <ProtonTemperature />
        <ProtonDensity />
        <ProtonVelocity />
      </div>
    </div>
  );
}
