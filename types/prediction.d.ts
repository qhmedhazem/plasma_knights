interface ScaleData {
  MajorProb: string;
  MinorProb: string;
  Scale: string;
  Text: string;
  Prob: string;
}

type Scales = "R" | "S" | "G";

interface Scale {
  date: string;
  time: string;
  G: ScaleData;
  R: ScaleData;
  S: ScaleData;
}

interface ScaleImpactColor {
  key: string;
  color: string;
}

interface ImpactContent {
  title: string;
  text: string;
}

interface Impact {
  key: string;
  description: string;
  content: ImpactContent[];
}
