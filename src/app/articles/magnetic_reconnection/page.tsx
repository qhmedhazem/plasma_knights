import Image from "next/image";
import ArticleImg from "../../../../public/magnetosphere.jpeg";

// const MagneticReconnection = [
//   {
//     name: "Magnetic Field Lines",
//     description: "",
//     href: "/articles/magnetic_reconnection/magnetic_field_lines",
//   },
//   {
//     name: "Magnetic Reconnection",
//     description: "",
//     href: "/articles/magnetic_reconnection/magnetic_reconnection",
//   },
//   {
//     name: "Sweet-Parker Model",
//     description: "",
//     href: "/articles/magnetic_reconnection/sweet_parker_model",
//   },
//   {
//     name: "Petschek Model",
//     desciption: "",
//     href: "/articles/magnetic_reconnection/petschek_model",
//   },
//   {
//     name: "Diffusion Region",
//     description: "",
//     href: "/articles/magnetic_reconnection/diffusion_region",
//   },
//   {
//     name: "Magnetic Null Point",
//     description: "",
//     href: "/articles/magnetic_reconnection/magnetic_null_point",
//   },
// ];

import MagneticFieldLines from "./magnetic_field_lines/page";
import MagneticReconnection from "./magnetic_reconnection/page";
import SweetParkerModel from "./sweet_parker_model/page";
import PetschekModel from "./petschek_model/page";
import DiffusionRegion from "./diffusion_region/page";
import MagneticNullPoint from "./magnetic_null_point/page";

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
          Magnetic Reconnection (MR)
        </h1>
      </div>
      <section className="mt-8">
        <p>
          Magnetic reconnection (MR) is the merging of opposing magnetic field
          lines, impacting geospace by enabling solar-wind plasma entry and
          altering plasma transport processes. This can induce space weather
          events with adverse effects on terrestrial infrastructure, such as
          satellite communication and power grids. Monitoring the interplanetary
          magnetic field (IMF) at Lagrange point 1, NASA&apos;s ACE and Wind
          missions, along with NOAA&apos;s DSCOVR, provide critical IMF data. MR
          necessitates concurrent reversals of the Z components of IMF and
          Earth&apos;s magnetic field in the GSM Coordinate System. This study
          elucidates the prerequisites for MR occurrence, vital for space
          weather prediction and mitigation efforts.
        </p>
      </section>
      <div className="flex flex-col gap-8 mt-8">
        <MagneticFieldLines />
        <MagneticReconnection />
        <SweetParkerModel />
        <PetschekModel />
        <DiffusionRegion />
        <MagneticNullPoint />
      </div>
    </div>
  );
}
