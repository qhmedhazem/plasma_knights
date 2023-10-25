export default function Page() {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-4xl mb-3 font-bold">Solar Radiation Storms</h1>
      <p>
        Solar radiation storms result from large-scale magnetic eruptions on the
        Sun, typically accompanied by coronal mass ejections and solar flares.
        These events accelerate charged particles, particularly high-energy
        protons, to velocities approaching the speed of light. Protons at such
        tremendous speeds can traverse the 150 million kilometers from the Sun
        to Earth in mere minutes. Upon arrival at Earth, these fast-moving
        protons breach the planet&apos;s protective magnetosphere, the shield
        against lower-energy charged particles. Once inside the magnetosphere,
        they follow magnetic field lines and infiltrate the Earth&apos;s
        atmosphere, predominantly near the polar regions.
      </p>
      <p>
        NOAA classifies these storms using the Space Weather Scale (S1-S5),
        based on data from the GOES satellite. A storm begins when ≥10 MeV
        proton flux reaches 10 proton flux units (pfu) and ends when it falls
        below this level, accommodating multiple injections from solar flares
        and interplanetary shocks within one storm. The duration of such storms
        can range from hours to days.
      </p>
      <p>
        Solar radiation storms can have various impacts, including damage to
        satellites and increased radiation risk for high-latitude, high-flying
        aircraft passengers and crew. Furthermore, they can disrupt
        High-Frequency (HF) radio communication by ionizing the atmosphere,
        leading to electron-rich layers in the ionosphere. SWPC issues forecasts
        and warnings for these events, helping to mitigate their potential
        consequences.
      </p>
    </main>
  );
}
