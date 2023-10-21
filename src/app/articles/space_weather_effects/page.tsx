import Image from "next/image";
import ArticleImg from "../../../../public/magnetosphere.jpeg";

import GeoMagneticStorms from "./geomagnetic_storms/page";
import SolarRadiationStorms from "./solar_radiation_storms/page";
import RadioBlockouts from "./radio_blackouts/page";

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
          Space Weather Effects
        </h1>
      </div>
      <section className="mt-8">
        <p>
          Space weather encompasses a complex array of phenomena emanating from
          the Sun, with significant implications for our technological
          infrastructure. Geomagnetic storms, arising from solar eruptions, can
          perturb Earth&apos;s magnetic field and induce electrical currents,
          impacting power grids and communication systems. Solar radiation
          storms, characterized by elevated solar particle flux, pose health
          risks to astronauts and can disrupt satellite operations. Radio
          blockouts result from ionospheric disturbances during extreme solar
          events, impeding radio signals crucial for aviation and navigation.
          This Overview highlights the critical importance of understanding and
          monitoring space weather effects, as they can profoundly influence our
          modern society and technological advancements.
        </p>
      </section>
      <div className="flex flex-col gap-8 mt-8">
        <GeoMagneticStorms />
        <SolarRadiationStorms />
        <RadioBlockouts />
      </div>
    </div>
  );
}
