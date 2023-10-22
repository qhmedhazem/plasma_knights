import Image from "next/image";
import ArticleImg from "../../public/overview.png";

export default function Home() {
  return (
    <main className="flex flex-col gap-8 text-lg">
      <div className="relative w-full min-h-[420px] rounded-lg overflow-hidden bg-black">
        <div className="w-full h-full">
          {/* <Image
            src={ArticleImg}
            alt="magnetosphere"
            className="h-full object-cover absolute z-10"
          /> */}
          <video
            src="/magnetic_reconnection.webm"
            loop
            autoPlay
            muted
            className="w-full h-full object-cover absolute z-10"
          />
        </div>

        <div
          className="flex flex-col gap-2 text-5xl font-bold text-white absolute bottom-0 py-12 px-12 w-full z-20"
          style={{
            backgroundImage: "linear-gradient(transparent, rgba(0,0,0,0.9))",
          }}
        >
          <h1 className="">Overview</h1>
          <p className="text-xs text-gray-400 font-bold uppercase">
            Media Content: How Magnetic Reconnection Happens
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Magnetic Reconnection</h2>
          <p>
            Magnetic Reconnection (MR) is an intricate process where magnetic
            field lines merge. When MR transpires between the Interplanetary
            Magnetic Field (IMF) and Earth's magnetic field, it permits
            solar-wind plasma particles to infiltrate the region near Earth,
            known as Geospace. However, MR alters the transport of plasma inside
            Geospace, leading to space weather events that can potentially harm
            our vital communication satellites, and navigation systems, and even
            disrupt terrestrial power grids.
          </p>
          <p>
            At about one million miles towards the Sun from Earth, NASA's
            Advanced Composition Explorer (ACE) and Wind missions, alongside
            NOAA's Deep Space Climate Observatory (DSCOVR) mission, are
            strategically positioned at Lagrange point 1 (L1) to consistently
            monitor the IMF. The IMF is characterized by three components: X, Y,
            and Z. In the Geocentric Solar Magnetospheric (GSM) Coordinate
            System, the X-axis stretches from Earth toward the Sun, the Y-axis
            is perpendicular to Earth's magnetic dipole, and the positive Z-axis
            points toward Earth's northern magnetic pole.
          </p>
          <p>
            The challenge lies in precisely measuring the IMF components and the
            magnetic field in the region where reconnection interacts with
            Earth's magnetosphere within the diffusion region. This region
            possesses a complex structure that can either be stationary or in
            motion. To delve into the analysis of the diffusion region, we
            employ the LMN coordinate system, a well-suited framework for
            capturing its crucial characteristics.
          </p>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">How It Works</h2>
          <p>
            The LMN coordinate system is a fundamental component of our solution
            for studying magnetic reconnection. It is based on the minimum
            variance analysis of magnetic field fluctuations, which identifies
            the directions of maximum (L), intermediate (M), and minimum (N)
            variance in the magnetic field. The L direction corresponds to the
            outflow direction of reconnection jets, the M direction follows the
            X line (the reconnection locus), and the N direction is
            perpendicular to the current sheet a thin plasma layer where
            magnetic field direction changes.
          </p>
          <p>
            The LMN coordinate system offers several advantages over other
            coordinate systems, such as GSE (Geocentric Solar Ecliptic) or GSM
            (Geocentric Solar Magnetospheric). Firstly, it is a local and
            adaptive system, tailored to the diffusion region, allowing for
            precise descriptions of its local geometry and dynamics. In
            contrast, GSE and GSM are global and Earth-fixed, which may not
            capture the region's intricate variations. Secondly, LMN can
            differentiate between different types of reconnection, such as
            symmetric or asymmetric, guide field, or no guide field. This
            classification is based on the orientation and magnitude of magnetic
            field components in each direction, a capability that GSE and GSM
            lack. Lastly, the LMN system can be seamlessly applied to spacecraft
            data, provided there are sufficient magnetic field measurements for
            minimum variance analysis. In contrast, GSE and GSM systems require
            additional information, such as spacecraft position and velocity,
            which may not always be available or accurate.
          </p>
          <p>
            Utilizing the LMN coordinate system within our testing process
            significantly enhances the capacity to assess the probability of
            magnetic reconnection occurrences. This enhanced accuracy in
            characterizing the diffusion region leads to more efficient analysis
            compared to using GSE or GSM coordinate systems.
          </p>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Warning Prediction Analysis</h2>
          <p>
            In addition to the testing and analysis aspects, our computer
            program incorporates a predictive component. This prediction module
            utilizes various data sources, including Kp value scales and IMF
            data parameters of plasma from NOAA. It also considers the direction
            of plasma in theta and phi. The goal of this predictive component is
            to anticipate the intensity of space weather phenomena and provide
            timely warnings to mitigate their impact.
          </p>
          <h4 className="font-semibold text-xl">
            The prediction model encompasses the following:
          </h4>
          <ul className="flex flex-col gap-4 list-inside list-disc">
            <li>
              <strong>Geomagnetic Storms: </strong>
              <span>
                Predictions are made based on the flux level of plasma particles
                in MeV. The program categorizes the storms into different
                intensity levels and durations. It issues suitable warnings with
                expected effects and timeframes.
              </span>
            </li>
            <li>
              <strong>Solar Radiation Storms: </strong>
              <span>
                Predictions are based on the flux of incoming plasma and GOES
                X-ray peak brightness by class. The program classifies radiation
                storms into categories and issues appropriate warnings with
                expected impacts.
              </span>
            </li>
            <li>
              <strong>Radio Blackouts: </strong>
              <span>
                Predictions depend on the level of plasma flux and the
                anticipated effects on communications. The program categorizes
                blackouts based on duration and influence and delivers relevant
                warnings.
              </span>
            </li>
          </ul>
        </section>
        <section className="flex flex-col gap-4">
          <p>
            This comprehensive predictive component ensures that space weather
            events are forecasted, and stakeholders receive timely and accurate
            warnings with recommended actions to safeguard critical systems and
            operations.
          </p>
          <p>
            In summary, our computer program addresses the challenge of
            understanding and predicting magnetic reconnection events in Earth's
            magnetosphere. It leverages sophisticated algorithms, the LMN
            coordinate system for testing, and a predictive component for space
            weather forecasts. The solution offers a holistic approach to
            enhancing space weather monitoring, safeguarding vital
            infrastructure, and reinforcing the safety of space missions and
            Earth's geospace environment.
          </p>
        </section>
      </div>
    </main>
  );
}
