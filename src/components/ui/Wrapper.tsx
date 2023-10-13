import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const Wrapper: FC<Props> = ({ children }) => {
  return <div className="m-[0_auto] max-w-3xl">{children}</div>;
};

export default Wrapper;
