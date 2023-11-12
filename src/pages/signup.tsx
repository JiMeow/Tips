import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRegister } from "@/hooks/useRegister";
import Input from "@/components/Input";
import Link from "next/link";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: register } = useRegister({
    onSuccess: () => {
      void signIn("credentials", {
        email: username,
        password,
        callbackUrl: "/",
      });
    },
  });

  return (
    <>
      <Navbar />
      <div className="flex h-[100vh] items-center justify-center bg-[url('/images/room2.png')] bg-cover bg-center bg-no-repeat">
        <div className="flex flex-col items-center rounded-lg border-2 border-gray-700 bg-slate-500 p-8">
          <div className="mb-4 text-xl">Register</div>
          <Input label="username" value={username} setValue={setUsername} />
          <Input
            label="password"
            value={password}
            setValue={setPassword}
            type="password"
          />

          <button
            className="mb-4 rounded-lg border-2 border-red-700 bg-red-400 p-2 duration-500 hover:cursor-pointer hover:bg-red-600"
            onClick={() => {
              register({ email: username, password });
            }}
          >
            submit
          </button>
          <div className="text-sm">
            {"Already have an account, login "}
            <span>
              <Link
                href="/login"
                className="text-base text-red-500 underline underline-offset-2 hover:cursor-pointer "
              >
                here
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
