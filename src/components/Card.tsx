import React from "react";
import { type Tip } from "@prisma/client";
import Switch from "./Switch";
import { useUpdateTip } from "@/hooks/useUpdateTip";
import { Trash } from "@phosphor-icons/react";
import { useDeleteTip } from "@/hooks/useDeleteTip";

type CardProps = {
  disable?: boolean;
};

const Card: React.FC<Tip & CardProps> = ({
  id,
  content,
  approved,
  rejected,
  writerName,
  disable = false,
}) => {
  const { mutate: updateTip, isPending } = useUpdateTip({
    onSuccess: () => {
      console.log("update success");
    },
  });

  const { mutate: deleteTip, isPending: isDeletePending } = useDeleteTip({
    onSuccess: () => {
      console.log("delete success");
    },
  });

  const isStatusPending = !approved && !rejected;

  return (
    <div
      className="max-h-[50vh] w-[99%] p-4
        sm:w-[50%]
        lg:w-[33%]
    "
    >
      <div className="h-full rounded-lg bg-gray-400 p-4">
        <div className="relative mb-4 text-center">
          status ({getStatus(approved, rejected)})
          {!disable && !approved && (
            <Trash
              onClick={() => {
                if (isDeletePending) return;
                deleteTip({ id });
              }}
              size={28}
              color="#934d4d"
              weight="duotone"
              className="absolute right-6 top-0 duration-500 hover:rotate-[360deg] hover:scale-125 hover:cursor-pointer hover:fill-current hover:text-green-600"
            />
          )}
        </div>
        <textarea
          disabled
          className=" w-full resize-none overflow-auto rounded-lg p-4"
          value={content}
        />
        <div className="mb-4 text-right">{writerName}</div>
        {!disable && (
          <div className="flex flex-row items-center justify-center gap-4">
            <Switch
              approved={approved}
              rejected={rejected}
              disable={disable}
              id={id}
              key={id + "approve" + approved + "reject" + rejected}
            />

            <div
              className={`rounded-lg border-2 border-red-900 bg-red-400 text-white duration-500 hover:bg-red-600 ${
                isPending ? "animate-bounce" : ""
              }`}
            >
              <button
                onClick={() => {
                  if (isPending) return;
                  if (isStatusPending) {
                    updateTip({
                      id: id,
                      approved: false,
                      rejected: true,
                    });
                  } else {
                    updateTip({
                      id: id,
                      approved: false,
                      rejected: false,
                    });
                  }
                }}
                className="m-2"
              >
                {isPending
                  ? "⏳"
                  : isStatusPending
                  ? "To Reject"
                  : "To Pending"}
              </button>
            </div>
          </div>
        )}
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
