"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";

export default function InputAvatar({
  title,
  name,
  setValue,
  errorsData,
  render,
}: InputAvatarType) {
  const [avatar, setAvatar] = useState<File | null>(null);
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (render) {
      setAvatar(null);
    }
  }, [render]);

  useEffect(() => {
    if (setValue) {
      setValue((prev: object) => ({
        ...prev,
        [name]: avatar,
      }));
    }
  }, [avatar]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setAvatar(event.target.files[0]);
    }
  };

  const removePhoto = () => {
    setAvatar(null);
  };

  return (
    <div className="flex flex-col gap-y-[6px] w-full">
      <h2 className="text-[14px]">{title}</h2>
      <div
        className={`rounded-[8px] border-[1px] border-dashed border-[#CED4DA] flex flex-col items-center
           justify-center h-[120px] w-full ${
             avatar &&
             errorsData.find((item1: ErrorItem) => item1.status === true)
               ? "border-myRed"
               : "border-[#CED4DA]"
           }`}
      >
        {avatar ? (
          <div className="relative w-[88px] aspect-square">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src={URL.createObjectURL(avatar)}
                alt={avatar.name}
                sizes="500px"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div
              onClick={removePhoto}
              className="absolute bottom-[-2px] right-[-2px] z-[2] w-[24px] bg-white aspect-square rounded-full border-[1px] border-[#6C757D] flex items-center justify-center cursor-pointer"
            >
              <LuTrash2 />
            </div>
          </div>
        ) : (
          <div
            onClick={() => inputElement.current?.click()}
            className="flex flex-col items-center gap-y-[5px] cursor-pointer"
          >
            <div className="relative h-[28px] w-[34px]">
              <Image
                src="/images/gallery-export.png"
                alt=""
                fill
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
            <p className="text-[14px]">ატვირთე ფოტო</p>
            <input
              ref={inputElement}
              type="file"
              name={name}
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
              multiple={false}
            />
          </div>
        )}
      </div>
      {errorsData.map((item: ErrorItem) => (
        <div
          key={item.id}
          className={`flex items-center gap-[4px] ${
            item.status
              ? "text-myRed"
              : avatar
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
