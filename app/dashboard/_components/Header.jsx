"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function Header() {
  const path = usePathname();

  useEffect(() => {
    // console.log(path);
  }, [path]);

  return (
    <div className="flex px-40 py-4 items-center justify-between bg-secondary shadow-md">
      <div className="flex items-center gap-3">
        <Image src={"/logo.svg"} width={40} height={20} />
        <h1 className="text-2xl text-[#007DFC] font-bold">Intervur</h1>
      </div>
      <ul className="hidden md:flex gap-6">
        <li
          className={`hover:text-[#007DFC] hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard" && "text-[#007DFC] font-bold"
          }`}
        >
          Dashboard
        </li>
        <li
          className={`hover:text-[#007DFC] hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard/questions" && "text-[#007DFC] font-bold"
          }`}
        >
          Questions
        </li>
        <li
          className={`hover:text-[#007DFC] hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard/upgrade" && "text-[#007DFC] font-bold"
          }`}
        >
          Upgrade
        </li>
        <li
          className={`hover:text-[#007DFC] hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard/howitworks" && "text-[#007DFC] font-bold"
          }`}
        >
          How it Works?
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
