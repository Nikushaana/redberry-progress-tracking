"use client";

import { useEffect, useState } from "react";
import { axiosUser } from "./AxiosToken";
import { usePathname } from "next/navigation";

const useTasks = () => {
  const pathname = usePathname();
  const [tasksData, setTasksData] = useState<TaskItem[]>([]);
  const [tasksLoader, setTasksLoader] = useState<boolean>(true);
  const [tasksDataWithTitle, setTasksDataWithTitle] = useState<Task[]>([
    {
      id: 1,
      status: "დასაწყები",
      tasks: [],
    },
    {
      id: 2,
      status: "პროგრესში",
      tasks: [],
    },
    {
      id: 3,
      status: "მზად ტესტირებისთვის",
      tasks: [],
    },
    {
      id: 4,
      status: "დასრულებული",
      tasks: [],
    },
  ]);
  const [dropedFilterComponent, setDropedFilterComponent] = useState("");
  const [filteredItems, setFilteredItems] = useState<FilterItems>({
    departments: [],
    priorities: [],
    employees: "",
  });

  const fetchTasks = () => {
    setTasksLoader(true);
    setTasksData([]);
    axiosUser
      .get("tasks")
      .then((res) => {
        setTasksLoader(false);
        setTasksData(res.data);
      })
      .catch(() => {})
      .finally(() => {});
  };

  const FilterTasks = () => {
    const filteredTaskData = tasksData;

    // filter here with departments, priorities and employees

    setTasksDataWithTitle((prev) =>
      prev.map((statusGroup) => ({
        ...statusGroup,
        tasks: filteredTaskData.filter(
          (item: TaskItem) => item.status.name === statusGroup.status
        ),
      }))
    );
  };

  useEffect(() => {
    FilterTasks();
  }, [tasksData]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const HandleSetInParams = () => {
    const searchParams = new URLSearchParams();

    FilterTasks();

    searchParams.set("departments", filteredItems.departments.toString());
    searchParams.set("priorities", filteredItems.priorities.toString());
    searchParams.set("employees", filteredItems.employees.toString());

    if (pathname === "/") {
      window.history.replaceState(
        null,
        "/",
        `${pathname}?${searchParams.toString()}`
      );
      setDropedFilterComponent("");
    }
  };

  return {
    tasksDataWithTitle,
    tasksLoader,
    filteredItems,
    setFilteredItems,
    dropedFilterComponent,
    setDropedFilterComponent,
    HandleSetInParams,
    fetchTasks,
  };
};

export default useTasks;
