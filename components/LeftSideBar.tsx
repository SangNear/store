"use client"
import { navLinks } from "@/lib/contants";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";


import React from "react";

const LeftSideBar = () => {
  const pathname = usePathname()


  return (
    <div className="h-screen left-0 top-0 sticky  p-10  flex flex-col gap-16 shadow-xl max-lg:hidden bg-blue-2">
      <Image src="/logo.png" alt="logo" width={150} height={70} />
      <div className="flex flex-col gap-14">
        {navLinks.map((item, index) => {

          return (
            <Link href={item.url} key={index} className={`flex gap-4 text-body-medium hover:text-blue-600 ${pathname === item.url ? "text-blue-600" : ""}`}>
              {item.icon} <p>{item.label}</p>
            </Link>

          );
        })}
        <div className="flex gap-4 items-center">
          <UserButton />
          <p className="text-body-medium">Edit profile</p>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
