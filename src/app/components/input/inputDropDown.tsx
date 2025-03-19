"use client";

import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { GoChevronDown, GoPlusCircle } from "react-icons/go";
import { SharedStates } from "../../../../dataFetchs/sharedStates";

export default function InputDropDown({
  title,
  data,
  name,
  setValue,
  defaultValue,
  errorsData,
  render,
  disabled,
  addEmployeeButton,
}: InputDropDownType) {
  const DropDownRef = useRef<HTMLDivElement>(null);
  const { setAddEmployeeModalStatus } = useContext(SharedStates);
  const [droped, setDroped] = useState<boolean>(false);
  const [pickedInput, setPickedInput] =
    useState<PickedInputDropDownType | null>(null);

  useEffect(() => {
    if (render) {
      setPickedInput(null);
    }
  }, [render]);

  useEffect(() => {
    if (defaultValue) {
      const foundItem = data.find(
        (item: PickedInputDropDownType) => item.id == defaultValue
      );

      setPickedInput(foundItem || null);
    }
  }, [defaultValue, data]);

  useEffect(() => {
    if (setValue) {
      setValue((prev: object) => ({
        ...prev,
        [name]: pickedInput,
      }));
    }
  }, [pickedInput]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      DropDownRef.current &&
      !DropDownRef.current.contains(event.target as Node)
    ) {
      setDroped(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col gap-y-[6px]">
      {title && <h2 className="text-[14px]">{title}</h2>}
      <div ref={DropDownRef} className={`relative w-full`}>
        <div
          onClick={() => {
            setDroped((prev) => !prev);
          }}
          className={`px-[10px] w-full h-[42px] flex items-center justify-between border-[1px] bg-white select-none cursor-pointer ${
            droped
              ? "rounded-t-[5px] border-[#CED4DA] border-b-transparent"
              : "rounded-[5px] border-[#CED4DA]"
          } ${disabled && "pointer-events-none opacity-[0.3]"}`}
        >
          <div className="flex items-center">
            {pickedInput?.icon && (
              <div className="relative h-[18px] w-[18px] mr-[6px]">
                <Image
                  src={pickedInput?.icon}
                  alt=""
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
            )}
            {pickedInput?.avatar && (
              <div className="relative h-[28px] w-[28px] mr-[6px] rounded-full overflow-hidden">
                <Image
                  src={pickedInput?.avatar}
                  alt=""
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
            <p className="text-[14px]">
              {pickedInput?.name} {pickedInput?.surname && pickedInput?.surname}
            </p>
          </div>
          <GoChevronDown
            className={`duration-200 ${droped && "rotate-[180deg]"}`}
          />
        </div>
        <div
          style={{
            height: droped
              ? data.length < 4
                ? addEmployeeButton
                  ? data.length * 42 + 45
                  : data.length * 42 + 3
                : addEmployeeButton
                ? 213
                : 171
              : 0,
          }}
          className={`bg-white w-full border-[#CED4DA] duration-75 absolute top-[42px] left-0 z-[2] showyScroll ${
            droped
              ? `rounded-b-[5px] border-[1px] border-t-0 ${
                  data.length > 4 && "overflow-y-scroll"
                }`
              : "overflow-hidden"
          }`}
        >
          {addEmployeeButton && (
            <div
              onClick={() => {
                setAddEmployeeModalStatus(true);
              }}
              className="h-[42px] px-[10px] flex items-center gap-[8px] cursor-pointer text-BrightViolet hover:bg-[#F8F9FA] duration-75"
            >
              <GoPlusCircle className="text-[18px]" />
              <h2>დაამატე თანამშრომელი</h2>
            </div>
          )}
          {data?.map((item: PickedInputDropDownType) => (
            <div
              key={item.id}
              onClick={() => {
                setPickedInput((prev: PickedInputDropDownType | null) =>
                  prev?.id === item.id ? null : item
                );
                setDroped(false);
              }}
              className={`px-[10px] w-full h-[42px] flex items-center cursor-pointer hover:bg-[#F8F9FA] duration-75 ${
                pickedInput?.id === item.id && "bg-[#F8F9FA]"
              }`}
            >
              {item.icon && (
                <div className="relative h-[18px] w-[18px] mr-[6px]">
                  <Image
                    src={item.icon}
                    alt=""
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
              {item.avatar && (
                <div className="relative h-[28px] w-[28px] mr-[6px] rounded-full overflow-hidden">
                  <Image
                    src={item.avatar}
                    alt=""
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
              <p className="text-[14px]">
                {item.name} {item.surname && item.surname}
              </p>
            </div>
          ))}
        </div>
      </div>
      {errorsData?.map((item: ErrorItem) => (
        <div
          key={item.id}
          className={`flex items-center gap-[4px] ${
            item.status
              ? "text-myRed"
              : pickedInput
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
