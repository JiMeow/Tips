import { List } from "@phosphor-icons/react/dist/ssr/List";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

type PageType = {
  name: string;
  path: string;
  content: string;
  onClick?: () => void;
};

const pagesDefault: PageType[] = [
  { name: "Home", path: "/", content: "Show Tips" },
  { name: "Form", path: "/form", content: "Add Content" },
  {
    name: "Login",
    path: "/login",
    content: "Login",
    onClick: () => {
      localStorage.removeItem("redirectLogin");
    },
  },
];

const pagesAdmin: PageType[] = [
  { name: "Admin", path: "/admin", content: "Admin" },
];

const pageLogin: PageType[] = [
  { name: "Profile", path: "/profile", content: "Profile" },
  {
    name: "Signout",
    path: "#",
    content: "Signout",
    onClick: () => void signOut({ callbackUrl: "/" }),
  },
];

const Navbar = () => {
  const router = useRouter();
  const session = useSession();
  const { pathname } = router;
  const isLogin = session.status === "authenticated";
  const isAdmin = session.data?.user.isAdmin ?? false;
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <nav className="absolute right-4 top-4 z-10 block sm:hidden">
        <List
          size={36}
          color="#5c0000"
          weight="bold"
          onClick={() => setOpenNav((prev) => !prev)}
          className="z-10 duration-200 hover:scale-125 hover:cursor-pointer"
        />
        <div
          className="absolute right-[-16px] top-[-16px] -z-10 flex h-screen flex-col  items-start
            gap-4 overflow-hidden bg-slate-600/90 pt-24 transition-all duration-500
          "
          style={{
            width: openNav ? "160px" : "0%",
          }}
        >
          {pagesDefault.map((page) => {
            if (page.name === "Login" && isLogin) return null;
            return (
              <Link
                key={page.name}
                href={page.path}
                onClick={page.onClick}
                className={`
              group relative z-50 ml-4  grid
              cursor-pointer place-items-center 
              overflow-hidden rounded-md border border-red-500 px-4
              py-1
              ${
                page.path === pathname ||
                (page.name === "Login" && pathname === "/signup")
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
          {isLogin &&
            pageLogin.map((page) => {
              return (
                <Link
                  key={page.name}
                  href={page.path}
                  onClick={page.onClick}
                  className={`
              group relative z-50 ml-4  grid
              cursor-pointer place-items-center 
              overflow-hidden rounded-md border border-red-500 px-4
              py-1
              ${
                page.path === pathname ||
                (page.name === "Login" && pathname === "/signup")
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
          {isAdmin &&
            pagesAdmin.map((page) => {
              return (
                <Link
                  key={page.name}
                  href={page.path}
                  onClick={page.onClick}
                  className={`
                    group relative z-50 ml-4  grid
                    cursor-pointer place-items-center 
                    overflow-hidden rounded-md border border-red-500 px-4
                    py-1
                    ${
                      page.path === pathname
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
        </div>
      </nav>
      <nav className="absolute hidden h-12 w-full bg-slate-600 px-4 sm:block">
        <div className="flex h-full items-center justify-end gap-1 ">
          {pagesDefault.map((page) => {
            if (page.name === "Login" && isLogin) return null;
            return (
              <Link
                key={page.name}
                href={page.path}
                onClick={page.onClick}
                className={`
              group relative z-50 ml-4  grid
              cursor-pointer place-items-center 
              overflow-hidden rounded-md border border-red-500 px-4
              py-1
              ${
                page.path === pathname ||
                (page.name === "Login" && pathname === "/signup")
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
          {isLogin &&
            pageLogin.map((page) => {
              return (
                <Link
                  key={page.name}
                  href={page.path}
                  onClick={page.onClick}
                  className={`
              group relative z-50 ml-4  grid
              cursor-pointer place-items-center 
              overflow-hidden rounded-md border border-red-500 px-4
              py-1
              ${
                page.path === pathname ||
                (page.name === "Login" && pathname === "/signup")
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
          {isAdmin &&
            pagesAdmin.map((page) => {
              return (
                <Link
                  key={page.name}
                  href={page.path}
                  onClick={page.onClick}
                  className={`
                    group relative z-50 ml-4  grid
                    cursor-pointer place-items-center 
                    overflow-hidden rounded-md border border-red-500 px-4
                    py-1
                    ${
                      page.path === pathname
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
        </div>
      </nav>
    </>
  );
};

export default Navbar;
