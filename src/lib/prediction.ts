export const durations = [
  "2 hours",
  "6 hours",
  "1 day",
  "3 days",
  "7 days",
  "30 days",
  "54 days",
  "1 year",
  "5 years",
  "All",
];

export interface relationType {
  value: string;
  name: string | string[];
  parameters: string[] | string[][];
}

export const relations = [
  {
    value: "Kp",
    name: "Kp",
    parameters: ["kp"],
  },
  {
    value: "imf_gsm",
    name: "IMF Components (GSM) (nT)",
    parameters: ["bt", "bx_gsm", "by_gsm", "bz_gsm"],
  },
  {
    value: "density",
    name: "Density (1/cm^3)",
    parameters: ["density"],
  },
  {
    value: "speed",
    name: "Speed (km/s)",
    parameters: ["speed"],
  },
  {
    value: "temp",
    name: "Temperature (K)",
    parameters: ["temperature"],
  },
];

export const parameters = ["Kp"];
