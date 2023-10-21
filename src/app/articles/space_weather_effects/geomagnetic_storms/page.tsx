export default function Page() {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-4xl mb-3 font-bold">Geomagnetic Storms</h1>
      <p>
        Geomagnetic storms represent substantial disturbances in Earth&apos;s
        magnetosphere, occurring when the solar wind efficiently transfers
        energy into our planet&apos;s space environment. These storms result
        from solar wind fluctuations that induce significant alterations in the
        currents, plasma, and magnetic fields within Earth&apos;s magnetosphere.
        Geomagnetic storm-triggering solar wind conditions encompass sustained
        periods of high-speed solar wind, particularly when the solar
        wind&apos;s magnetic field points southward relative to Earth&apos;s
        magnetic field on the dayside of the magnetosphere. This configuration
        facilitates the transfer of energy from the solar wind into Earth&apos;s
        magnetosphere.
      </p>
      <p>
        The most potent geomagnetic storms are linked to solar coronal mass
        ejections (CMEs), involving the arrival of massive plasma quantities,
        often laden with magnetic fields, from the Sun. Although CMEs typically
        take a few days to reach Earth, some intense storms have been observed
        to arrive within as little as 18 hours. High-speed solar wind streams,
        known as co-rotating interaction regions (CIRs), also set the stage for
        geomagnetic storms by colliding with slower solar wind.
      </p>
      <p>
        These storms generate substantial magnetospheric currents, alter
        radiation belts, heat the ionosphere, and impact the thermosphere.
        Ground-based magnetic disturbances, linked to westward currents
        encircling Earth, are quantified using the disturbance storm time (Dst)
        index. Field-aligned currents in the magnetosphere connect with powerful
        auroral electrojets, amplifying magnetic disturbances. These currents
        and their ground-based effects contribute to the planetary geomagnetic
        disturbance index known as Kp. This index underpins the Geomagnetic
        Storm (G-Scale) within NOAA&apos;s Space Weather Scales, assessing space
        weather&apos;s potential to disrupt terrestrial systems.
      </p>
      <p>
        During geomagnetic storms, ionospheric currents and energetic particles
        introduce heat, altering upper atmosphere density and satellite drag in
        low Earth orbit. This local heating results in significant ionospheric
        density variations, affecting radio signal paths and GPS accuracy. While
        geomagnetic storms offer captivating auroral displays, they also pose
        challenges to navigation systems, such as the Global Navigation
        Satellite System (GNSS), and induce disruptive geomagnetic currents
        (GICs) in power grids and pipelines.
      </p>
    </main>
  );
}
