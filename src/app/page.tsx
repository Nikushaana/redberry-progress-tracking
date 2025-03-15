"use client";

import useTasks from "../../dataFetchs/useTasks";
import TaskCard from "./components/card/taskCard";

export default function Page() {
  const { tasksData, tasksLoader } = useTasks();

  return (
    <div className="px-[118px] pt-[40px] pb-[140px] flex flex-col">
      <h1 className="text-[34px]">დავალებების გვერდი</h1>
      <div className="mt-[52px] flex items-center gap-[45px] rounded-[10px] border-[1px] border-[#DEE2E6] h-[44px] self-start">
        <p className="w-[200px] h-full flex items-center justify-center">
          დეპარტამენტო
        </p>
        <p className="w-[200px] h-full flex items-center justify-center">
          პრიორიტეტი
        </p>
        <p className="w-[200px] h-full flex items-center justify-center">
          თანამშრომელი
        </p>
      </div>
      <div className="mt-[79px] grid grid-cols-4 gap-[52px]">
        {tasksData?.map((item: Task, index: number) => (
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
              ? [1, 2, 3].map((item3: number) => (
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
    </div>
  );
}
