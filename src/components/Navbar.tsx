import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type PageType = {
  name: string;
  path: string;
  content: string;
  onClick?: () => void;
};

const pages: PageType[] = [
  { name: "Home", path: "/", content: "Show Tips" },
  { name: "Form", path: "/form", content: "Add Content" },
  { name: "Admin", path: "/admin", content: "Admin" },
  { name: "Login", path: "/login", content: "Login" },
];

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { pathname } = router;
  const isAdmin = pathname.includes("/admin");
  const isLogin = session !== null;
  console.log(session);

  return (
    <nav className="absolute h-12 w-full bg-slate-600 px-4">
      <div className="flex h-full items-center justify-end gap-1">
        {pages.map((page) => {
          if (page.name === "Admin" && !isAdmin) return null;
          if (page.name === "Login" && isLogin) return null;
          return (
            <Link
              key={page.name}
              href={page.path}
              className={`
            z-100 group relative grid  cursor-pointer
            place-items-center overflow-hidden 
            rounded-md border border-red-500 px-4 py-1
            ${
              page.path === pathname || (page.name === "Admin" && isAdmin)
                ? ` bg-red-600/80`
                : ` bg-red-300/80`
            }
                `}
            >
              <span className="relative z-10 text-sm text-white duration-500 md:text-xl">
                {page.content}
              </span>
              <span className="absolute -left-32 top-0 h-full w-full -rotate-45 bg-red-600 duration-500 group-hover:left-0 group-hover:rotate-0"></span>
              <span className="absolute -right-32 top-0 h-full w-full -rotate-45 bg-red-600 duration-500 group-hover:right-0 group-hover:rotate-0"></span>
            </Link>
          );
        })}
        {isAdmin && (
          <button
            onClick={async () => await signOut({ callbackUrl: "/" })}
            className="
        z-100 group relative grid h-full cursor-pointer
        place-items-center overflow-hidden 
        rounded-md border border-red-500 bg-red-300/80 px-4 text-sm"
          >
            <span className="relative z-10 text-base text-white duration-500 md:text-xl">
              Sign Out
            </span>
            <span className="absolute -left-32 top-0 h-full w-full -rotate-45 bg-red-600 duration-500 group-hover:left-0 group-hover:rotate-0"></span>
            <span className="absolute -right-32 top-0 h-full w-full -rotate-45 bg-red-600 duration-500 group-hover:right-0 group-hover:rotate-0"></span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
