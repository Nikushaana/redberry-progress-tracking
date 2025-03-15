"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

export default function Input1({
  title,
  name,
  setValue,
  errorsData,
  render,
}: Input1Type) {
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    if (render) {
      setInput("");
    }
  }, [render]);

  useEffect(() => {
    if (setValue) {
      setValue((prev: object) => ({
        ...prev,
        [name]: input,
      }));
    }
  }, [input]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const InputValue = event.target.value;

    // if (isNumber) {
    //   InputValue = newText
    //     .replace(/[^0-9]/g, "")
    //     .replace(/\s/g, "")
    //     .replace(/(.{3})/g, "$1 ")
    //     .trim()
    //     .slice(0, 11);
    // }

    setInput(InputValue);
  };

  return (
    <div className="flex flex-col gap-y-[6px]">
      <h2 className="text-[14px]">{title}</h2>
      <div
        className={`rounded-[5px] border-[1px] flex items-center bg-white h-[42px] w-full px-[10px] ${
          input && errorsData?.find((item1: ErrorItem) => item1.status === true)
            ? "border-myRed"
            : "border-[#CED4DA]"
        }`}
      >
        <input
          type="text"
          name={name}
          value={input}
          onChange={handleInputChange}
          className="w-full bg-transparent outline-none text-[14px]"
        />
      </div>
      {errorsData?.map((item: ErrorItem) => (
        <div
          key={item.id}
          className={`flex items-center gap-[4px] ${
            item.status
              ? "text-myRed"
              : input
              ? "text-myGreen"
              : "text-[#6C757D]"
          }`}
        >
          <FaCheck className="text-[12px]" />
          <p className="text-[10px]">{item.error}</p>
        </div>
      ))}
    </div>
  );
}
