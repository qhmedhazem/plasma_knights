export default function Page() {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-4xl mb-3 font-bold">Magnetic Reconnection</h1>
      <p>
        Magnetic Reconnection (MR) is the process where magnetic field lines
        converge. When MR occurs at the interface of the interplanetary magnetic
        field (IMF) and Earth&apos;s magnetic field within geospace, solar wind
        plasma gains access to this region. This leads to alterations in plasma
        transport processes in geospace, with the potential to induce space
        weather events capable of disrupting satellite communications,
        navigation systems, and terrestrial power grids.
      </p>
      <p>
        To study these phenomena, missions like NASA&apos;s Advanced Composition
        Explorer (ACE), Wind, and NOAA&apos;s Deep Space Climate Observatory
        (DSCOVR) are stationed at Lagrange point 1, located approximately one
        million miles sunward of Earth. The IMF, characterized by three
        components (X, Y, Z), is measured. In the Geocentric Solar
        Magnetospheric (GSM) Coordinate System, the X-axis points toward the
        Sun, the Y-axis is perpendicular to Earth&apos;s magnetic dipole, and
        the positive Z-axis corresponds to Earth&apos;s northern magnetic pole.
        A critical condition for magnetic reconnection is the simultaneous
        occurrence of opposite polarities in the Z components of the IMF and
        Earth&apos;s magnetic field. This interplay is pivotal in comprehending
        the complexities of space weather dynamics and their potential
        implications for our technological infrastructure.
      </p>
    </main>
  );
}
