import React from "react";
import MobileSideBar from "./MobileSideBar";

const MobileHeader = () => {
  return (
    <nav className="2xl:hidden px-6 h-[50px] flex items-center bg-orange-500 text-white border-b fixed top-0 w-full z-50">
      <MobileSideBar />
    </nav>
  );
};

export default MobileHeader;
