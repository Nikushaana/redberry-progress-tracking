import Image from "next/image";
import React from "react";
import PriorityFrame from "../priorityFrame/priorityFrame";

export default function TaskCard() {
  return (
    <div className="rounded-[15px] border-[1px] border-myYellow p-[20px] flex flex-col gap-y-[28px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <PriorityFrame />
          <p className="bg-myRed flex items-center justify-center h-[24px] w-[88px] text-[12px] rounded-[15px] text-white">
            დიზაინი
          </p>
        </div>
        <p className="text-[12px]">22 იანვ, 2022</p>
      </div>
      <div className="px-[10px] flex flex-col gap-y-[12px]">
        <h1 className="text-[15px]">Redberry-ს საიტის ლენდინგის დიზაინი </h1>
        <p className="text-[14px] text-[#343A40]">
          შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ სექციებს,
          ნავიგაციას.
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="relative h-[31px] aspect-square rounded-full overflow-hidden">
          <Image
            src="/images/girl.jpeg"
            alt=""
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        <div className="flex items-center gap-[4px]">
          <div className="relative h-[22px] aspect-square">
            <Image
              src="/images/Comments.png"
              alt=""
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <p className="text-[14px]">8</p>
        </div>
      </div>
    </div>
  );
}
