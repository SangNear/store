"use client"
import { navLinks } from "@/lib/contants";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TopSideBar = () => {
  const pathName = usePathname()
  return (
    <div className="w-full sticky z-20 top-0 px-8 py-4  flex justify-between items-center gap-12 shadow-xl lg:hidden bg-blue-2">
      <Image src="/logo.png" alt="logo" width={150} height={70} />
      <div className="flex justify-center items-center gap-8 max-md:hidden">
        {navLinks.map((item, index) => {
          return (
            <Link
              href={item.url}
              key={index}
              className={`flex gap-4 text-body-medium hover:text-blue-600 text-gray-500 ${pathName === item.url? "text-blue-600" : ""}`}
            >
              <p>{item.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="flex gap-4 items-center">
        <Menu className="cursor-pointer md:hidden" />
        <UserButton />
      </div>
    </div>
  );
};

export default TopSideBar;
