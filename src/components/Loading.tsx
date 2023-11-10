import React from "react";
import Navbar from "./Navbar";

const Loading = () => {
  return (
    <>
      <Navbar />
      <div className="h-[100vh] w-[100vw] bg-[url('/images/room2.png')] bg-cover bg-center bg-no-repeat">
        <div className="flex h-full w-full items-center justify-center md:justify-normal">
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <div className="group flex h-80 w-80 -translate-y-24  -rotate-12 skew-x-0 scale-125 items-center justify-center duration-500 hover:origin-top-left hover:translate-x-6 hover:translate-y-12 hover:-rotate-0 hover:skew-x-1  hover:scale-100">
              <div className="group-hover:duration-400 before:content[''] relative flex h-36 w-64 flex-col items-center justify-center gap-1 rounded-2xl bg-zinc-800 text-gray-50  before:absolute  before:right-3 before:top-0  before:-z-10 before:h-32 before:w-64 before:-skew-x-12 before:rounded-2xl before:bg-neutral-700">
                <span className="text-5xl font-bold">Jr</span>
                <p className="font-thin text-amber-300">
                  - Frontend Developer -
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
<div className="flex w-60 animate-pulse flex-col items-center gap-4">
  <div className="h-7 w-full rounded-md bg-slate-400"></div>
  <div className="h-7 w-full rounded-md bg-slate-400"></div>
  <div className="h-7 w-full rounded-md bg-slate-400"></div>
</div>;
