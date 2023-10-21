import Image from "next/image";
import ArticleImg from "../../../../public/sun_article_img.jpg";

import MagneticFieldStrength from "./magnetic_field_strength/page";
import GSM from "./gse_coordinates_system/page";
import GSE from "./gsm_coordinates_system/page";
import LMN from "./lmn_coordinates_system/page";

// const IMFParamaters = [
//   {
//     name: "Magnetic Field Strength (B)",
//     description: "",
//     href: "/articles/imf_parameters/magnetic_field_strength",
//   },
//   {
//     name: "GSM Coordinates System",
//     description: "",
//     href: "/articles/imf_parameters/gsm_coordinates_system",
//   },
//   {
//     name: "GSE Coordinates System",
//     description: "",
//     href: "/articles/imf_parameters/gse_coordinates_system",
//   },
//   {
//     name: "LMN Coordinates System",
//     description: "",
//     href: "/articles/imf_parameters/lmn_coordinates_system",
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
          IMF Parameters
        </h1>
      </div>
      <section className="mt-8">
        <p>
          The Interplanetary Magnetic Field (IMF) is a critical component of
          space physics, influencing various interplanetary and magnetospheric
          processes. This introductory passage focuses on key IMF parameters
          within various coordinate systems. Magnetic field strength (B)
          quantifies the IMF&apos;s intensity, determining its impact on space
          environments. The GSM (Geocentric Solar Magnetospheric) coordinates
          system aligns with Earth&apos;s magnetosphere, offering a reference
          frame for studying IMF interactions. The GSE (Geocentric Solar
          Ecliptic) coordinates system is heliocentric and facilitates tracking
          IMF variations in the solar plane. The LMN coordinates system
          describes the IMF&apos;s orientation in relation to the Earth&apos;s
          magnetosphere, vital for understanding its effects on magnetospheric
          dynamics. These parameters and coordinate systems collectively enable
          comprehensive IMF analysis.
        </p>
      </section>
      <div className="flex flex-col gap-8 mt-8">
        <MagneticFieldStrength />
        <GSM />
        <GSE />
        <LMN />
      </div>
    </div>
  );
}
