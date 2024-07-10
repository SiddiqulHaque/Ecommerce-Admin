"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import Nav from "@/components/Nav";
import { useState } from "react";
import Link from "next/link";
export default function Layout({ children }) {
  const { data: session } = useSession();
  const [showNav, setshowNav] = useState(false);
  if (!session) {
    return (
      <div className="h-screen w-screen bg-slate-900 flex items-center">
        <div className="text-center w-full">
          <Button
            onClick={() => signIn("google")}
            className="px-4 bg-white p-4 rounded-lg text-slate-700 hover:bg-slate-300 "
          >
            <FaGoogle className="mr-2 h-4 w-4" /> Login with Google
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 ">
      <div className="md:hidden flex">
        <Button
          onClick={() => setshowNav(true)}
          className="text-white bg-slate-800 hover:bg-slate-800 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </Button>
        <div className="flex grow justify-center mr-10">
          <Link href={"/"} className="flex gap-1 text-xl text-white ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-10 h-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
              />
            </svg>

            <span className="pl-2 font-bold font-serif pt-1.5 text-14 text-white">
              E-Admin
            </span>
          </Link>
        </div>
      </div>

      <div className=" flex min-h-screen">
        <Nav show={showNav} />
        <div className="bg-gray-100 flex-grow mb-4 rounded-lg  px-4 mt-0 py-4 md:mt-4">
          {children}
        </div>
      </div>
    </div>
  );
}
