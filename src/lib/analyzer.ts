export const eventRelation: relation = {
  value: "event",
  name: "LMN Event",
  parameters: [["Bl", "v_l"]],
};

export const relations: relation[] = [
  {
    value: "mr_events_sum",
    name: "MR Events Histogram",
    parameters: ["possible_events_sum", "lmn_approved_events_sum"],
  },
  {
    value: "imf",
    name: ["IMF Components", "MR Probability"],
    parameters: [
      ["Bx", "vp_x"],
      ["By", "vp_y"],
      ["Bz", "vp_z"],
      ["Bt", "vp_magnitude"],
    ],
  },
  {
    value: "bz",
    name: ["Bz (GSE)", "MR Probability"],
    parameters: ["Bz"],
  },
  {
    value: "bt",
    name: ["Bt (GSE)", "MR Probability"],
    parameters: ["Bt"],
  },
  // {
  //   value: "vp_x",
  //   name: "Proton Vx (GSE)",
  //   parameters: ["vp_x"],
  // },
  {
    value: "vp_z",
    name: ["Proton Vz (GSE)", "MR Probability"],
    parameters: ["vp_z"],
  },
  {
    value: "vp_t",
    name: ["Proton Vt (GSE)", "MR Probability"],
    parameters: ["vp_magnitude"],
  },
  {
    value: "alfven_mach_number",
    name: ["Alfven Mach Number", "LMN Approved Events"],
    parameters: ["alfven_mach_number"],
  },
  {
    value: "fspeed_pdensity",
    name: ["Flow Speed", "Proton Density"],
    parameters: [["flow_speed", "n_p"]],
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
