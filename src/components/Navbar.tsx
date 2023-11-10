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
];

const Navbar = () => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <nav className="absolute h-12 w-full bg-slate-600">
      <div className="flex h-full items-center justify-end gap-1">
        {pages.map((page) => {
          const isAdmin = pathname.includes("/admin");
          if (page.name === "Admin" && !isAdmin) return null;
          return (
            <Link
              key={page.name}
              href={page.path}
              className={`
            z-100 group relative grid h-full cursor-pointer
            place-items-center overflow-hidden 
            rounded-md border border-red-500 px-4 text-sm   
            ${"/admin" === page.path ? ` bg-red-600/80` : ` bg-red-300/80`}
                `}
            >
              <span className="relative z-10 text-xl text-white duration-500">
                {page.content}
              </span>
              <span className="absolute -left-32 top-0 h-full w-full -rotate-45 bg-red-600 duration-500 group-hover:left-0 group-hover:rotate-0"></span>
              <span className="absolute -right-32 top-0 h-full w-full -rotate-45 bg-red-600 duration-500 group-hover:right-0 group-hover:rotate-0"></span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
