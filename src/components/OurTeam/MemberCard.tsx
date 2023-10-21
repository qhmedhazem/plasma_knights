import React, { FC } from "react";

interface Link {
  name: string;
  url: string;
}

interface Props {
  username: string;
  full_name: string;
  image_url: string;
  bio: string;
  links?: Link[];
}

const MemberCard: FC<Props> = ({
  username,
  full_name,
  image_url,
  bio,
  links,
}) => {
  return (
    <figure className="flex-1 bg-muted rounded-lg overflow-hidden transition-all shadow-md hover:shadow-xl">
      <div>
        <img src={image_url} alt={full_name} className="w-full" />
      </div>
      <div className="py-4 px-2">
        <div className="text-center">
          <span className="block text-xl font-semibold">{full_name}</span>
          <span className="text-md block">@{username}</span>
          <figcaption className="text-md">{bio}</figcaption>
        </div>
        <div className="flex flex-col gap-2 mt-8">
          {links?.map((link) => (
            <a
              key={link.name}
              href={link.url}
              className="inline uppercase text-center text-blue-500 hover:underline"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </figure>
  );
};

export default MemberCard;
