import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { CursorClick, HandPointing, MouseSimple } from "@phosphor-icons/react";
import Choice from "@/components/Choice";

const Profile = () => {
  const session = useSession();

  const username = session.data?.user.email ?? "Anon";

  const [cursorHoverShowAllTips, setCursorHoverShowAllTips] = useState(false);
  const [cursorHoverChangeUsername, setCursorHoverChangeUsername] =
    useState(false);
  const [cursorHoverChangePassword, setCursorHoverChangePassword] =
    useState(false);

  return (
    <>
      <Navbar />
      <div className="flex h-[100vh] items-center justify-center bg-[url('/images/room2.png')] bg-cover bg-center bg-no-repeat">
        <div className="flex flex-col items-center rounded-lg border-2 border-gray-700 bg-slate-500 p-8">
          <div className="mb-4 text-xl">{`Hello ${username}`}</div>
          <div className="mb-4 text-xl">{`==== Tips ====`}</div>
          <div className="mb-4 flex flex-col self-start">
            <Choice label="Show All Tips" hrefPath="/profile/tips">
              <MouseSimple
                onMouseOver={() => setCursorHoverShowAllTips(true)}
                onMouseLeave={() => setCursorHoverShowAllTips(false)}
                size={24}
                color="#5c0000"
                weight={cursorHoverShowAllTips ? "fill" : "bold"}
                className="inline duration-300 hover:scale-125"
              />
            </Choice>
          </div>
          <div className="mb-4 text-xl">{`=== Manage ===`}</div>
          <div className="mb-4 flex flex-col self-start">
            <Choice label="Change Username" hrefPath="/profile/change-username">
              <CursorClick
                onMouseOver={() => setCursorHoverChangeUsername(true)}
                onMouseLeave={() => setCursorHoverChangeUsername(false)}
                size={24}
                color="#5c0000"
                weight={cursorHoverChangeUsername ? "fill" : "bold"}
                className="inline duration-300 hover:scale-125"
              />
            </Choice>
            <Choice label="Change Password" hrefPath="/profile/change-password">
              <HandPointing
                onMouseOver={() => setCursorHoverChangePassword(true)}
                onMouseLeave={() => setCursorHoverChangePassword(false)}
                size={24}
                color="#5c0000"
                weight={cursorHoverChangePassword ? "fill" : "bold"}
                className="inline duration-300 hover:scale-125"
              />
            </Choice>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
