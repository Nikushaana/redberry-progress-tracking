import Image from "next/image";
import React from "react";
import moment from "moment";
import "moment/locale/ka";
import { useRouter } from "next/navigation";
import PriorityAndDepartment from "../priorityAndDepartment/PriorityAndDepartment";

export default function TaskCard({ data }: Taskcard) {
  const router = useRouter();
  moment.locale("ka");

  return (
    <div
      onClick={() => {
        router.push(`/task/${data?.id}`);
      }}
      className={`rounded-[15px] border-[1px] p-[20px] flex flex-col gap-y-[28px] cursor-pointer ${
        data?.status.name === "დასაწყები"
          ? "border-myYellow"
          : data?.status.name === "პროგრესში"
          ? "border-myOrange"
          : data?.status.name === "მზად ტესტირებისთვის"
          ? "border-myPink"
          : data?.status.name === "დასრულებული" && "border-myBlue"
      }`}
    >
      <div className="flex items-center justify-between">
        <PriorityAndDepartment data={data} small={true} />
        <p className="text-[12px]">
          {moment(data?.due_date).format("DD MMMM YYYY")}
        </p>
      </div>
      <div className="px-[10px] flex flex-col gap-y-[12px]">
        <h1 className="text-[15px]">{data?.name}</h1>
        <p className="text-[14px] text-[#343A40] break-all">
          {data?.description && data?.description.length > 100
            ? `${data?.description.slice(0, 100)}..`
            : data?.description}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="relative h-[31px] aspect-square rounded-full overflow-hidden">
          {data?.employee.avatar && (
            <Image
              src={data?.employee.avatar}
              alt=""
              fill
              style={{
                objectFit: "cover",
              }}
            />
          )}
        </div>
        <div className="flex items-center gap-[4px]">
          <div className="relative h-[22px] aspect-square">
            <Image
              src="/images/Comments.png"
              alt=""
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <p className="text-[14px]">{data?.total_comments}</p>
        </div>
      </div>
    </div>
  );
}
