import MemberCard from "@/components/OurTeam/MemberCard";
import Wrapper from "@/components/ui/Wrapper";

export default function Home() {
  return (
    <main className="w-full">
      <h1 className="font-bold text-3xl mb-12">Our Team</h1>
      <Wrapper>
        <ul className="list-none grid grid-cols-2 gap-16 w-full">
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
              {
                name: "Instagram",
                url: "https://instagram.com/qhmedhazem",
              },
            ]}
          />
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
              {
                name: "Instagram",
                url: "https://instagram.com/qhmedhazem",
              },
            ]}
          />
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
              {
                name: "Instagram",
                url: "https://instagram.com/qhmedhazem",
              },
            ]}
          />
        </ul>
      </Wrapper>
    </main>
  );
}
