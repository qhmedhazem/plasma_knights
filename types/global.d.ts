type Status = "idle" | "loading" | "success" | "error";

type relationParams = string[] | string[][];

interface relation {
  value: string;
  name: string | string[];
  parameters: relationParams;
}

interface TeamMemberLink {
  name: string;
  url: string;
}

interface TeamMember {
  username?: string;
  full_name: string;
  image_url: StaticImageData | string;
  bio: string;
  links?: TeamMemberLink[];
}
