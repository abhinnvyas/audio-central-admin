import Image from "next/image";
import React from "react";
import { FaBell } from "react-icons/fa";
import SomeImage from "../../public/7.jpg";

interface Props {
  title: string;
}

export const Header: React.FC<Props> = ({ title }) => {
  return (
    <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-300">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex items-center justify-center space-x-4">
        <FaBell className="text-2xl text-gray-500" />
        {/* <Image
          className="rounded-full"
          src={SomeImage}
          alt="Profile Picture"
          width={40}
          height={40}
        /> */}
      </div>
    </div>
  );
};

export default Header;
