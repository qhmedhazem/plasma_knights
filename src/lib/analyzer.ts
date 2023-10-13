export const relations = [
  {
    value: "imf",
    name: ["IMF Comp", "MR Probability"],
    parameters: ["Bx", "By", "Bz", "Bt"],
  },
  {
    value: "bz",
    name: ["Bz", "MR Probability"],
    parameters: ["Bz"],
  },
  {
    value: "bt",
    name: ["Bt", "MR Probability"],
    parameters: ["Bt"],
  },
  {
    value: "possible_events_sum",
    name: "Possible Events Histogram",
    parameters: ["possible_events_sum"],
  },
  {
    value: "vp_x",
    name: "Proton Vx",
    parameters: ["vp_x"],
  },
  {
    value: "vp_z",
    name: "Proton Vz",
    parameters: ["vp_z"],
  },
  {
    value: "vp_t",
    name: "Proton Vt",
    parameters: ["vp_magnitude"],
  },
];

export const parameters = [
  "vp_x",
  "vp_y",
  "vp_z",
  "n_p",
  "r_sun",
  "Bx",
  "By",
  "Bz",
  "By_gsm",
  "Bz_gsm",
  "flow_pressure",
];
