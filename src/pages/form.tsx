import Navbar from "@/components/Navbar";
import { useCreateTip } from "@/hooks/useCreateTip";
import { Note } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

const Form = () => {
  const maxContent = 99;
  const maxWriterName = 30;
  const maxContentAlert = 85;
  const maxWriterNameAlert = 20;

  const [content, setContent] = useState("");
  const [writerName, setWriterName] = useState("");

  const session = useSession();
  const userId = session.data?.user.id;
  const isLogin = session.status === "authenticated";

  const { mutate: createTips } = useCreateTip({
    onSuccess: () => {
      setContent("");
      setWriterName("");
    },
  });

  return (
    <>
      <Navbar />
      <div className="h-[100vh] w-[100vw] bg-[url('/images/room2.png')] bg-cover bg-center bg-no-repeat">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="flex w-[40vh] max-w-[90vw] flex-col  gap-4 rounded-lg bg-slate-500 px-4">
            <div className="w-full pt-[2vh] text-center text-base lg:text-lg">
              Add Content Form
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex w-full justify-center gap-1 text-base lg:text-lg">
                <div className="">Content</div>
                <div>
                  <span
                    className={`${
                      content.length > maxContentAlert ? `text-red-400` : ``
                    }`}
                  >
                    {content.length}
                  </span>
                  /{maxContentAlert}
                </div>
              </div>
              <textarea
                className="h-24 w-full rounded-lg p-2 text-start text-base lg:h-28 lg:text-lg"
                placeholder="รู้หรือไม่ว่าฉลามคือปลาชนิดเดียวที่สามารถกระพริบตาได้"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={maxContent}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex w-full justify-center gap-1 text-base lg:text-lg">
                <div>Writer</div>
                <div>
                  <span
                    className={`${
                      writerName.length > maxWriterNameAlert
                        ? `text-red-400`
                        : ``
                    }`}
                  >
                    {writerName.length}
                  </span>
                  /{maxWriterNameAlert}
                </div>
              </div>
              <input
                className="h-10 w-full rounded-lg p-2 text-start text-base lg:text-lg"
                placeholder="TUANG"
                value={writerName}
                onChange={(e) => setWriterName(e.target.value)}
                maxLength={maxWriterName}
              />
            </div>

            <div
              className={`mb-[2vh] flex w-full items-center ${
                isLogin ? "justify-end" : "justify-around"
              }`}
            >
              {!isLogin && (
                <div
                  className="text-sm"
                  onClick={() => {
                    localStorage.setItem("redirectLogin", "/form");
                  }}
                >
                  Login to store your tips,{" "}
                  <span>
                    <Link
                      href="/login"
                      className="text-base text-red-500 underline underline-offset-2 hover:cursor-pointer"
                    >
                      here
                    </Link>
                  </span>
                </div>
              )}
              <button
                className="h-10 w-20 rounded-lg border-2 border-red-700 bg-red-400 text-white duration-300 hover:bg-red-600"
                onClick={() => {
                  if (
                    content.length > maxContentAlert ||
                    writerName.length > maxWriterNameAlert
                  )
                    return;
                  if (content.length === 0 || writerName.length === 0) return;
                  createTips({ content, writerName, userId });
                }}
              >
                Submit
              </button>
            </div>
          </div>
          <Link
            href="/"
            className="mt-8 flex animate-bounce flex-col items-center sm:hidden"
          >
            <Note
              size={24}
              color="#fafafa"
              weight="duotone"
              className="h-12 w-12 hover:cursor-pointer
              "
            />
            <div className="text-center text-gray-700">back to tips</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Form;
