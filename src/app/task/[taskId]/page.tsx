"use client";

import React, { use, useContext, useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import { Tasks } from "../../../../dataFetchs/useTasks";

export default function Page({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { statusData } = useStatus();
  const { fetchTasks } = useContext(Tasks);
  moment.locale("ka");
  const { taskId } = use(params);

  //  get single task data
  const [singleTaskData, setSingleTaskData] = useState<TaskItem | null>(null);
  const [singleTaskLoader, setSingleTaskLoader] = useState<boolean>(true);

  useEffect(() => {
    setSingleTaskLoader(true);
    axiosUser
      .get(`tasks/${taskId}`)
      .then((res) => {
        setSingleTaskData(res.data);
        setSingleTaskLoader(false);
      })
      .catch(() => {})
      .finally(() => {});
  }, [taskId]);
  //  get single task data

  //  update single task status
  const [singleTaskStatusValue, setSingleTaskStatusValue] =
    useState<SingleTaskStatusValues>({
      status_id: null,
    });

  const [singleTaskStatusLoader, setSingleTaskStatusLoader] =
    useState<boolean>(false);

  useEffect(() => {
    if (
      singleTaskStatusValue?.status_id?.id &&
      singleTaskData?.status?.id &&
      singleTaskStatusValue?.status_id?.id !== singleTaskData?.status?.id
    ) {
      setSingleTaskStatusLoader(true);
      axiosUser
        .put(`tasks/${taskId}`, {
          status_id: singleTaskStatusValue?.status_id?.id,
        })
        .then(() => {
          toast.success("სტატუსი შეიცვალა!");
          fetchTasks();
        })
        .catch(() => {
          toast.error("სტატუსი ვერ შეიცვალა!");
        })
        .finally(() => {
          setSingleTaskStatusLoader(false);
        });
    }
  }, [taskId, singleTaskData?.status?.id, singleTaskStatusValue]);
  //  update single task status

  //  get single task comments data
  const [singleTaskCommentsData, setSingleTaskCommentsData] = useState<
    SingleTaskComment[] | []
  >([]);

  const [singleTaskCommentsRender, setSingleTaskCommentsRender] =
    useState<string>("");

  const [singleTaskCommentsLoader, setSingleTaskCommentsLoader] =
    useState<boolean>(true);

  useEffect(() => {
    setSingleTaskCommentsLoader(true);
    axiosUser
      .get(`tasks/${taskId}/comments`)
      .then((res) => {
        setSingleTaskCommentsData(res.data.reverse());
      })
      .catch(() => {})
      .finally(() => {
        setSingleTaskCommentsLoader(false);
      });
  }, [taskId, singleTaskCommentsRender]);
  //  get single task comments data

  //  create single task comment
  const [singleTaskCommentValue, setSingleTaskCommentValue] =
    useState<SingleTaskCommentValues>({
      text: "",
    });

  const [createSingleTaskCommentLoader, setCreateSingleTaskCommentLoader] =
    useState<boolean>(false);

  const HandleCreateSingleTaskComment = () => {
    if (singleTaskCommentValue?.text.trim()) {
      setCreateSingleTaskCommentLoader(true);
      setSingleTaskCommentsLoader(true);
      axiosUser
        .post(`tasks/${taskId}/comments`, {
          text: singleTaskCommentValue?.text,
          parent_id: null,
        })
        .then(() => {
          setSingleTaskCommentsRender(`${new Date()}`);

          fetchTasks();
          toast.success("კომენტარი დაიწერა!");
        })
        .catch(() => {
          setSingleTaskCommentsLoader(false);
          toast.error("კომენტარი ვერ დაემატა!");
        })
        .finally(() => {
          setCreateSingleTaskCommentLoader(false);
        });
    } else {
      toast.warn("დაწერე კომენტარი!");
    }
  };
  //  create single task comment
  //  create single task comment reply

  const [singleTaskCommentReplyValue, setSingleTaskCommentReplyValue] =
    useState<SingleTaskCommentValues>({
      text: "",
      parent_id: null,
    });

  const [
    createSingleTaskCommentReplyLoader,
    setCreateSingleTaskCommentReplyLoader,
  ] = useState<number | null | undefined>(undefined);

  const HandleCreateSingleTaskCommentReply = () => {
    if (singleTaskCommentReplyValue?.text?.trim()) {
      setCreateSingleTaskCommentReplyLoader(
        singleTaskCommentReplyValue?.parent_id
      );
      setSingleTaskCommentsLoader(true);
      axiosUser
        .post(`tasks/${taskId}/comments`, {
          text: singleTaskCommentReplyValue?.text,
          parent_id: singleTaskCommentReplyValue?.parent_id || null,
        })
        .then(() => {
          setSingleTaskCommentsRender(`${new Date()}`);
          setSingleTaskCommentReplyValue((prev: SingleTaskCommentValues) => ({
            ...prev,
            parent_id: null,
          }));
          fetchTasks();
          toast.success("საპასუხო კომენტარი დაიწერა!");
        })
        .catch(() => {
          setSingleTaskCommentsLoader(false);
          toast.error("საპასუხო კომენტარი ვერ დაემატა!");
        })
        .finally(() => {
          setCreateSingleTaskCommentReplyLoader(null);
        });
    } else {
      toast.warn("დაწერე საპასუხო კომენტარი!");
    }
  };

  //  create single task comment reply

  return (
    <div
      className={`px-[118px] pt-[40px] pb-[140px] flex flex-col ${
        singleTaskStatusLoader && "pointer-events-none opacity-[0.5]"
      }`}
    >
      {singleTaskLoader ? (
        <div className="flex items-center gap-[10px]">
          {[1, 2].map((item3: number) => (
            <div
              key={item3}
              className="h-[32px] w-[150px] rounded-[5px] overflow-hidden"
            >
              <div className="wave"></div>
            </div>
          ))}
        </div>
      ) : (
        <PriorityAndDepartment data={singleTaskData} />
      )}
      <div className="flex gap-[50px] mt-[12px]">
        <div className="w-[calc(100%-791px)]">
          {singleTaskLoader ? (
            <div className="h-[60px] w-[350px] rounded-[5px] overflow-hidden">
              <div className="wave"></div>
            </div>
          ) : (
            <h1 className="text-[34px]">{singleTaskData?.name}</h1>
          )}
          {singleTaskLoader ? (
            <div className="h-[200px] w-[600px] rounded-[5px] overflow-hidden mt-[26px]">
              <div className="wave"></div>
            </div>
          ) : (
            <p className="text-[18px] mt-[26px] break-all">
              {singleTaskData?.description}
            </p>
          )}
          <h1 className="text-[24px] mt-[63px]">დავალების დეტალები</h1>
          <div className="mt-[18px] grid grid-cols-2 w-[530px] text-[#474747]">
            <div className="flex items-center gap-[6px] h-[70px]">
              <LuChartPie className="text-[24px] w-[24px] flex items-center justify-center" />
              <p>სტატუსი</p>
            </div>
            <div className="h-[70px]">
              {singleTaskLoader ? (
                <div className="h-[40px] w-full rounded-[5px] overflow-hidden">
                  <div className="wave"></div>
                </div>
              ) : (
                <InputDropDown
                  data={statusData}
                  name="status_id"
                  setValue={setSingleTaskStatusValue}
                  defaultValue={singleTaskData?.status.id}
                />
              )}
            </div>
            <div className="flex items-center gap-[6px] h-[70px]">
              <GoPerson className="text-[24px] w-[24px] flex items-center justify-center" />
              <p>თანამშრომელი</p>
            </div>
            <div className="flex items-center gap-[12px] h-[70px]">
              {singleTaskLoader ? (
                <div className="h-[32px] aspect-square rounded-full overflow-hidden">
                  <div className="wave"></div>
                </div>
              ) : (
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
              )}
              {singleTaskLoader ? (
                <div className="h-[32px] w-[calc(100%-44px)] rounded-[5px] overflow-hidden">
                  <div className="wave"></div>
                </div>
              ) : (
                <p className="text-[14px] flex items-center relative w-[calc(100%-44px)]">
                  {singleTaskData?.employee.name +
                    " " +
                    singleTaskData?.employee.surname}{" "}
                  <span className="absolute left-0 top-[-15px] text-[11px] w-full shrink-0 text-[#474747]">
                    {singleTaskData?.department.name}
                  </span>
                </p>
              )}
            </div>
            <div className="flex items-center gap-[6px] h-[70px]">
              <MdOutlineCalendarToday className="text-[24px] w-[24px] flex items-center justify-center" />
              <p>დავალების ვადა</p>
            </div>
            <div className="flex items-center h-[70px]">
              {singleTaskLoader ? (
                <div className="h-[40px] w-full rounded-[5px] overflow-hidden">
                  <div className="wave"></div>
                </div>
              ) : (
                <p className="text-[14px]">
                  {moment(singleTaskData?.due_date).format("dddd - DD/MM/YYYY")}
                </p>
              )}
            </div>
          </div>
        </div>
        <div
          className={`bg-[#faf7fe] rounded-[10px] self-start py-[40px] px-[45px] w-[741px] ${
            singleTaskCommentsLoader && "pointer-events-none opacity-[0.5]"
          }`}
        >
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
              {singleTaskCommentsData?.reduce(
                (sum, comment) =>
                  sum +
                  1 +
                  (comment.sub_comments ? comment.sub_comments.length : 0),
                0 || 0
              )}
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
              <div className="flex flex-col gap-y-[10px] w-full">
                <h1 className="text-[18px]">{item?.author_nickname}</h1>
                <p className="text-[#343A40]">{item?.text}</p>
                <div
                  onClick={() => {
                    setSingleTaskCommentReplyValue(
                      (prev: SingleTaskCommentValues) => ({
                        ...prev,
                        parent_id: item.id === prev.parent_id ? null : item.id,
                      })
                    );
                  }}
                  className={`flex items-center gap-[6px] self-start duration-75 text-BrightViolet border-b-[1px] ${
                    singleTaskCommentReplyValue.parent_id === item.id
                      ? "border-b-BrightViolet"
                      : "border-b-transparent"
                  } cursor-pointer`}
                >
                  <PiArrowBendUpLeftFill />
                  <p className="text-[12px]">უპასუხე</p>
                </div>

                <div
                  className={`w-full duration-100 ${
                    singleTaskCommentReplyValue.parent_id == item.id
                      ? "h-[135px]"
                      : "h-0 overflow-hidden opacity-0"
                  }`}
                >
                  <InputTextarea
                    name="text"
                    setValue={setSingleTaskCommentReplyValue}
                    placeholder="დაწერე საპასუხო კომენტარი"
                    render={singleTaskCommentsRender}
                    Button={HandleCreateSingleTaskCommentReply}
                    loader={createSingleTaskCommentReplyLoader == item.id}
                  />
                </div>

                {item?.sub_comments &&
                  item?.sub_comments
                    ?.reverse()
                    .map((item1: SingleTaskComment) => (
                      <div key={item1.id} className="flex gap-[12px] mt-[20px]">
                        <div className="relative h-[38px] shrink-0 aspect-square rounded-full overflow-hidden">
                          {item?.author_avatar && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item1?.author_avatar}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex flex-col gap-y-[10px]">
                          <h1 className="text-[18px]">
                            {item1?.author_nickname}
                          </h1>
                          <p className="text-[#343A40]">{item1?.text}</p>
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
