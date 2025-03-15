"use client";

import { useEffect, useState } from "react";
import { axiosUser } from "./AxiosToken";

const useTasks = () => {
  const [tasksData, setTasksData] = useState<Task[]>([
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
  const [tasksLoader, setTasksLoader] = useState<boolean>(true);

  const fetchTasks = () => {
    setTasksLoader(true);
    axiosUser
      .get("tasks")
      .then((res) => {
        setTasksLoader(false);
        setTasksData((prev) =>
          prev.map((statusGroup) => ({
            ...statusGroup,
            tasks: [
              ...statusGroup.tasks,
              ...res.data.filter(
                (item: TaskItem) => item.status.name === statusGroup.status
              ),
            ],
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasksData,
    tasksLoader,
    fetchTasks,
  };
};

export default useTasks;
