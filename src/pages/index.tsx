import Navbar from "@/components/Navbar";
import { useAllTips } from "@/hooks/useAllTips";
import { useState } from "react";
import { CaretDoubleRight, PlusCircle } from "@phosphor-icons/react";
import Image from "next/image";
import Loading from "@/components/Loading";
import Link from "next/link";

export default function Home() {
  const [showTipIndex, setShowTipIndex] = useState(-1);
  const { data: allTips, isSuccess } = useAllTips();

  const tips = allTips?.filter((tip) => tip.approved && !tip.rejected) ?? [];

  const randomTip =
    showTipIndex != -1
      ? tips[showTipIndex]
      : tips[Math.floor(Math.random() * tips.length)];

  if (!isSuccess) return <Loading />;
  return (
    <>
      <Navbar />
      <div className="h-[100vh] w-[100vw] bg-[url('/images/room2.png')] bg-cover bg-center bg-no-repeat">
        <div className="flex h-full w-full flex-col-reverse items-center justify-center md:justify-normal">
          <Image
            className="
              w-[95%] sm:w-[65%] md:mb-[10%] md:w-[55%]
              lg:mb-[5%] lg:w-[50%] xl:mb-0 xl:w-[50%]
              "
            src="/images/note.png"
            alt="notepad"
            width={1920}
            height={1080}
            priority
          ></Image>
          <div
            className="absolute mt-[20%] h-[55vw] w-[75%]
              sm:mt-[7%] sm:h-[36vw] sm:w-[50%]
              md:mb-[18%] md:h-[33vw] md:w-[45%]
              lg:mb-[12%] lg:h-[30vw] lg:w-[40%]
              xl:mb-[7%] xl:h-[30vw] xl:w-[40%]"
          >
            <div
              className="h-full w-full overflow-hidden break-normal
              px-[10vw] text-[4.4vw]
              leading-[14vw] sm:px-[6vw] sm:pt-[3vw] sm:text-[20px]
              sm:leading-[9.5vw] md:px-[5.5vw] md:pt-[3vw] md:text-[21px]
              md:leading-[8vw] lg:px-[5vw] lg:pt-[3vw] lg:text-[24px] 
              lg:leading-[7.5vw] xl:text-[30px] 2xl:text-[36px]
              "
            >
              {showTipIndex === -1
                ? randomTip?.content
                : tips[showTipIndex]?.content}
            </div>
            <div
              className="absolute bottom-[1vw] right-[1vw] overflow-hidden text-end text-[4.8vw] font-semibold sm:text-[24px] md:text-[28px]
              lg:text-[32px]"
            >
              {showTipIndex === -1
                ? randomTip?.writerName
                : tips[showTipIndex]?.writerName}
            </div>
            <div className="mt-8 flex flex-row justify-around sm:mt-14">
              <Link href="/form" className="sm:hidden">
                <PlusCircle
                  size={24}
                  color="#fafafa"
                  weight="duotone"
                  className="h-[12vw] w-[12vw]  hover:cursor-pointer
                  sm:h-14 sm:w-14 md:absolute"
                />
                <div className="text-center text-gray-700">Add Tip</div>
              </Link>
              {tips.length > 1 && (
                <CaretDoubleRight
                  size={24}
                  color="#ffffff"
                  weight="duotone"
                  className="bottom-[-10vh] right-[25%] h-[12vw] w-[12vw] animate-bounce
              hover:cursor-pointer sm:bottom-[-12vh] 
              sm:h-14 sm:w-14 md:absolute 
              md:bottom-[1vw] md:right-[-96px]
              md:h-16 md:w-16 lg:right-[-120px]
              lg:h-20 lg:w-20 xl:right-[-144px]
              xl:h-24 xl:w-24 2xl:right-[-168px]
              2xl:h-28
              2xl:w-28
              "
                  onClick={() => {
                    let rand = Math.floor(Math.random() * tips.length);
                    while (rand === showTipIndex)
                      rand = Math.floor(Math.random() * tips.length);
                    setShowTipIndex(rand);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
