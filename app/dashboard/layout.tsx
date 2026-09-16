import { HeaderMenu } from "@/components/Layout/DashboardHeader";
import SideNavBar from "@/components/Layout/SideNav";
import React from "react";
interface Prop {
  children: React.ReactNode;
}
const dashboardlayout: React.FC<Prop> = ({ children }) => {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen bg-white">
      {/* Sidebar */}
      <aside className="hidden w-75 bg-transparent text-adron-black md:flex flex-col border-r border-gray-200">
        <SideNavBar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto scrollbar-hide">
        <HeaderMenu />
        <div className="py-2 px-2 sm:px-6">{children}</div>
      </main>
    </div>
  );
};

export default dashboardlayout;
