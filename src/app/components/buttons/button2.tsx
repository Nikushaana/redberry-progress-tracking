import React from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";

export default function Button2({ text, button, loader, action }: Button2Type) {
  return loader ? (
    <div className="h-[39px] px-[20px] rounded-[5px] bg-BrightViolet opacity-[0.5] pointer-events-none text-white flex items-center gap-[4px] cursor-pointer">
      <BiLoaderAlt className="animate-spin" />

      <p>{text}</p>
    </div>
  ) : button ? (
    <button
      type="submit"
      className="h-[39px] px-[20px] rounded-[5px] bg-BrightViolet text-white flex items-center gap-[4px] cursor-pointer"
    >
      <BsPlusLg />

      <p>{text}</p>
    </button>
  ) : (
    <div
      onClick={action}
      className="h-[39px] px-[20px] rounded-[5px] bg-BrightViolet text-white flex items-center gap-[4px] cursor-pointer"
    >
      <BsPlusLg />

      <p>{text}</p>
    </div>
  );
}
