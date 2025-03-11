import Image from "next/image";
import React from "react";
import Button1 from "../buttons/button1";
import Button2 from "../buttons/button2";

export default function Header() {
  return (
    <div className="flex items-center justify-between px-[118px] h-[100px]">
      <div className="relative h-[38px] w-[210px]">
        <Image
          src="/images/Frame 1000006027.png"
          alt=""
          fill
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      <div className="flex items-center gap-[40px]">
        <Button1 text="თანამშრომლის შექმნა"/>
        <Button2 text="შექმენი ახალი დავალება" />
      </div>
    </div>
  );
}
