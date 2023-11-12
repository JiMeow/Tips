import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Input from "@/components/Input";
import BackButton from "@/components/BackButton";
import { useChangeUsername } from "@/hooks/ManageAccount/useChangeUsername";

const ChangeUsername = () => {
  const session = useSession();

  const username = session.data?.user.email ?? "Anon";

  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: changeUsername, isPending } = useChangeUsername({
    onSuccess: () => {
      void signIn("credentials", {
        email: newUsername,
        password,
        redirect: false,
      }).then((e) => {
        const ok = e?.ok;
        const error = e?.error;
        if (!ok) {
          alert(`${error}`);
        } else {
          setNewUsername("");
          setPassword("");
          alert(`Username changed successfully!`);
        }
      });
    },
  });

  return (
    <>
      <Navbar />
      <div className="flex h-[100vh] items-center justify-center bg-[url('/images/room2.png')] bg-cover bg-center bg-no-repeat">
        <div className="relative flex flex-col items-center rounded-lg border-2 border-gray-700 bg-slate-500 p-8">
          <BackButton disable={isPending} />
          <div className="mb-4 text-xl">{`Change Username`}</div>
          <Input
            label="New Username"
            value={newUsername}
            setValue={setNewUsername}
            type="text"
          />
          <Input
            label="Current Password"
            value={password}
            setValue={setPassword}
            type="password"
          />
          <button
            className="rounded-lg border-2 border-red-700 bg-red-400 p-2 duration-500 hover:cursor-pointer hover:bg-red-600"
            onClick={() => {
              if (isPending) return;
              changeUsername({ username, password, newUsername });
            }}
          >
            submit
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangeUsername;
