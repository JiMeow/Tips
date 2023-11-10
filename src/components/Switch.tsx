import { useUpdateTip } from "@/hooks/useUpdateTips";
import React, { useState } from "react";

type SwitchProps = {
  id: string;
  approved: boolean;
  rejected: boolean;
};

const Switch: React.FC<SwitchProps> = ({ id, approved, rejected }) => {
  const [checked, setChecked] = useState(approved);
  const { mutate: updateTip, isPending } = useUpdateTip({
    onSuccess: () => {
      setChecked(!checked);
    },
  });

  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        onClick={() => {
          if (isPending) return;
          updateTip({ id: id, approved: !checked, rejected: checked });
        }}
        type="checkbox"
        value={`${checked}`}
        className="peer sr-only"
      />
      <div
        className={`peer h-12 w-12  rotate-180 rounded-full ${getColor(
          checked,
          approved,
          rejected,
        )} shadow-md outline-none ring-0 duration-300
        after:absolute after:left-1 after:top-1  after:flex after:h-10 after:w-10 after:-rotate-180 after:items-center after:justify-center after:rounded-full 
      after:bg-gray-50 after:outline-none after:duration-500 after:content-['${getIcon(
        checked,
        approved,
        rejected,
      )}']
      peer-checked:after:rotate-180
      peer-hover:after:scale-75 peer-focus:outline-none`}
      />
    </label>
  );
};

function getIcon(checked: boolean, approved: boolean, rejected: boolean) {
  if (checked) return "✔️";
  if (!approved && !rejected) return "🕒";
  return "❌";
}

function getColor(checked: boolean, approved: boolean, rejected: boolean) {
  if (checked) return "bg-green-400";
  if (!approved && !rejected) return "bg-gray-400";
  return "bg-red-400";
}

export default Switch;
