import Image from "next/image";
import ArticleImg from "../../../../public/sun_article_img.jpg";

import SunMagneticField from "./sun_magnetic_field/page";
import SolarFlares from "./solar_flares/page";
import Plasma from "./plasma/page";
import MagneticReconnection from "./magnetic_reconnection/page";
import SloarWindTypes from "./solar_wind_types/page";
import CME from "./cme/page";
import IMF from "./imf/page";

// const Sun = [
//   {
//     name: "Sun Magnetic Field",
//     description: "",
//     href: "/articles/sun/sun_magnetic_field",
//   },
//   {
//     name: "Solar Flares",
//     description: "",
//     href: "/articles/sun/solar_flares",
//   },
//   {
//     name: "Plasma",
//     description: "",
//     href: "/articles/sun/plasma",
//   },
//   {
//     name: "Magnetic Reconnection",
//     description: "",
//     href: "/articles/sun/magnetic_reconnection",
//   },
//   {
//     name: "Solar Wind Types",
//     description: "",
//     href: "/articles/sun/solar_wind_types",
//   },
//   {
//     name: "CME",
//     description: "",
//     href: "/articles/sun/cme",
//   },
//   {
//     name: "Solar Cycle Activity",
//     description: "",
//     href: "/articles/sun/solar_cycle_activity",
//   },
//   {
//     name: "Interplantary Magnetic Field",
//     description: "",
//     href: "/articles/sun/imf",
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
          The Sun
        </h1>
      </div>
      <section className="mt-8">
        <p>
          The Sun, a G-type main-sequence star, serves as the life-giving
          celestial body at the heart of our solar system. Comprising primarily
          of hydrogen and helium, its immense gravitational pressure triggers
          nuclear fusion, generating a continuous outpouring of radiant energy.
          This solar energy sustains life on Earth, driving climate,
          photosynthesis, and weather patterns. The Sun&apos;s complex magnetic
          field influences space weather, impacting satellites and power grids.
          Understanding the Sun&apos;s behavior and its intricate processes is
          crucial for space exploration, climate studies, and predicting solar
          activity, as fluctuations in its luminosity can have profound effects
          on our planet and the broader cosmos.
        </p>
      </section>
      <div className="flex flex-col gap-8 mt-8">
        <SunMagneticField />
        <SolarFlares />
        <Plasma />
        <MagneticReconnection />

        <SloarWindTypes />
        <CME />
        <IMF />
      </div>
    </div>
  );
}
