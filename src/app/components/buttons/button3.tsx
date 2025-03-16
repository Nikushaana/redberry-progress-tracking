"use client";

import React from "react";

export default function Button3({ text, action }: Button1Type) {
  return (
    <div
      onClick={action}
      className="h-[35px] w-[155px] rounded-full bg-BrightViolet hover:bg-BrightVioletHover text-white duration-100 flex items-center justify-center cursor-pointer self-end"
    >
      <p>{text}</p>
    </div>
  );
}
