import Link from "next/link";
import React from "react";

type ChoiceProps = {
  label: string;
  hrefPath: string;
  children?: JSX.Element | string;
};

const Choice: React.FC<ChoiceProps> = ({ label, hrefPath, children }) => {
  return (
    <div className="mb-1 text-base">
      {label}
      {"  "}
      <span>
        <Link
          href={hrefPath}
          className="text-base text-red-500 underline underline-offset-2 hover:cursor-pointer"
        >
          {children}
        </Link>
      </span>
    </div>
  );
};

export default Choice;
