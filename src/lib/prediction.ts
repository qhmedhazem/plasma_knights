import {
  geomagnetic_storm_impacts,
  radio_blackout_impacts,
  solar_radiation_storm_impacts,
} from "./impacts";

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

export const scalesTitles = {
  R: "Radio Blackout Impacts",
  S: "Solar Radiation Storm Impacts",
  G: "Geomagnetic Storm Impacts",
};

export const scalesContents = {
  R: radio_blackout_impacts,
  S: solar_radiation_storm_impacts,
  G: geomagnetic_storm_impacts,
};

export const relations: relation[] = [
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
  {
    value: "ssn",
    name: "SSN",
    parameters: ["ssn"],
  },
  {
    value: "f10.7",
    name: "F10.7",
    parameters: ["f10.7"],
  },
];
