"use client";
import { navigation } from "@/data/constants";
import Logo from "@/public/logo.png";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function SideNavBar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="flex flex-col p-5 gap-0 h-screen overflow-y-auto scrollbar-hide">
      <div className="flex items-center px-5 divide-x divide-gray-300">
        <Image
          src={Logo}
          alt="wonderhub"
          loading="eager"
          quality={100}
          className="w-auto h-10 pr-2"
        />
        <div className="pl-2">
          <div className="text-xl font-bold bg-linear-to-r from-primary to-pink-600 bg-clip-text text-transparent ">
            WonderHUB
          </div>
          <div className="text-gray-500 text-xs">Digital Solution Agency</div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-between flex-1 py-1.5 h-fit! rounded-2xl">
        <nav className="space-y-2 px-5 text-sm">
          <div className="flex items-center mt-7 gap-2">
            <h4 className="text-gray-400 text-xs font-bold">DASHBOARD</h4>
            <hr className="text-gray-300 w-full" />
          </div>

          {navigation.workspace.map((item, i) => (
            <Link
              key={i}
              href={item.path}
              className={`flex gap-2 items-center p-2 rounded-sm capitalize ${
                pathname === item.path
                  ? "bg-primary text-white "
                  : "text-gray-700 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <item.icon
                strokeWidth={pathname === item.path ? 2.5 : 1.5}
                size={18}
              />
              {item.label}
            </Link>
          ))}
          <div className="flex items-center mt-7 gap-2">
            <h4 className="text-gray-400 text-xs font-bold">SYSTEM</h4>
            <hr className="text-gray-300 w-full" />
          </div>
          {navigation.system.map((item, i) => (
            <Link
              key={i}
              href={item.path}
              className={`flex gap-2 items-center p-2 rounded-sm capitalize ${
                pathname === item.path
                  ? "bg-primary text-white "
                  : "text-gray-700 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <item.icon
                strokeWidth={pathname === item.path ? 2.5 : 1.5}
                size={18}
              />
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => {
            //   logout();
            router.refresh();
          }}
          className="flex items-center w-full px-7 py-1.75 text-[12px] text-red-500 rounded-xl hover:bg-[#FFE6E6]"
        >
          <LogOut className="mr-2 w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideNavBar;
