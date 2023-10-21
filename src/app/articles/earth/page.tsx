import Image from "next/image";
import ArticleImg from "../../../../public/sun_article_img.jpg";

// const Earth = [
//   {
//     name: "Earth Magnetosphere",
//     description: "",
//     href: "/articles/earth/magnetosphere",
//   },
//   {
//     name: "Earth Magnetopause",
//     description: "",
//     href: "/articles/earth/magnetopause",
//   },
//   {
//     name: "Earth Magnetotail",
//     description: "",
//     href: "/articles/earth/magnetotail",
//   },
//   {
//     name: "Earth Bow Shock",
//     description: "",
//     href: "/articles/earth/bow_shock",
//   },
//   {
//     name: "Van Allen radiation belts",
//     description: "",
//     href: "/articles/earth/van_allen_radiation_belts",
//   },
// ];

import Magnetosphere from "./magnetosphere/page";
import Magnetopause from "./magnetopause/page";
import Magnetotail from "./magnetotail/page";
import BowShock from "./bow_shock/page";
import VanAllenRadiationBelts from "./van_allen_radiation_belts/page";

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
          The Earth
        </h1>
      </div>
      <section className="mt-8">
        <p>
          The Earth, our home planet, possesses a complex and dynamic magnetic
          field that plays a vital role in preserving the habitable conditions
          necessary for life to thrive. This protective shield, known as the
          geomagnetic field, shields us from the potentially devastating effects
          of solar storms, or solar flares, emitted by our Sun. These
          high-energy eruptions release charged particles and intense radiation,
          which, if not for Earth&apos;s magnetic field, could disrupt our
          atmosphere, damage electronic systems, and even endanger life on our
          planet. Understanding the Earth&apos;s magnetic field and its
          interaction with solar activity is crucial for safeguarding our
          technological infrastructure and the preservation of life as we know
          it.
        </p>
      </section>
      <div className="flex flex-col gap-8 mt-8">
        <Magnetosphere />
        <Magnetopause />
        <Magnetotail />
        <BowShock />
        <VanAllenRadiationBelts />
      </div>
    </div>
  );
}
