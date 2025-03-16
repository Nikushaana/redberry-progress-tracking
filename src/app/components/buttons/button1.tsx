"use client";

import React from "react";

export default function Button1({ text, action }: Button1Type) {
  return (
    <div
      onClick={action}
      className="h-[39px] px-[20px] rounded-[5px] border-[1px] border-BrightViolet hover:border-BrightVioletHover duration-100 flex items-center cursor-pointer"
    >
      <p>{text}</p>
    </div>
  );
}
