export const scales: Scales[] = ["R", "S", "G"];

export const levelsColors: ScaleImpactColor[] = [
  {
    key: "0",
    color: "#51cf66",
  },
  {
    key: "1",
    color: "#fcc419",
  },
  {
    key: "2",
    color: "#f08c00",
  },
  {
    key: "3",
    color: "#e8590c",
  },
  {
    key: "4",
    color: "#DC2626",
  },
  {
    key: "5",
    color: "#B91C1C",
  },
];

export const geomagnetic_storm_impacts: Impact[] = [
  {
    key: "0",
    description: "None",
    content: [
      {
        title: "",
        text: "No S-Scale Solar Radiation Storming",
      },
    ],
  },
  {
    key: "1",
    description: "Minor",
    content: [
      {
        title: "Power systems",
        text: "Weak power grid fluctuations can occur.",
      },
      {
        title: "Spacecraft operations",
        text: "Minor impact on satellite operations possible.",
      },
      {
        title: "Other systems",
        text: "Migratory animals are affected at this and higher levels; aurora is commonly visible at high latitudes (northern Michigan and Maine).",
      },
    ],
  },
  {
    key: "2",
    description: "Moderate",
    content: [
      {
        title: "Power systems",
        text: "High-latitude power systems may experience voltage alarms, long-duration storms may cause transformer damage.",
      },
      {
        title: "Spacecraft operations",
        text: "Corrective actions to orientation may be required by ground control; possible changes in drag affect orbit predictions.",
      },
      {
        title: "Other systems",
        text: "HF radio propagation can fade at higher latitudes, and aurora has been seen as low as New York and Idaho (typically 55° geomagnetic lat.).",
      },
    ],
  },
  {
    key: "3",
    description: "Strong",
    content: [
      {
        title: "Power systems",
        text: "Voltage corrections may be required, false alarms triggered on some protection devices.",
      },
      {
        title: "Spacecraft operations",
        text: "Surface charging may occur on satellite components, drag may increase on low-Earth-orbit satellites, and corrections may be needed for orientation problems.",
      },
      {
        title: "Other systems",
        text: "Intermittent satellite navigation and low-frequency radio navigation problems may occur, HF radio may be intermittent, and aurora has been seen as low as Illinois and Oregon (typically 50° geomagnetic lat.).",
      },
    ],
  },
  {
    key: "4",
    description: "Severe",
    content: [
      {
        title: "Power systems",
        text: "Possible widespread voltage control problems and some protective systems will mistakenly trip out key assets from the grid.",
      },
      {
        title: "Spacecraft operations",
        text: "May experience surface charging and tracking problems, corrections may be needed for orientation problems.",
      },
      {
        title: "Other systems",
        text: "Induced pipeline currents affect preventive measures, HF radio propagation sporadic, satellite navigation degraded for hours, low-frequency radio navigation disrupted, and aurora has been seen as low as Alabama and northern California (typically 45° geomagnetic lat.).",
      },
    ],
  },
  {
    key: "5",
    description: "Extreme",
    content: [
      {
        title: "Power systems",
        text: "Widespread voltage control problems and protective system problems can occur, some grid systems may experience complete collapse or blackouts. Transformers may experience damage.",
      },
      {
        title: "Spacecraft operations",
        text: "May experience extensive surface charging, problems with orientation, uplink/downlink and tracking satellites.",
      },
      {
        title: "Other systems",
        text: "Pipeline currents can reach hundreds of amps, HF (high frequency) radio propagation may be impossible in many areas for one to two days, satellite navigation may be degraded for days, low-frequency radio navigation can be out for hours, and aurora has been seen as low as Florida and southern Texas (typically 40° geomagnetic lat.).",
      },
    ],
  },
];

export const solar_radiation_storm_impacts: Impact[] = [
  {
    key: "0",
    description: "None",
    content: [
      {
        title: "",
        text: "No S-Scale Solar Radiation Storming",
      },
    ],
  },
];

export const radio_blackout_impacts: Impact[] = [
  {
    key: "0",
    description: "None",
    content: [
      {
        title: "",
        text: "No R-Scale Radio Blackouts",
      },
    ],
  },
  {
    key: "1",
    description: "Minor",
    content: [
      {
        title: "HF Radio",
        text: "Weak or minor degradation of HF radio communication on sunlit side, occasional loss of radio contact.",
      },
      {
        title: "Navigation",
        text: "Low-frequency navigation signals degraded for brief intervals.",
      },
    ],
  },
  {
    key: "2",
    description: "Moderate",
    content: [
      {
        title: "HF Radio",
        text: "Limited blackout of HF radio communication on sunlit side, loss of radio contact for tens of minutes.",
      },
      {
        title: "Navigation",
        text: "Degradation of low-frequency navigation signals for tens of minutes.",
      },
    ],
  },
  {
    key: "3",
    description: "Strong",
    content: [
      {
        title: "HF Radio",
        text: "Wide area blackout of HF radio communication, loss of radio contact for about an hour on sunlit side of Earth.",
      },
      {
        title: "Navigation",
        text: "Low-frequency navigation signals degraded for about an hour.",
      },
    ],
  },
  {
    key: "4",
    description: "Severe",
    content: [
      {
        title: "HF Radio",
        text: "HF radio communication blackout on most of the sunlit side of Earth for one to two hours. HF radio contact lost during this time.",
      },
      {
        title: "Navigation",
        text: "Outages of low-frequency navigation signals cause increased error in positioning for one to two hours. Minor disruptions of satellite navigation possible on the sunlit side of Earth.",
      },
    ],
  },
  {
    key: "5",
    description: "Extreme",
    content: [
      {
        title: "HF Radio",
        text: "Complete HF (high frequency) radio blackout on the entire sunlit side of the Earth lasting for a number of hours. This results in no HF radio contact with mariners and en route aviators in this sector.",
      },
      {
        title: "Navigation",
        text: "Low-frequency navigation signals used by maritime and general aviation systems experience outages on the sunlit side of the Earth for many hours, causing loss in positioning. Increased satellite navigation errors in positioning for several hours on the sunlit side of Earth, which may spread into the night side.",
      },
    ],
  },
];
