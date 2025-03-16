import Image from "next/image";
import React from "react";

export default function PriorityAndDepartment({ data, small }: Taskcard) {
  return (
    <div className="flex items-center gap-[10px]">
      <div
        className={`border-[0.5px] 
              ${
                data?.priority.name === "დაბალი"
                  ? "border-myGreen text-myGreen"
                  : data?.priority.name === "მაღალი"
                  ? "border-myRed text-myRed"
                  : data?.priority.name === "საშუალო" &&
                    "border-myYellow text-myYellow"
              }
              ${
                small ? "rounded-[5px] h-[26px] " : "rounded-[3px] h-[32px] "
              } flex items-center gap-[4px] p-[4px]`}
      >
        <div className="relative h-[18px] aspect-square">
          {data?.priority.icon && (
            <Image
              src={data?.priority.icon}
              alt=""
              fill
              style={{
                objectFit: "cover",
              }}
            />
          )}
        </div>
        <h2 className={`${small && "text-[12px]"}`}>{data?.priority.name}</h2>
      </div>
      <p
        className={`flex items-center justify-center px-[10px] rounded-[15px] text-white ${
          data?.department.id &&
          (data?.department.id == 1
            ? "bg-myLightPink"
            : data?.department.id == 2
            ? "bg-myLightYellow"
            : data?.department.id == 3
            ? "bg-myLightYellow"
            : data?.department.id == 4
            ? "bg-myLightOrange"
            : data?.department.id == 5
            ? "bg-myGreen"
            : data?.department.id == 6
            ? "bg-myPink"
            : data?.department.id == 7 && "bg-BrightViolet")
        } ${
          small
            ? "h-[24px] text-[12px] max-w-[140px] truncate line-clamp-1"
            : "h-[29px]"
        }`}
      >
        {data?.department.name && small
          ? data?.department.name.length > 9
            ? data?.department.name
                .split(" ")
                .map((word) => word.slice(0, 4))
                .join(". ")
            : data?.department.name
          : data?.department.name}
      </p>
    </div>
  );
}
