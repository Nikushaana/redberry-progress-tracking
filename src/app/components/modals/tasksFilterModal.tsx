"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import useDepartments from "../../../../dataFetchs/useDepartments";
import usePriorities from "../../../../dataFetchs/usePriorities";
import { Employees } from "../../../../dataFetchs/useEmployees";
import { FiCheck } from "react-icons/fi";
import Button3 from "../buttons/button3";
import { Tasks } from "../../../../dataFetchs/useTasks";
import { BsXLg } from "react-icons/bs";
import { usePathname } from "next/navigation";

export default function TasksFilterModal() {
  const pathname = usePathname();
  const DropFilterRef = useRef<HTMLDivElement>(null);
  const { departmentsData } = useDepartments();
  const { prioritiesData } = usePriorities();

  const {
    filteredItems,
    setFilteredItems,
    filteredItemsFromParams,
    HandleSetInParams,
    dropedFilterComponent,
    setDropedFilterComponent,
    FilterTasks,
  } = useContext(Tasks);
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

  const handleClickOutside = (event: MouseEvent) => {
    if (
      DropFilterRef.current &&
      !DropFilterRef.current.contains(event.target as Node)
    ) {
      setDropedFilterComponent("");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleDeleteFilter = (name: string, value?: string | number) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (name === "departments") {
      const updatedDepartments = filteredItemsFromParams.departments.filter(
        (Department) => Department !== value
      );
      setFilteredItems((prev) => ({
        ...prev,
        departments: updatedDepartments,
      }));
      if (updatedDepartments.length > 0) {
        searchParams.set("departments", updatedDepartments.join(","));
      } else {
        searchParams.delete("departments");
      }
    }
    if (name === "priorities") {
      const updatedPriorities = filteredItemsFromParams.priorities.filter(
        (Department) => Department !== value
      );
      setFilteredItems((prev) => ({
        ...prev,
        priorities: updatedPriorities,
      }));
      if (updatedPriorities.length > 0) {
        searchParams.set("priorities", updatedPriorities.join(","));
      } else {
        searchParams.delete("priorities");
      }
    }
    if (name === "employees") {
      setFilteredItems((prev) => ({
        ...prev,
        employees: "",
      }));
      searchParams.delete("employees");
    }
    if (name === "allFilter") {
      setFilteredItems({
        departments: [],
        priorities: [],
        employees: "",
      });
      searchParams.set("departments", "");
      searchParams.set("priorities", "");
      searchParams.set("employees", "");
    }

    FilterTasks();

    if (pathname === "/") {
      window.history.replaceState(
        null,
        "/",
        `${pathname}?${searchParams.toString()}`
      );
    }
  };

  return (
    <div className="flex flex-col">
      <div
        ref={DropFilterRef}
        className="relative mt-[52px] flex items-center gap-[45px] rounded-[10px] border-[1px] border-[#DEE2E6] h-[44px] self-start shrink-0"
      >
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
              {item.data && item.data.length < 1 ? (
                <p className="text-center text-[15px] text-gray-500 select-none">
                  {item.title}ს ინფორმაცია არ არსებობს
                </p>
              ) : (
                <>
                  <div
                    style={{
                      height: item.data
                        ? item.data?.length > 4
                          ? 161
                          : item.data?.length * 24 +
                            (item.data?.length - 1) * 22
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
                          className={`w-[22px] aspect-square rounded-[6px] border-[1.5px] border-BrightViolet flex items-center justify-center duration-100 ${
                            item.titleEng === "employees"
                              ? filteredItems.employees == String(item1.id)
                                ? "text-BrightViolet"
                                : "text-transparent"
                              : filteredItems[item.titleEng].includes(item1.id)
                              ? "text-BrightViolet"
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
                      HandleSetInParams(item.titleEng);
                    }}
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="min-h-[29px] mt-[25px] ">
        {(filteredItemsFromParams.departments.length > 0 ||
          filteredItemsFromParams.priorities.length > 0 ||
          filteredItemsFromParams.employees) && (
          <div className="flex flex-wrap items-center gap-[16px]">
            {filteredItemsFromParams.departments.length > 0 &&
              filteredItemsFromParams.departments.map((item) => (
                <div
                  key={item}
                  className="h-[29px] px-[10px] flex items-center gap-[4px] cursor-pointer text-[14px] border-[1px] border-[#CED4DA] rounded-full"
                >
                  {departmentsData.find((item1) => item1.id == item)?.name}
                  <BsXLg
                    onClick={() => {
                      handleDeleteFilter("departments", item);
                    }}
                    className="text-[12px] h-full"
                  />
                </div>
              ))}
            {filteredItemsFromParams.priorities.length > 0 &&
              filteredItemsFromParams.priorities.map((item) => (
                <div
                  key={item}
                  className="h-[29px] px-[10px] flex items-center gap-[4px] cursor-pointer text-[14px] border-[1px] border-[#CED4DA] rounded-full"
                >
                  {prioritiesData.find((item2) => item2.id == item)?.name}
                  <BsXLg
                    onClick={() => {
                      handleDeleteFilter("priorities", item);
                    }}
                    className="text-[12px] h-full"
                  />
                </div>
              ))}
            {filteredItemsFromParams.employees && (
              <div className="h-[29px] px-[10px] flex items-center gap-[4px] cursor-pointer text-[14px] border-[1px] border-[#CED4DA] rounded-full">
                {employeesData.find(
                  (item3) =>
                    item3.id == Number(filteredItemsFromParams.employees)
                )?.name +
                  " " +
                  employeesData.find(
                    (item3) =>
                      item3.id == Number(filteredItemsFromParams.employees)
                  )?.surname}
                <BsXLg
                  onClick={() => {
                    handleDeleteFilter(
                      "employees",
                      filteredItemsFromParams.employees
                    );
                  }}
                  className="text-[12px] h-full"
                />
              </div>
            )}
            <p
              onClick={() => {
                handleDeleteFilter("allFilter");
              }}
              className="cursor-pointer text-[14px]"
            >
              გასუფთავება
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
