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
    parameters: ["Kp"],
  },
];

export const parameters = ["Kp"];
