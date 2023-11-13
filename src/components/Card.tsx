import React, { useState } from "react";
import { type Tip } from "@prisma/client";
import Switch from "./Switch";
import { useUpdateTip } from "@/hooks/useUpdateTip";
import { NotePencil, Trash } from "@phosphor-icons/react";
import { useDeleteTip } from "@/hooks/useDeleteTip";

type CardProps = {
  disable?: boolean;
  editable?: boolean;
};

const Card: React.FC<Tip & CardProps> = ({
  id,
  content,
  approved,
  rejected,
  writerName,
  disable = false,
  editable = false,
}) => {
  const { mutate: updateTip, isPending } = useUpdateTip({
    onSuccess: () => {
      if (!editable) return;
      setEditable(false);
    },
  });

  const { mutate: deleteTip, isPending: isDeletePending } = useDeleteTip({
    onSuccess: () => {
      console.log("delete success");
    },
  });

  const [isEdit, setEditable] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [editedUsername, setEditedUsername] = useState(writerName);

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
          {editable && (
            <NotePencil
              onClick={() => {
                setEditable(!isEdit);
                setEditedContent(content);
                setEditedUsername(writerName);
              }}
              size={28}
              color="#934d4d"
              weight="duotone"
              className="absolute left-6 top-0 duration-500 hover:rotate-[360deg] hover:scale-125 hover:cursor-pointer hover:fill-current hover:text-green-600"
            />
          )}
        </div>
        <div className="relative">
          <textarea
            disabled={!isEdit}
            className="w-full resize-none overflow-auto rounded-lg p-4"
            value={editedContent}
            maxLength={99}
            onChange={(e) => {
              setEditedContent(e.target.value);
            }}
          />
          {isEdit && (
            <div className="absolute bottom-1 right-6">
              <span
                className={`${editedContent.length > 85 ? "text-red-500" : ""}`}
              >
                {editedContent.length}
              </span>
              /85
            </div>
          )}
        </div>
        <div className={`mb-4 flex flex-row ${"justify-between"} items-center`}>
          <button
            onClick={() => {
              if (isPending) return;
              if (editedContent.length > 85) {
                alert("Content too long");
                return;
              }
              if (editedUsername.length > 20) {
                alert("Username too long");
                return;
              }
              if (editedContent === content && editedUsername === writerName) {
                alert("No changes made");
                return;
              }
              updateTip({
                id: id,
                content: editedContent,
                approved: false,
                rejected: false,
                writerName: editedUsername,
              });
            }}
            className="overflow-hidden text-black hover:text-red-600"
            style={{
              width: isEdit ? "56px" : "0px",
              transition: "width 0.5s, color 0.2s",
            }}
          >
            <div className="">{isPending ? "Pending..." : "Submit"}</div>
          </button>
          <textarea
            maxLength={20}
            disabled={!isEdit}
            className={`w-25 h-7 resize-none rounded-lg pr-2
             ${!isEdit ? "bg-gray-400 " : " "} text-right `}
            value={editedUsername}
            onChange={(e) => {
              setEditedUsername(e.target.value);
            }}
          />
        </div>

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
