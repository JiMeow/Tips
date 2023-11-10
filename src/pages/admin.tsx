import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import Tag from "@/components/Tag";
import { useAllTips } from "@/hooks/useAllTips";
import { type Tip } from "@prisma/client";
import { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Loading from "@/components/Loading";

const Admin = () => {
  const [selectApproved, setSelectApproved] = useState(false);
  const [selectRejected, setSelectRejected] = useState(false);
  const [selectPending, setSelectPending] = useState(true);
  const [tips, setTips] = useState([] as Tip[]);
  const { data: allTips, isSuccess } = useAllTips();

  const [parent] = useAutoAnimate();

  useEffect(() => {
    const tempTips = [];
    const approvedTips =
      allTips?.filter((tip) => tip.approved && !tip.rejected) ?? [];
    const rejectedTips = allTips?.filter((tip) => tip.rejected) ?? [];
    const pendingTips =
      allTips?.filter((tip) => !tip.approved && !tip.rejected) ?? [];

    if (selectApproved) {
      tempTips.push(...approvedTips);
    }
    if (selectRejected) {
      tempTips.push(...rejectedTips);
    }
    if (selectPending) {
      tempTips.push(...pendingTips);
    }
    setTips(tempTips);
  }, [selectApproved, selectRejected, selectPending, allTips]);

  if (!isSuccess) return <Loading />;

  return (
    <>
      <Navbar />
      <div className="flex h-[100vh] w-[100vw] items-center justify-center bg-[url('/images/room2.png')] bg-cover bg-center bg-no-repeat">
        <div
          ref={parent}
          className="relative flex h-[80vh] max-h-[80vh] w-[90vw] max-w-[90vw] flex-row flex-wrap content-start
            items-start justify-center overflow-auto rounded-lg bg-slate-500 p-4 pt-16 sm:justify-normal
        "
        >
          {tips.map((tip) => (
            <Card key={tip.id} {...tip} />
          ))}
          {tips.length === 0 && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-2xl text-black">
              No Tips
            </div>
          )}
          <div className="absolute left-8 top-4 flex flex-row gap-4">
            <Tag
              name="Approved"
              type="approved"
              isSelect={selectApproved}
              setSelect={setSelectApproved}
            />
            <Tag
              name="Rejected"
              type="rejected"
              isSelect={selectRejected}
              setSelect={setSelectRejected}
            />
            <Tag
              name="Pending"
              type="pending"
              isSelect={selectPending}
              setSelect={setSelectPending}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
