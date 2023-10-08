export default function Page() {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-4xl mb-3">GSE coordinate system</h1>
      <p>
        The Geocentric Solar Ecliptic (GSE) coordinate system is another
        coordinate system used in space physics and astrophysics to describe the
        position and orientation of objects and phenomena within the solar
        system, particularly focusing on the Earth&apos;s interaction with the
        solar wind and the Sun. The GSE coordinate system is centered on the
        Earth, with its axes aligned with the solar ecliptic plane. Here&apos;s
        an explanation of the GSE coordinate system:
      </p>
      <p>
        1. Coordinate Origin: The origin of the GSE coordinate system is located
        at the center of the Earth, making it geocentric.
      </p>
      <p>
        2. Coordinate Axes: The GSE coordinate system has three primary axes:
        <br />- X-axis (GSE-X): It points from the center of the Earth toward
        the vernal equinox direction in the plane of the Earth&apos;s orbit
        around the Sun (the solar ecliptic plane).
        <br />- Y-axis (GSE-Y): It is perpendicular to the GSE-X axis within the
        solar ecliptic plane and points approximately in the direction of the
        Earth&apos;s orbital motion around the Sun.
        <br />- Z-axis (GSE-Z): It completes the right-handed coordinate system,
        pointing upward perpendicular to the solar ecliptic plane.
      </p>
      <p>
        3. Orientation: The GSE coordinate system is oriented relative to the
        solar ecliptic plane, which is the plane defined by the Earth&apos;s
        orbit around the Sun. The X-axis points toward a specific point in that
        plane, and the Y-axis aligns with the direction of the Earth&apos;s
        orbital motion.
      </p>
      <p>
        4. Applications: The GSE coordinate system is commonly used in space
        physics and solar-terrestrial research to describe the position and
        motion of objects within the solar system. It is particularly useful for
        analyzing the behavior of the solar wind, interplanetary magnetic fields
        (IMF), and other solar phenomena as they interact with the Earth&apos;s
        magnetosphere and the heliosphere.
      </p>
      <p>
        5. Solar Wind Interaction: The GSE coordinate system provides a
        convenient reference frame for studying the interactions between the
        solar wind and the Earth&apos;s magnetosphere. Researchers can use it to
        track the motion of solar wind disturbances and their effects on the
        Earth&apos;s space environment.
      </p>
      <p>
        6. Coordinate Transformation: To work with data from various spacecraft
        and instruments, scientists often convert measurements from different
        coordinate systems (such as GSM, GSE, or spacecraft-specific systems) to
        make them consistent and easier to analyze.
      </p>
      <p>
        The GSE coordinate system is a valuable tool for understanding the
        Earth&apos;s interaction with the solar wind and the behavior of solar
        phenomena in relation to our planet&apos;s position within the solar
        system. It allows researchers to study and model the complex dynamics of
        space weather and space physics.
      </p>
    </main>
  );
}
