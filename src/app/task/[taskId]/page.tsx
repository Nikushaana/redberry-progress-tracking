"use client";

import React, { use, useEffect, useState } from "react";
import { axiosUser } from "../../../../dataFetchs/AxiosToken";
import PriorityAndDepartment from "@/app/components/priorityAndDepartment/PriorityAndDepartment";
import { LuChartPie } from "react-icons/lu";
import InputDropDown from "@/app/components/input/inputDropDown";
import useStatus from "../../../../dataFetchs/useStatus";
import { GoPerson } from "react-icons/go";
import Image from "next/image";
import { MdOutlineCalendarToday } from "react-icons/md";
import moment from "moment";
import InputTextarea from "@/app/components/input/inputTextarea";
import { PiArrowBendUpLeftFill } from "react-icons/pi";
import { BiLoaderAlt } from "react-icons/bi";

export default function Page({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { statusData } = useStatus();
  moment.locale("ka");
  const { taskId } = use(params);

  //  get single task data
  const [singleTaskData, setSingleTaskData] = useState<TaskItem | null>(null);

  useEffect(() => {
    axiosUser
      .get(`tasks/${taskId}`)
      .then((res) => {
        setSingleTaskData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, [taskId]);
  //  get single task data

  //  update single task status
  const [singleTaskStatusValue, setSingleTaskStatusValue] =
    useState<SingleTaskStatusValues>({
      status_id: null,
    });

  useEffect(() => {
    if (
      singleTaskStatusValue?.status_id?.id &&
      singleTaskData?.status?.id &&
      singleTaskStatusValue?.status_id?.id !== singleTaskData?.status?.id
    ) {
      axiosUser
        .put(`tasks/${taskId}`, {
          status_id: singleTaskStatusValue?.status_id?.id,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    }
  }, [taskId, singleTaskData?.status?.id, singleTaskStatusValue]);
  //  update single task status

  //  get single task comments data
  const [singleTaskCommentsData, setSingleTaskCommentsData] = useState<
    SingleTaskComment[] | null
  >(null);

  const [singleTaskCommentsRender, setSingleTaskCommentsRender] =
    useState<string>("");

  const [singleTaskCommentsLoader, setSingleTaskCommentsLoader] =
    useState<boolean>(true);

  useEffect(() => {
    setSingleTaskCommentsLoader(true);
    axiosUser
      .get(`tasks/${taskId}/comments`)
      .then((res) => {
        setSingleTaskCommentsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSingleTaskCommentsLoader(false);
      });
  }, [taskId, singleTaskCommentsRender]);
  //  get single task comments data

  //  create single task comment
  const [singleTaskCommentValue, setSingleTaskCommentValue] =
    useState<SingleTaskCommentValues>({
      text: "",
      parent_id: null,
    });

  const [createSingleTaskCommentLoader, setCreateSingleTaskCommentLoader] =
    useState<boolean>(false);

  const HandleCreateSingleTaskComment = () => {
    if (singleTaskCommentValue?.text) {
      setCreateSingleTaskCommentLoader(true);
      setSingleTaskCommentsLoader(true);
      axiosUser
        .post(`tasks/${taskId}/comments`, {
          text: singleTaskCommentValue?.text,
          parent_id: singleTaskCommentValue?.parent_id || null,
        })
        .then((res) => {
          setSingleTaskCommentsRender(`${res}`);
          setSingleTaskCommentValue((prev: SingleTaskCommentValues) => ({
            ...prev,
            parent_id: null,
          }));
        })
        .catch((err) => {
          setSingleTaskCommentsLoader(false);
          console.log(err);
        })
        .finally(() => {
          setCreateSingleTaskCommentLoader(false);
        });
    }
  };
  //  create single task comment

  return (
    <div className="px-[118px] pt-[40px] pb-[140px] flex flex-col">
      <PriorityAndDepartment data={singleTaskData} />

      <div className="flex gap-[50px] mt-[12px]">
        <div className="w-[calc(100%-791px)]">
          <h1 className="text-[34px]">{singleTaskData?.name}</h1>
          <p className="text-[18px] mt-[26px]">{singleTaskData?.description}</p>
          <h1 className="text-[24px] mt-[63px]">დავალების დეტალები</h1>
          <div className="mt-[18px] grid grid-cols-2 w-[530px] text-[#474747]">
            <div className="flex items-center gap-[6px] h-[70px]">
              <LuChartPie className="text-[24px] w-[24px] flex items-center justify-center" />
              <p>სტატუსი</p>
            </div>
            <div className="h-[70px]">
              <InputDropDown
                data={statusData}
                name="status_id"
                setValue={setSingleTaskStatusValue}
                defaultValue={singleTaskData?.status.id}
              />
            </div>
            <div className="flex items-center gap-[6px] h-[70px]">
              <GoPerson className="text-[24px] w-[24px] flex items-center justify-center" />
              <p>თანამშრომელი</p>
            </div>
            <div className="flex items-center gap-[12px] h-[70px]">
              <div className="relative h-[32px] aspect-square rounded-full overflow-hidden">
                {singleTaskData?.employee.avatar && (
                  <Image
                    src={singleTaskData?.employee.avatar}
                    alt=""
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
              <p className="text-[14px] flex items-center relative w-[calc(100%-44px)]">
                {singleTaskData?.employee.name +
                  " " +
                  singleTaskData?.employee.surname}{" "}
                <span className="absolute left-0 top-[-15px] text-[11px] w-full shrink-0 text-[#474747]">
                  {singleTaskData?.department.name}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-[6px] h-[70px]">
              <MdOutlineCalendarToday className="text-[24px] w-[24px] flex items-center justify-center" />
              <p>დავალების ვადა</p>
            </div>
            <div className="flex items-center h-[70px]">
              <p className="text-[14px]">
                {moment(singleTaskData?.due_date).format("dddd - DD/MM/YYYY")}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#DDD2FF] rounded-[10px] self-start py-[40px] px-[45px] w-[741px]">
          <InputTextarea
            name="text"
            setValue={setSingleTaskCommentValue}
            placeholder="დაწერე კომენტარი"
            render={singleTaskCommentsRender}
            Button={HandleCreateSingleTaskComment}
            loader={createSingleTaskCommentLoader}
          />
          <div className="flex items-center gap-[7px] mt-[66px]">
            <h1 className="text-[20px]">კომენტარი</h1>
            <p className="text-white bg-BrightViolet flex items-center justify-center h-[22px] px-[10px] rounded-[30px] text-[14px]">
              {singleTaskCommentsData?.length || 0}
            </p>
            {singleTaskCommentsLoader && (
              <div>
                <BiLoaderAlt className="animate-spin" />
              </div>
            )}
          </div>

          {singleTaskCommentsData?.map((item: SingleTaskComment) => (
            <div key={item.id} className="flex gap-[12px] mt-[38px]">
              <div className="relative h-[38px] shrink-0 aspect-square rounded-full overflow-hidden">
                {item?.author_avatar && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item?.author_avatar}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col gap-y-[10px]">
                <h1 className="text-[18px]">{item?.author_nickname}</h1>
                <p className="text-[#343A40]">{item?.text}</p>
                <div
                  onClick={() => {
                    setSingleTaskCommentValue(
                      (prev: SingleTaskCommentValues) => ({
                        ...prev,
                        parent_id: item.id === prev.parent_id ? null : item.id,
                      })
                    );
                  }}
                  className={`flex items-center gap-[6px] self-start duration-75 text-BrightViolet border-b-[1px] ${
                    singleTaskCommentValue.parent_id === item.id
                      ? "border-b-BrightViolet"
                      : "border-b-transparent"
                  } cursor-pointer`}
                >
                  <PiArrowBendUpLeftFill />
                  <p className="text-[12px]">უპასუხე</p>
                </div>

                {item?.sub_comments &&
                  item?.sub_comments?.map((item1: SingleTaskComment) => (
                    <div key={item1.id} className="flex gap-[12px] mt-[20px]">
                      <div className="relative h-[38px] shrink-0 aspect-square rounded-full overflow-hidden">
                        {item?.author_avatar && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item?.author_avatar}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex flex-col gap-y-[10px]">
                        <h1 className="text-[18px]">{item?.author_nickname}</h1>
                        <p className="text-[#343A40]">{item?.text}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
