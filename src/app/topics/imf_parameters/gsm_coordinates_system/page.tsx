export default function Page() {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-4xl mb-3">GSM coordinate system</h1>
      <p>
        The Geocentric Solar Magnetospheric (GSM) coordinate system is a
        coordinate system used in space physics to describe the Earth&apos;s
        magnetosphere and its interactions with the solar wind and the
        Interplanetary Magnetic Field (IMF). This coordinate system is centered
        on the Earth, making it a convenient way to study the behavior of the
        magnetosphere and its responses to changes in the solar wind and IMF.
        Here&apos;s a brief explanation of the GSM coordinate system:
      </p>
      <p>
        1. Coordinate Origin: The origin of the GSM coordinate system is at the
        center of the Earth (geocentric). This means that all measurements are
        made with respect to the Earth&apos;s center.
      </p>
      <p>
        2. Coordinate Axes: The GSM coordinate system has three primary axes:
        <br />- X-axis (GSM-X): It points from the Earth&apos;s center toward
        the point where the Earth-Sun line intersects the plane of the
        Earth&apos;s orbit around the Sun (the ecliptic plane).
        <br />- Y-axis (GSM-Y): It points along the line of intersection between
        the ecliptic plane and the plane containing the Earth&apos;s magnetic
        dipole axis and the direction of the solar wind flow.
        <br />- Z-axis (GSM-Z): It completes the right-handed coordinate system,
        pointing perpendicular to both the X and Y axes. It is directed along
        the magnetic dipole axis.
      </p>
      <p>
        3. Orientation: The GSM coordinate system is oriented relative to the
        Sun and the solar wind. The X-axis points away from the Sun, the Y-axis
        is perpendicular to the Earth-Sun line and the direction of the solar
        wind, and the Z-axis is aligned with the Earth&apos;s magnetic dipole
        axis.
      </p>
      <p>
        4. Applications: The GSM coordinate system is commonly used in space
        physics and space weather research to describe the position, motion, and
        orientation of various regions and boundaries within the Earth&apos;s
        magnetosphere, such as the bow shock, magnetopause, and magnetotail.
      </p>
      <p>
        5. Solar Wind Interaction: By using the GSM coordinate system,
        scientists can simplify the description of how the solar wind and IMF
        interact with the Earth&apos;s magnetic field and magnetosphere. It
        allows researchers to study the effects of changes in the IMF on the
        magnetosphere and its response in a more straightforward manner.
      </p>
      <p>
        The GSM coordinate system is a useful tool for understanding the complex
        dynamics of the Earth&apos;s magnetosphere and its response to
        variations in the solar wind and IMF. It provides a common reference
        frame for researchers to analyze and interpret data from various
        spacecraft and instruments studying space weather and magnetospheric
        physics.
      </p>
    </main>
  );
}
