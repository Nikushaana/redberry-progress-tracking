import React from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
// import { RiEqualLine } from "react-icons/ri";

export default function PriorityFrame() {
  return (
    <div
      className={`border-[0.5px] border-myRed text-myRed ${true ? "rounded-[5px] h-[26px] " : "rounded-[3px] h-[32px] "} flex items-center gap-[4px] p-[4px]`}
    >
      <MdOutlineArrowBackIosNew className="rotate-[90deg]" />
      {/* <RiEqualLine/> */}
      <h2 className={`${true && "text-[12px]"}`}>მაღალი</h2>
    </div>
  );
}
