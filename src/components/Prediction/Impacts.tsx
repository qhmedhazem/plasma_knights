"use client";
import React, { FC } from "react";
import { levelsColors } from "@/lib/impacts";

interface Props {
  scale_key: string;
  title: string;
  level: string;
  contents: Impact[];
}

const Impacts: FC<Props> = ({ scale_key, title, level, contents }) => {
  const levelData = contents.find((c) => c.key === level) || contents[0];

  return (
    <div className="bg-accent w-full rounded-lg overflow-hidden">
      <h1
        className="p-4 font-bold text-xl"
        style={{
          backgroundColor: levelsColors.find((l) => l.key === level)?.color,
        }}
      >
        {scale_key} ({levelData.description}) {title}
      </h1>
      <section className="px-8 py-4 flex flex-col gap-2">
        {levelData.content.map((c) => (
          <p key={c.title} className="max-w-4xl">
            {c.title && <strong>{c.title}: </strong>}
            {c.text}
          </p>
        ))}
      </section>
    </div>
  );
};

export default Impacts;
