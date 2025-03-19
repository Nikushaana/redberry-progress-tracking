"use client";

import { useContext } from "react";
import TaskCard from "./components/card/taskCard";
import TasksFilterModal from "./components/modals/tasksFilterModal";
import { Tasks } from "../../dataFetchs/useTasks";

export default function Page() {
  const { tasksDataWithTitle, tasksData, tasksLoader } = useContext(Tasks);

  return (
    <div className="px-[118px] pt-[40px] pb-[140px] flex flex-col min-h-[calc(100vh-99px)]">
      <h1 className="text-[34px]">დავალებების გვერდი</h1>
      <TasksFilterModal />
      <div className="mt-[79px] grid grid-cols-4 gap-[52px]">
        {tasksDataWithTitle?.map((item: Task, index: number) => (
          <div key={index} className="flex flex-col gap-y-[30px]">
            <h2
              className={`w-full h-[54px] flex items-center justify-center rounded-[10px] text-white text-[20px]
                ${
                  item.status === "დასაწყები"
                    ? "bg-myYellow"
                    : item.status === "პროგრესში"
                    ? "bg-myOrange"
                    : item.status === "მზად ტესტირებისთვის"
                    ? "bg-myPink"
                    : item.status === "დასრულებული" && "bg-myBlue"
                }`}
            >
              {item.status}
            </h2>
            {tasksLoader
              ? [1, 2].map((item3: number) => (
                  <div
                    key={item3}
                    className="h-[300px] w-full rounded-[15px] overflow-hidden"
                  >
                    <div className="wave"></div>
                  </div>
                ))
              : item.tasks.map((item1: TaskItem, index: number) => (
                  <TaskCard key={index} data={item1} />
                ))}
          </div>
        ))}
      </div>
      {tasksData.length < 1 && tasksLoader == false && (
        <p className="text-center mt-[100px] text-[18px] text-gray-500 select-none">
          დავალებები დამატებული არ არის
        </p>
      )}
    </div>
  );
}
