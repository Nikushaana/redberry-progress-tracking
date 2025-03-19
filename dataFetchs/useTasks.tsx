"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { axiosUser } from "./AxiosToken";
import { usePathname } from "next/navigation";

export type TasksContextType = {
  tasksData: TaskItem[];
  tasksLoader: boolean;
  tasksDataWithTitle: Task[];
  dropedFilterComponent: string;
  filteredItems: FilterItems;
  setFilteredItems: Dispatch<SetStateAction<FilterItems>>;
  setDropedFilterComponent: Dispatch<SetStateAction<string>>;
  HandleSetInParams: (titleEng: string) => void;
  fetchTasks: () => void;
};

export const Tasks = createContext<TasksContextType>({
  tasksData: [],
  tasksLoader: true,
  tasksDataWithTitle: [
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
  ],
  dropedFilterComponent: "",
  filteredItems: {
    departments: [],
    priorities: [],
    employees: "",
  },
  setFilteredItems: () => {},
  setDropedFilterComponent: () => {},
  HandleSetInParams: () => {},
  fetchTasks: () => {},
});

export const TasksContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const searchParams = new URLSearchParams(window.location.search);
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

  // get from params
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const departmentsFromParams = searchParams.get("departments");
    const prioritiesFromParams = searchParams.get("priorities");
    const employeesFromParams = searchParams.get("employees");

    setFilteredItems((prev) => ({
      ...prev,

      departments: departmentsFromParams
        ? departmentsFromParams
            .split(",")
            .map(Number)
            .filter((n) => !isNaN(n))
        : [],
      priorities: prioritiesFromParams
        ? prioritiesFromParams
            .split(",")
            .map(Number)
            .filter((n) => !isNaN(n))
        : [],
      employees: employeesFromParams ? employeesFromParams : "",
    }));
  }, []);
  // get from params

  const FilterTasks = () => {
    const searchParams = new URLSearchParams(window.location.search);

    const departmentsFromParams = searchParams.get("departments");
    const prioritiesFromParams = searchParams.get("priorities");
    const employeesFromParams = searchParams.get("employees");

    const departments = departmentsFromParams
      ? departmentsFromParams
          .split(",")
          .map(Number)
          .filter((n) => !isNaN(n))
      : [];
    const priorities = prioritiesFromParams
      ? prioritiesFromParams
          .split(",")
          .map(Number)
          .filter((n) => !isNaN(n))
      : [];
    const employees = employeesFromParams ? employeesFromParams : "";

    const filteredTaskData =
      departments.length > 0 || priorities.length > 0 || employees
        ? tasksData.filter(
            (task) =>
              (departments.length > 0
                ? departments.includes(task.department.id)
                : true) &&
              (priorities.length > 0
                ? priorities.includes(task.priority.id)
                : true) &&
              (employees ? employees == String(task.employee.id) : true)
          )
        : tasksData;

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
  }, [tasksData, searchParams?.toString()]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const HandleSetInParams = (titleEng: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    FilterTasks();

    if (titleEng === "departments") {
      searchParams.set("departments", filteredItems.departments.toString());
    } else if (titleEng === "priorities") {
      searchParams.set("priorities", filteredItems.priorities.toString());
    } else if (titleEng === "employees") {
      searchParams.set("employees", filteredItems.employees.toString());
    }

    if (pathname === "/") {
      window.history.replaceState(
        null,
        "/",
        `${pathname}?${searchParams.toString()}`
      );
      setDropedFilterComponent("");
    }
  };

  return (
    <Tasks.Provider
      value={{
        tasksData,
        tasksDataWithTitle,
        tasksLoader,
        filteredItems,
        setFilteredItems,
        dropedFilterComponent,
        setDropedFilterComponent,
        HandleSetInParams,
        fetchTasks,
      }}
    >
      {children}
    </Tasks.Provider>
  );
};
