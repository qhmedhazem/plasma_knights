export default function Page() {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-4xl mb-3 font-bold">LMN Coordinates System</h1>
      <p>
        The LMN coordinate system is a mathematical construct used in the field
        of space physics to describe the orientation of a spacecraft or an
        object relative to a particular plane or surface of interest. The LMN
        system is typically used when studying the behavior of objects within a
        specific region of space, such as a planetary magnetosphere or a
        spacecraft&apos;s trajectory through a celestial body&apos;s
        gravitational field. It provides a local reference frame that is adapted
        to the specific geometry of the object or region under investigation.
        Here&apos;s an explanation of the LMN coordinate system:
      </p>
      <p>
        1. L-Axis (Longitudinal or Radial Axis):
        <br />- The L-axis is oriented along the direction of interest,
        typically pointing outward from the center of the object or region being
        studied.
        <br />- In the case of a spacecraft orbiting a planet, the L-axis may
        point along the spacecraft&apos;s trajectory or radial direction away
        from the planet.
      </p>
      <p>
        2. M-Axis (Meridional or Along-Track Axis):
        <br />- The M-axis is perpendicular to the L-axis and typically lies
        within the plane of interest.
        <br />- It points along the direction of motion or along the orbital
        path of the object. It is often used to describe motion or orientation
        within the plane.
      </p>
      <p>
        3. N-Axis (Normal Axis):
        <br />- The N-axis is the third axis and is perpendicular to both the L
        and M axes. It typically points outward from the plane of interest.
        <br />- The N-axis defines the orientation of the object or spacecraft
        relative to the plane and is often used to describe the object&apos;s
        attitude or tilt.
      </p>
      <p>
        The LMN coordinate system allows researchers to describe the orientation
        and motion of objects or spacecraft in a way that is well-suited to the
        specific geometry of the region or phenomena they are studying. It is
        particularly useful when investigating how objects interact with a local
        coordinate plane, such as a planet&apos;s magnetic equator, a planetary
        ring plane, or an orbital path.
      </p>
      <p>
        Researchers often use mathematical transformations to convert
        measurements made in a spacecraft&apos;s onboard coordinate system
        (e.g., spacecraft-fixed or body-fixed) into the LMN system, making it
        easier to analyze and interpret data in the context of the local
        environment. The LMN system is a flexible tool that can be adapted to
        various research applications in space physics and planetary science.
      </p>
    </main>
  );
}
