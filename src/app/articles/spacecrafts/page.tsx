import Image from "next/image";
import ArticleImg from "../../../../public/magnetosphere.jpeg";

import Ace from "./ace/page";
import Wind from "./wind/page";
import Dscovr from "./dscovr/page";

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
          Spacecraft are advanced technological marvels designed to explore and
          utilize the universe. These vehicles play a pivotal role in expanding
          our understanding of the universe, enabling scientific research,
          satellite deployment, and interplanetary missions. Equipped with
          complex propulsion systems, communications networks, and scientific
          instruments, spacecraft traverse the vast expanse of space, taking
          pictures, collecting data, and conducting experiments in the harshest
          environments. The development of spacecraft has revolutionized our
          knowledge of the solar system, distant galaxies, and the basic
          principles that govern the universe. This Overview delves into the
          multifaceted world of spacecraft, explaining their essential role in
          contemporary space exploration.
        </p>
        <p>
          Some of these spacecraft, ACE (Advanced Composition Explorer), Wind,
          and DSCOVR (Deep Space Climate Observatory), are pivotal tools in our
          quest to explore and understand the dynamic environment of space.
          These advanced technology platforms serve multiple purposes, including
          monitoring solar wind and magnetic fields, studying space weather, and
          monitoring Earth&apos;s climate. ACE and Wind contribute to solar and
          space physics, providing important data on solar and cosmic rays,
          while DSCOVR, stationed at Earth-Sun L1, helps with climate and space
          weather research. Together, these spacecraft play a vital role in
          expanding our knowledge of the universe and its impact on our planet.
        </p>
      </section>
      <div className="flex flex-col gap-8 mt-8">
        <Ace />
        <Wind />
        <Dscovr />
      </div>
    </div>
  );
}
