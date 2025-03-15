"use client";

import React, { useEffect, useState } from "react";
import Button2 from "../components/buttons/button2";
import Input1 from "../components/input/input1";
import InputDropDown from "../components/input/inputDropDown";
import useDepartments from "../../../dataFetchs/useDepartments";
import InputTextarea from "../components/input/inputTextarea";
import InputCalendar from "../components/input/inputCalendar";
import useEmployees from "../../../dataFetchs/useEmployees";
import usePriorities from "../../../dataFetchs/usePriorities";
import useStatus from "../../../dataFetchs/useStatus";
import * as Yup from "yup";
import { axiosUser } from "../../../dataFetchs/AxiosToken";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useTasks from "../../../dataFetchs/useTasks";

export default function Page() {
  const router = useRouter();
  const { departmentsData } = useDepartments();
  const { employeesData } = useEmployees();
  const { prioritiesData } = usePriorities();
  const { statusData } = useStatus();
  const { fetchTasks } = useTasks();

  const [createNewTaskValues, setCreateNewTaskValues] =
    useState<CreateNewTaskValues>({
      name: "",
      description: "",
      due_date: "",
      status_id: null,
      employee_id: null,
      priority_id: null,
      department_id: null,
    });

  const [parsedCreateNewTaskValues, setParsedCreateNewTaskValues] =
    useState<CreateNewTaskValues | null>(null);

  useEffect(() => {
    const getCreateNewTaskValues = localStorage.getItem(
      "create-new-task-values"
    );
    if (getCreateNewTaskValues) {
      const parsedValues = JSON.parse(getCreateNewTaskValues);

      setParsedCreateNewTaskValues(parsedValues);
    }
  }, []);

  const [errors, setErrors] = useState<CreateNewTaskValidationErrors>({});

  const [createNewTaskLoader, setCreateNewTaskLoader] =
    useState<boolean>(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("სათაური აუცილებელია")
      .min(3, "მინიმუმ 3 სიმბოლო")
      .max(255, "მაქსიმუმ 255 სიმბოლო"),

    description: Yup.string()
      .test("word-count", "მინიმუმ 4 სიტყვა (არასავალდებულო)", (value) => {
        if (!value || value.trim() === "") return true;
        return value.trim().split(/\s+/).length >= 4;
      })
      .test(
        "character-count",
        "მაქსიმუმ 255 სიმბოლო (არასავალდებულო)",
        (value) => {
          if (!value) return true;
          return value.length <= 255;
        }
      ),

    priority_id: Yup.object().required("პრიორიტეტი აუცილებელია"),
    status_id: Yup.object().required("სტატუსი აუცილებელია"),
    department_id: Yup.object().required("დეპარტამენტი აუცილებელია"),
    employee_id: Yup.object().required(
      "პასუხისმგებელი თანამშრომელი აუცილებელია"
    ),

    due_date: Yup.string().required("დედლაინი აუცილებელია"),
  });

  useEffect(() => {
    localStorage.setItem(
      "create-new-task-values",
      JSON.stringify(createNewTaskValues)
    );

    validationSchema
      .validate(createNewTaskValues, { abortEarly: false })
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
  }, [createNewTaskValues]);

  const HandleCreateNewTask = () => {
    if (Object.keys(errors).length === 0) {
      setCreateNewTaskLoader(true);
      axiosUser
        .post("tasks", {
          name: createNewTaskValues.name,
          description: createNewTaskValues.description,
          due_date: createNewTaskValues.due_date,
          status_id: createNewTaskValues.status_id?.id,
          employee_id: createNewTaskValues.employee_id?.id,
          priority_id: createNewTaskValues.priority_id?.id,
        })
        .then((res) => {
          fetchTasks();
          toast.success("დავალება დაემატა!");
          localStorage.removeItem("create-new-task-values");
          router.push("/");
          console.log(res);
        })
        .catch((err) => {
          toast.error("ვერ დაემატა!");
          console.log(err);
        })
        .finally(() => {
          setCreateNewTaskLoader(false);
        });
    } else {
      toast.warn("შეავსე მონაცემები ვალიდურად!");
    }
  };

  return (
    <div className="px-[118px] pt-[40px] pb-[140px] flex flex-col">
      <h1 className="text-[34px]">შექმენი ახალი დავალება</h1>
      <div
        className={`pt-[65px] pr-[368px] pb-[216px] pl-[55px] grid grid-cols-2 gap-[161px] gap-y-[55px] bg-[#FBF9FFA6] w-full mt-[13px] rounded-[4px] border-[0.3px] border-[#DDD2FF] duration-75 ${
          createNewTaskLoader && "pointer-events-none opacity-[0.5]"
        }`}
      >
        <Input1
          title="სათაური*"
          name="name"
          setValue={setCreateNewTaskValues}
          defaultValue={parsedCreateNewTaskValues?.name || ""}
          errorsData={[
            {
              id: 1,
              status: errors.name === "მინიმუმ 3 სიმბოლო",
              error: "მინიმუმ 3 სიმბოლო",
            },
            {
              id: 2,
              status: errors.name === "მაქსიმუმ 255 სიმბოლო",
              error: "მაქსიმუმ 255 სიმბოლო",
            },
          ]}
        />
        <InputDropDown
          title="დეპარტამენტი*"
          data={departmentsData}
          name="department_id"
          setValue={setCreateNewTaskValues}
          defaultValue={parsedCreateNewTaskValues?.department_id?.id || null}
          errorsData={[
            {
              id: 1,
              status: errors.department_id === "დეპარტამენტი აუცილებელია",
              error: "დეპარტამენტი აუცილებელია",
            },
          ]}
        />
        <InputTextarea
          title="აღწერა"
          name="description"
          setValue={setCreateNewTaskValues}
          defaultValue={parsedCreateNewTaskValues?.description || ""}
          errorsData={[
            {
              id: 1,
              status:
                errors.description === "მინიმუმ 4 სიტყვა (არასავალდებულო)",
              error: "მინიმუმ 4 სიტყვა (არასავალდებულო)",
            },
            {
              id: 2,
              status:
                errors.description === "მაქსიმუმ 255 სიმბოლო (არასავალდებულო)",
              error: "მაქსიმუმ 255 სიმბოლო (არასავალდებულო)",
            },
          ]}
        />
        <InputDropDown
          title="პასუხისმგებელი თანამშრომელი*"
          data={employeesData.filter(
            (items) =>
              items.department.id == createNewTaskValues.department_id?.id
          )}
          name="employee_id"
          setValue={setCreateNewTaskValues}
          disabled={!createNewTaskValues.department_id}
          render={
            !employeesData
              .filter(
                (items) =>
                  items.department.id == createNewTaskValues.department_id?.id
              )
              .find((items2) => items2 === createNewTaskValues.employee_id)
          }
          addEmployeeButton={true}
          errorsData={[
            {
              id: 1,
              status:
                errors.employee_id ===
                "პასუხისმგებელი თანამშრომელი აუცილებელია",
              error: "პასუხისმგებელი თანამშრომელი აუცილებელია",
            },
          ]}
        />
        <div className="grid grid-cols-2 gap-[32px] w-full">
          <InputDropDown
            title="პრიორიტეტი*"
            data={prioritiesData}
            name="priority_id"
            setValue={setCreateNewTaskValues}
            defaultValue={parsedCreateNewTaskValues?.priority_id?.id || 2}
            errorsData={[
              {
                id: 1,
                status: errors.priority_id === "პრიორიტეტი აუცილებელია",
                error: "პრიორიტეტი აუცილებელია",
              },
            ]}
          />
          <InputDropDown
            title="სტატუსი*"
            data={statusData}
            name="status_id"
            setValue={setCreateNewTaskValues}
            defaultValue={parsedCreateNewTaskValues?.status_id?.id || 1}
            errorsData={[
              {
                id: 1,
                status: errors.status_id === "სტატუსი აუცილებელია",
                error: "სტატუსი აუცილებელია",
              },
            ]}
          />
        </div>
        <div className="grid grid-cols-2">
          <InputCalendar
            title="დედლაინი"
            name="due_date"
            setValue={setCreateNewTaskValues}
            defaultValue={parsedCreateNewTaskValues?.due_date}
            errorsData={[
              {
                id: 1,
                status: errors.due_date === "დედლაინი აუცილებელია",
                error: "დედლაინი აუცილებელია",
              },
            ]}
          />
        </div>

        <div className="mt-[145px] flex items-center place-self-end col-span-2 gap-[22px] ">
          <Button2
            text="დავალების შექმნა"
            loader={createNewTaskLoader}
            action={HandleCreateNewTask}
          />
        </div>
      </div>
    </div>
  );
}
