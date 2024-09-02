"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FaTachometerAlt,
  FaTags,
  FaUsers,
  FaCog,
  FaEnvelopeOpenText,
  FaBook,
  FaImages,
  FaChartPie,
  FaComments,
  FaSlidersH,
} from "react-icons/fa";

const Sidebar: React.FC<{
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}> = ({ isSidebarOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const router = useRouter();

  // Updated menu items with icons and routes according to the UI
  const menuItems = [
    { name: "Audio Files", icon: <FaTachometerAlt />, url: "/audio-files" },
  ];

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div>
      <nav
        className={`fixed inset-y-0 left-0 z-30 w-64 p-6 bg-black text-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:flex md:flex-col md:h-full`}
      >
        <div className="flex items-center justify-center mb-8">
          {/* <Image
            src="/logowhite.png"
            width={1000}
            height={1000}
            alt="logo"
            className="object-contain h-14"
          /> */}
          <h1 className="text-2xl font-medium">Audio Central</h1>
        </div>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.url}
                className={`flex items-center p-2 rounded-lg transition-colors ${
                  pathname === item.url ? "bg-[#86848433]" : "hover:bg-gray-700"
                }`}
                onClick={toggleSidebar}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="ml-4 text-sm">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <button
          className="mt-auto w-full py-2 text-sm font-semibold text-center text-black bg-white rounded-lg"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
