import React from "react";
import { BsPlusLg } from "react-icons/bs";

interface Button2Type {
  text: string;
}

export default function Button2({ text }: Button2Type) {
  return (
    <div className="h-[39px] px-[20px] rounded-[5px] bg-BrightViolet text-white flex items-center gap-[4px] cursor-pointer">
      <BsPlusLg />

      <p>{text}</p>
    </div>
  );
}
