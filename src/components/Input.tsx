import { Eye, EyeSlash } from "@phosphor-icons/react";
import React from "react";

type InputProps = {
  value: string;
  setValue: (value: string) => void;
  label: string;
  type?: "text" | "password" | "number";
};

const Input: React.FC<InputProps> = ({ value, setValue, label, type }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative mb-4">
      <input
        type={
          (type ?? "text") === "password"
            ? showPassword
              ? "text"
              : "password"
            : type ?? "text"
        }
        className="peer h-12 rounded-lg border-2 border-gray-700 bg-slate-500 p-1 pl-4 "
        onChange={(e) => setValue(e.target.value)}
        value={value}
      ></input>
      {value.length > 0 && type === "password" ? (
        showPassword ? (
          <EyeSlash
            onClick={() => setShowPassword(!showPassword)}
            size={20}
            color="#5c0000"
            className="absolute right-3 top-4 duration-200 hover:scale-125 hover:cursor-pointer"
          />
        ) : (
          <Eye
            onClick={() => setShowPassword(!showPassword)}
            size={20}
            color="#5c0000"
            className="absolute right-3 top-4 duration-200 hover:scale-125 hover:cursor-pointer"
          />
        )
      ) : null}

      <div
        className={`pointer-events-none absolute left-0 top-3 ml-4 bg-slate-500 px-[3px] text-white/70 duration-200 peer-focus:top-[-12px] ${
          value.length !== 0 ? "top-[-12px]" : ""
        }`}
      >
        {label}
      </div>
    </div>
  );
};

export default Input;
