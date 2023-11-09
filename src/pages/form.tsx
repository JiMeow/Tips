import Navbar from "@/components/Navbar";
import { useCreateTip } from "@/hooks/useCreateTips";
import React, { useState } from "react";

const Form = () => {
  const maxContent = 85;
  const maxWriterName = 30;
  const maxContentAlert = 75;
  const maxWriterNameAlert = 20;

  const [content, setContent] = useState("");
  const [writerName, setWriterName] = useState("");

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
        <div className="flex h-full w-full flex-col-reverse items-center justify-center ">
          <div className="flex w-[40vh] max-w-[90vw] flex-col  gap-4 rounded-lg bg-slate-500 px-4">
            <div className="w-full pt-[2vh] text-center">Add Content Form</div>
            <div className="flex flex-col gap-2">
              <div className="flex w-full justify-center gap-1">
                <div>Content</div>
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
                className="h-20 w-full rounded-lg p-2 text-start"
                placeholder="รู้หรือไม่ว่าฉลามคือปลาชนิดเดียวที่สามารถกระพริบตาได้"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={maxContent}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex w-full justify-center gap-1">
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
                className="h-10 w-full rounded-lg p-2 text-start"
                placeholder="TUANG"
                value={writerName}
                onChange={(e) => setWriterName(e.target.value)}
                maxLength={maxWriterName}
              />
            </div>

            <div className="mb-[2vh] flex w-full justify-end">
              <button
                className="h-10 w-20 rounded-lg bg-red-400 text-white"
                onClick={() => {
                  if (
                    content.length > maxContentAlert ||
                    writerName.length > maxWriterNameAlert
                  )
                    return;
                  if (content.length === 0 || writerName.length === 0) return;
                  createTips({ content, writerName });
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
