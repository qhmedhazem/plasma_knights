import React, { FC } from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

const SidebarItemsList: FC<Props> = ({ title, children }) => {
  return (
    <div className="py-4">
      <h3 className="inline-block text-sm font-bold mb-4">{title}</h3>
      <ul className="flex flex-col gap-6 list-none">{children}</ul>
    </div>
  );
};

export default SidebarItemsList;
