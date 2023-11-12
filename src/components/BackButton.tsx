import { ArrowFatLeft } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import React from "react";

type BackButtonProps = {
  disable?: boolean;
};

const BackButton: React.FC<BackButtonProps> = ({ disable = false }) => {
  const router = useRouter();
  return (
    <ArrowFatLeft
      onClick={() => {
        if (!disable) void router.back();
      }}
      size={24}
      color="#5c0000"
      weight="bold"
      className="absolute left-4 top-4 duration-200 hover:scale-125"
    />
  );
};

export default BackButton;
