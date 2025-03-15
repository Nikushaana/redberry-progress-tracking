"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";

export default function InputTextarea({
  title,
  name,
  setValue,
  defaultValue,
  errorsData,
  render,
  placeholder,
  Button,
  loader,
}: Input1Type) {
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    if (defaultValue) {
      setInput(defaultValue);
    }
  }, [defaultValue]);

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

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const InputValue = event.target.value;

    setInput(InputValue);
  };

  return (
    <div className="flex flex-col gap-y-[6px]">
      {title && <h2 className="text-[14px]">{title}</h2>}
      <div
        className={`border-[1px] flex items-center bg-white h-[135px] w-full p-[10px] ${
          input && errorsData?.find((item1: ErrorItem) => item1.status === true)
            ? "border-myRed"
            : "border-[#CED4DA]"
        } ${Button ? "rounded-[10px] relative" : "rounded-[5px]"}`}
      >
        <textarea
          name={name}
          value={input}
          placeholder={placeholder}
          onChange={handleInputChange}
          className="w-full h-full outline-none text-[14px] resize-none showyScroll"
        />
        {Button && (
          <p
            onClick={Button}
            className={`bg-BrightViolet text-white flex items-center gap-[10px] z-[1] h-[35px] px-[20px] absolute bottom-[10px] right-[10px] rounded-full ${
              loader ? "pointer-events-none opacity-[0.5]" : "cursor-pointer "
            }`}
          >
            {loader && <BiLoaderAlt className="animate-spin" />} დააკომენტარე
          </p>
        )}
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
