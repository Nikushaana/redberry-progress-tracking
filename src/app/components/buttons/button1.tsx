import React from "react";

interface Button1Type {
  text: string;
}

export default function Button1({ text }: Button1Type) {
  return (
    <div className="h-[39px] px-[20px] rounded-[5px] border-[1px] border-BrightViolet flex items-center cursor-pointer">
      <p>{text}</p>
    </div>
  );
}
