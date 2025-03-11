import TaskCard from "./components/card/taskCard";

export default function Page() {
  return (
    <div className="px-[118px] pt-[40px] pb-[140px] flex flex-col gap-y-[]">
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
        {[1, 2, 3, 4].map((item: number) => (
          <div key={item} className="flex flex-col gap-y-[30px]">
            <h2 className="bg-myYellow w-full h-[54px] flex items-center justify-center rounded-[10px] text-white text-[20px]">
              დასაწყები
            </h2>
            {[1, 2, 3, 4].map((item1: number) => (
              <TaskCard key={item1} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
