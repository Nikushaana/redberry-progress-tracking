"use client";

import React, { useContext, useEffect, useState } from "react";
import { BsXLg } from "react-icons/bs";
import Input1 from "../input/input1";
import Button1 from "../buttons/button1";
import Button2 from "../buttons/button2";
import InputDropDown from "../input/inputDropDown";
import { SharedStates } from "../../../../dataFetchs/sharedStates";
import useDepartments from "../../../../dataFetchs/useDepartments";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import InputAvatar from "../input/inputAvatar";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useEmployees from "../../../../dataFetchs/useEmployees";

export default function AddEmployeeModal() {
  const { addEmployeeModalStatus, setAddEmployeeModalStatus } =
    useContext(SharedStates);
  const { departmentsData } = useDepartments();
  const { fetchEmployees } = useEmployees();

  const [addEmployeeValues, setAddEmployeeValues] = useState<EmployeeValues>({
    name: "",
    surname: "",
    avatar: null,
    department_id: null,
  });

  const [errors, setErrors] = useState<AddEmployeeValidationErrors>({});
  const [addEmployeeModalLoader, setAddEmployeeModalLoader] =
    useState<boolean>(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("სახელი აუცილებელია")
      .matches(/^[A-Za-zა-ჰ]+$/, "მარტო ლათინური და ქართული სიმბოლოები")
      .min(2, "მინიმუმ 2 სიმბოლო")
      .max(255, "მაქსიმუმ 255 სიმბოლო"),

    surname: Yup.string()
      .required("გვარი აუცილებელია")
      .matches(/^[A-Za-zა-ჰ]+$/, "მარტო ლათინური და ქართული სიმბოლოები")
      .min(2, "მინიმუმ 2 სიმბოლო")
      .max(255, "მაქსიმუმ 255 სიმბოლო"),

    avatar: Yup.mixed<File>()
      .required("ავატარი აუცილებელია")
      .test(
        "fileSize",
        "მაქსიმუმ 600kb ზომაში",
        (value) => value && value.size <= 600 * 1024
      )
      .test(
        "fileType",
        "უნდა იყოს სურათის ტიპის",
        (value) =>
          value &&
          ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
            value.type
          )
      ),

    department_id: Yup.mixed().required("დეპარტამენტი აუცილებელია"),
  });

  useEffect(() => {
    validationSchema
      .validate(addEmployeeValues, { abortEarly: false })
      .then(() => {
        setErrors({});
      })
      .catch((err: Yup.ValidationError) => {
        const newErrors: AddEmployeeValidationErrors = {};
        err.inner.forEach((error: Yup.ValidationError) => {
          newErrors[error.path as keyof AddEmployeeValidationErrors] =
            error.message;
        });
        setErrors(newErrors);
      });
  }, [addEmployeeValues]);

  const HandleAddEmployee = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    if (Object.keys(errors).length === 0) {
      setAddEmployeeModalLoader(true);

      if (addEmployeeValues.department_id) {
        formData.append(
          "department_id",
          String(addEmployeeValues.department_id.id)
        );
      }

      if (addEmployeeValues.avatar) {
        formData.append("avatar", addEmployeeValues.avatar);
      }

      axiosUser
        .post("employees", formData)
        .then((res) => {
          setAddEmployeeModalStatus(false);
          toast.success("თანამშრომელი დაემატა!");
          fetchEmployees();
          console.log({ res });
        })
        .catch((err) => {
          toast.error("ვერ დაემატა!");
          console.log({ err });
        })
        .finally(() => {
          setAddEmployeeModalLoader(false);
        });
    } else {
      toast.warn("შეავსე მონაცემები ვალიდურად!");
    }
  };

  return (
    <div
      className={`w-[100%] h-[100%] fixed top-0 left-0 items-center justify-center ${
        addEmployeeModalStatus ? "flex z-50" : "hidden"
      }`}
    >
      <div
        onClick={() => {
          setAddEmployeeModalStatus(false);
        }}
        className="w-full h-full backdrop-blur-[4px] bg-[#0D0F1026]"
      ></div>
      <form
        onSubmit={HandleAddEmployee}
        encType="multipart/form-data"
        className="bg-white absolute rounded-[10px] pt-[40px] pb-[60px] px-[50px]"
      >
        <div
          onClick={() => {
            setAddEmployeeModalStatus(false);
          }}
          className="w-[40px] aspect-square place-self-end rounded-full  bg-[#DEE2E6] text-white flex items-center justify-center cursor-pointer text-[23px]"
        >
          <BsXLg />
        </div>
        <h1 className="text-[32px] text-center mt-[37px]">
          თანამშრომლის დამატება
        </h1>
        <div
          className={`grid grid-cols-2 gap-[45px] w-[813px] mt-[45px] duration-75 ${
            addEmployeeModalLoader && "pointer-events-none opacity-[0.5]"
          }`}
        >
          <Input1
            title="სახელი*"
            name="name"
            setValue={setAddEmployeeValues}
            errorsData={[
              {
                id: 1,
                status: errors.name === "მინიმუმ 2 სიმბოლო",
                error: "მინიმუმ 2 სიმბოლო",
              },
              {
                id: 2,
                status: errors.name === "მაქსიმუმ 255 სიმბოლო",
                error: "მაქსიმუმ 255 სიმბოლო",
              },
              {
                id: 3,
                status: errors.name === "მარტო ლათინური და ქართული სიმბოლოები",
                error: "მარტო ლათინური და ქართული სიმბოლოები",
              },
            ]}
            render={addEmployeeModalStatus === false}
          />
          <Input1
            title="გვარი*"
            name="surname"
            setValue={setAddEmployeeValues}
            errorsData={[
              {
                id: 1,
                status: errors.surname === "მინიმუმ 2 სიმბოლო",
                error: "მინიმუმ 2 სიმბოლო",
              },
              {
                id: 2,
                status: errors.surname === "მაქსიმუმ 255 სიმბოლო",
                error: "მაქსიმუმ 255 სიმბოლო",
              },
              {
                id: 3,
                status:
                  errors.surname === "მარტო ლათინური და ქართული სიმბოლოები",
                error: "მარტო ლათინური და ქართული სიმბოლოები",
              },
            ]}
            render={addEmployeeModalStatus === false}
          />
          <div className="col-span-2">
            <InputAvatar
              title="ავატარი*"
              name="avatar"
              setValue={setAddEmployeeValues}
              errorsData={[
                {
                  id: 1,
                  status: errors.avatar === "ავატარი აუცილებელია",
                  error: "ავატარი აუცილებელია",
                },
                {
                  id: 2,
                  status: errors.avatar === "მაქსიმუმ 600kb ზომაში",
                  error: "მაქსიმუმ 600kb ზომაში",
                },
              ]}
              render={addEmployeeModalStatus === false}
            />
          </div>
          <InputDropDown
            title="დეპარტამენტი*"
            data={departmentsData}
            name="department_id"
            setValue={setAddEmployeeValues}
            errorsData={[
              {
                id: 1,
                status: errors.department_id === "დეპარტამენტი აუცილებელია",
                error: "დეპარტამენტი აუცილებელია",
              },
            ]}
            render={addEmployeeModalStatus === false}
          />
        </div>
        <div className="mt-[25px] flex items-center place-self-end gap-[22px] ">
          <Button1
            text="გაუქმება"
            action={() => {
              setAddEmployeeModalStatus(false);
            }}
          />
          <Button2
            text="დაამატე თანამშრომელი"
            button={true}
            loader={addEmployeeModalLoader}
          />
        </div>
      </form>
    </div>
  );
}
