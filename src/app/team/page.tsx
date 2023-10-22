import MemberCard from "@/components/OurTeam/MemberCard";
import Wrapper from "@/components/ui/Wrapper";
import Image from "next/image";

import Team2Image from "../../../public/team2.jpg";

import Team4Image from "../../../public/team4.jpg";

export default function Home() {
  return (
    <main className="w-full">
      <h1 className="font-bold text-3xl mb-12">Our Team</h1>
      <Wrapper>
        <ul className="list-none grid grid-cols-1 md:grid-cols-2 gap-16 w-full">
          <MemberCard
            username="qhmedhazem"
            full_name="Ahmed Hazem"
            image_url="https://avatars.githubusercontent.com/u/45073913?v=4"
            bio="Web Developer and Electrical Major"
            links={[
              {
                name: "Github",
                url: "https://github.com/qhmedhazem",
              },
            ]}
          />
          <MemberCard
            full_name="Ahmed M.Abdelkhalek"
            image_url={Team2Image}
            bio="Advanced Nuclear Technology School In El-Dabaa\nZagazig"
          />
          <MemberCard
            full_name="Abdulrahman Waleed"
            image_url={Team4Image}
            bio=""
          />
        </ul>
      </Wrapper>
    </main>
  );
}
