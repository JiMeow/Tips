import React from "react";

type TagProps = {
  name: string;
  isSelect?: boolean;
  setSelect?: (value: boolean) => void;
  type?: "approved" | "rejected" | "pending";
};

const Tag: React.FC<TagProps> = ({
  name,
  type,
  isSelect = false,
  setSelect,
}) => {
  return (
    <div
      onClick={() => setSelect?.(!isSelect)}
      className={`h-full rounded-xl border-2 p-2 ${getColorTag(
        isSelect,
        type,
      )}`}
    >
      <div>{name}</div>
    </div>
  );
};

function getColorTag(
  isSelect?: boolean,
  type?: "approved" | "rejected" | "pending",
) {
  if (!isSelect) return "border-gray-600 bg-gray-400";

  if (type === "approved") return "border-green-600 bg-green-400";
  if (type === "rejected") return "border-red-600 bg-red-400";
  if (type === "pending") return "border-yellow-600 bg-yellow-400";
  return "border-gray-600 bg-gray-400";
}

export default Tag;
