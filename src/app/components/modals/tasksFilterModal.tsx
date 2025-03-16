"use client";

import React, { useContext, useEffect, useState } from "react";
import useTasks from "../../../../dataFetchs/useTasks";
import { HiOutlineChevronDown } from "react-icons/hi";
import useDepartments from "../../../../dataFetchs/useDepartments";
import usePriorities from "../../../../dataFetchs/usePriorities";
import { Employees } from "../../../../dataFetchs/useEmployees";
import { FiCheck } from "react-icons/fi";
import Button3 from "../buttons/button3";

export default function TasksFilterModal() {
  const { departmentsData } = useDepartments();
  const { prioritiesData } = usePriorities();
  const {
    filteredItems,
    setFilteredItems,
    HandleSetInParams,
    dropedFilterComponent,
    setDropedFilterComponent,
  } = useTasks();
  const { employeesData } = useContext(Employees);

  const [filterAllComponents, setFilterAllComponents] = useState<
    FilterComponent[]
  >([
    {
      id: 1,
      title: "დეპარტამენტი",
      titleEng: "departments",
      data: departmentsData,
    },
    {
      id: 2,
      title: "პრიორიტეტი",
      titleEng: "priorities",
      data: prioritiesData,
    },
    {
      id: 3,
      title: "თანამშრომელი",
      titleEng: "employees",
      data: employeesData,
    },
  ]);

  useEffect(() => {
    setFilterAllComponents([
      {
        id: 1,
        title: "დეპარტამენტი",
        titleEng: "departments",
        data: departmentsData,
      },
      {
        id: 2,
        title: "პრიორიტეტი",
        titleEng: "priorities",
        data: prioritiesData,
      },
      {
        id: 3,
        title: "თანამშრომელი",
        titleEng: "employees",
        data: employeesData,
      },
    ]);
  }, [departmentsData, employeesData, prioritiesData, dropedFilterComponent]);

  // get from params
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const departmentsFromParams = searchParams.get("departments");
    const prioritiesFromParams = searchParams.get("priorities");
    const employeesFromParams = searchParams.get("employees");

    setFilteredItems((prev) => ({
      ...prev,

      departments: departmentsFromParams
        ? departmentsFromParams
            .split(",")
            .map(Number)
            .filter((n) => !isNaN(n))
        : [],
      priorities: prioritiesFromParams
        ? prioritiesFromParams
            .split(",")
            .map(Number)
            .filter((n) => !isNaN(n))
        : [],
      employees: employeesFromParams ? employeesFromParams : "",
    }));
  }, []);
  // get from params

  const handleCheckFilterValues = (
    item: FilterComponent,
    item1: PickedInputDropDownType
  ) => {
    setFilteredItems((prev: FilterItems) => ({
      ...prev,
      [item.titleEng]:
        item.titleEng === "employees"
          ? prev.employees == String(item1.id)
            ? ""
            : item1.id
          : prev[item.titleEng].includes(item1.id)
          ? prev[item.titleEng].filter((value) => value !== item1.id)
          : [...prev[item.titleEng], item1.id],
    }));
  };

  return (
    <div className="relative mt-[52px] flex items-center gap-[45px] rounded-[10px] border-[1px] border-[#DEE2E6] h-[44px] self-start">
      {filterAllComponents.map((item) => (
        <div key={item.id} className="">
          <div
            onClick={() => {
              setDropedFilterComponent((prev: string) =>
                prev == item.title ? "" : item.title
              );
            }}
            className={`px-[18px] flex items-center justify-center gap-[8px] cursor-pointer ${
              dropedFilterComponent == item.title && "text-BrightViolet"
            }`}
          >
            <p className="h-full flex items-center justify-center">
              {item.title}
            </p>
            <HiOutlineChevronDown
              className={`duration-200 ${
                dropedFilterComponent == item.title && "rotate-[180deg]"
              }`}
            />
          </div>
          <div
            className={`bg-white border-[0.3px] border-BrightVioletHover flex flex-col gap-y-[25px] 
          rounded-[10px] px-[30px] pt-[40px] pb-[20px] absolute left-0 w-full ${
            dropedFilterComponent == item.title
              ? "top-[50px] z-[10]"
              : "z-[-1] opacity-0 top-[40px]"
          }`}
          >
            <div
              style={{
                height: item.data
                  ? item.data?.length > 4
                    ? 161
                    : item.data?.length * 24 + (item.data?.length - 1) * 22
                  : 0,
              }}
              className={`flex flex-col gap-y-[22px] showyScroll ${
                item.data && item.data?.length > 4 && "overflow-y-scroll"
              }`}
            >
              {item.data?.map((item1: PickedInputDropDownType) => (
                <div
                  key={item1.id}
                  onClick={() => {
                    handleCheckFilterValues(item, item1);
                  }}
                  className="flex items-center gap-[15px] cursor-pointer"
                >
                  <div
                    className={`w-[22px] aspect-square rounded-[6px] border-[1.5px] border-black flex items-center justify-center duration-100 ${
                      item.titleEng === "employees"
                        ? filteredItems.employees == String(item1.id)
                          ? "text-black"
                          : "text-transparent"
                        : filteredItems[item.titleEng].includes(item1.id)
                        ? "text-black"
                        : "text-transparent"
                    }`}
                  >
                    <FiCheck />
                  </div>
                  <p className="text-[16px]">
                    {item1.name} {item1?.surname && item1?.surname}
                  </p>
                </div>
              ))}
            </div>

            <Button3
              text="არჩევა"
              action={() => {
                HandleSetInParams();
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
