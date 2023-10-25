export default function Page() {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-4xl mb-3 font-bold">Magnetopause</h1>
      <p>
        Earth&apos;s magnetopause marks the outermost reach of our planet&apos;s
        magnetic influence, where the solar wind, a torrent of charged particles
        from the Sun, clashes with Earth&apos;s magnetic field. This encounter
        shapes a teardrop boundary, acting as a shield from the solar
        wind&apos;s full impact.
      </p>
      <p>
        At this boundary, solar wind pressure equals Earth&apos;s magnetic field
        pressure. Inside, the magnetic field remains stable, while outside, it
        warps under the solar wind&apos;s pressure.
      </p>
      <p>
        The magnetopause&apos;s location varies, generally extending about 10
        Earth radii on the sunward side and forming a stretched tail on the
        night side due to solar wind effects. This region captivates space
        weather scientists for its implications in geomagnetic storms, auroras,
        and overall magnetosphere behavior.
      </p>
    </main>
  );
}
