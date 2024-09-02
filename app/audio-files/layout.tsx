"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi"; // Import the hamburger icon from react-icons

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const path = usePathname();
  const formattedPath = path
    .replace(/^\//, "") // Remove the leading "/"
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const title = formattedPath.charAt(0).toUpperCase() + formattedPath.slice(1);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-grow w-full">
        {/* Mobile Header with Hamburger Menu */}
        <div className="flex items-center justify-between p-4 bg-black text-gray-100 md:hidden">
          <h1 className="text-2xl font-medium">Audio Central</h1>
          {/* Hamburger Icon Button */}
          <button onClick={toggleSidebar} title="Toggle Sidebar">
            <GiHamburgerMenu className="text-2xl" />
          </button>
        </div>
        <div className="flex-grow p-4 bg-gray-100 text-black overflow-auto">
          <Header title={title} />
          {children}
        </div>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Layout;
