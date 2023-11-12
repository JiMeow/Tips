import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Input from "@/components/Input";
import BackButton from "@/components/BackButton";
import { useChangePassword } from "@/hooks/ManageAccount/useChangePassword";

const ChangePassword = () => {
  const session = useSession();

  const username = session.data?.user.email ?? "Anon";

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: changePassword, isPending } = useChangePassword({
    onSuccess: () => {
      setNewPassword("");
      setConfirmPassword("");
      setPassword("");
      alert(`Password changed successfully!`);
    },
  });

  return (
    <>
      <Navbar />
      <div className="flex h-[100vh] items-center justify-center bg-[url('/images/room2.png')] bg-cover bg-center bg-no-repeat">
        <div className="relative flex flex-col items-center rounded-lg border-2 border-gray-700 bg-slate-500 p-8">
          <BackButton disable={isPending} />
          <div className="mb-4 text-xl">{`Change Password`}</div>
          <Input
            label="Current Password"
            value={password}
            setValue={setPassword}
            type="password"
          />
          <Input
            label="New Password"
            value={newPassword}
            setValue={setNewPassword}
            type="password"
          />
          <Input
            label="Confirm Password"
            value={confirmPassword}
            setValue={setConfirmPassword}
            type="password"
          />
          <button
            className="rounded-lg border-2 border-red-700 bg-red-400 p-2 duration-500 hover:cursor-pointer hover:bg-red-600"
            onClick={() => {
              if (newPassword !== confirmPassword) {
                alert("Password not match");
                return;
              }
              void changePassword({
                username,
                password,
                newPassword,
              });
            }}
          >
            submit
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
