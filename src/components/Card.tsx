import React from "react";
import { type Tip } from "@prisma/client";
import Switch from "./Switch";
import { useUpdateTip } from "@/hooks/useUpdateTips";

const Card: React.FC<Tip> = ({ id, content, approved, rejected }) => {
  const { mutate: updateTip, isPending } = useUpdateTip({
    onSuccess: () => {
      console.log("update success");
    },
  });

  return (
    <div
      className="max-h-[50vh] w-[99%] p-4
        sm:w-[50%]
        lg:w-[33%]
    "
    >
      <div className="h-full rounded-lg bg-gray-400 p-4">
        <div className="mb-4 text-center">
          status ({getStatus(approved, rejected)})
        </div>
        <textarea
          disabled
          className="mb-4 w-full resize-none overflow-auto rounded-lg p-4"
          value={content}
        />
        <div className="flex h-full flex-row items-center justify-center gap-4">
          <Switch
            approved={approved}
            rejected={rejected}
            id={id}
            key={id + "approve" + approved + "reject" + rejected}
          />
          <div
            className={`h-full rounded-lg border-2 border-red-900 bg-red-400 text-white duration-500 hover:bg-red-600 ${
              isPending ? "animate-bounce" : ""
            }`}
          >
            <button
              onClick={() => {
                if (isPending) return;
                updateTip({
                  id: id,
                  approved: false,
                  rejected: false,
                });
              }}
              className="m-2"
            >
              {isPending ? "⏳" : "To Pending"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function getStatus(approved: boolean, rejected: boolean) {
  if (approved) return "✅";
  if (rejected) return "❌";
  return "🕒";
}

export default Card;
