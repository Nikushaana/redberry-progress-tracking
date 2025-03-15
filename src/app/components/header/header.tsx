"use client";

import Image from "next/image";
import React, { useContext } from "react";
import Button1 from "../buttons/button1";
import Button2 from "../buttons/button2";
import { SharedStates } from "../../../../dataFetchs/sharedStates";
import { useRouter } from "next/navigation";

export default function Header() {
  const { setAddEmployeeModalStatus } = useContext(SharedStates);
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-[118px] h-[100px]">
      <div
        onClick={() => {
          router.push("/");
        }}
        className="relative h-[38px] w-[210px]"
      >
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
        <Button1
          text="თანამშრომლის შექმნა"
          action={() => {
            setAddEmployeeModalStatus(true);
          }}
        />
        <Button2
          text="შექმენი ახალი დავალება"
          action={() => {
            router.push("/create-new-task");
          }}
        />
      </div>
    </div>
  );
}
