  interface Button1Type {
    text: string;
    action: () => void;
  }

  interface Button2Type {
    text: string;
    button?: boolean;
    loader?: boolean;
    action?: () => void;
  }

  interface Input1Type {
    title?: string;
    name: string;
    setValue: React.Dispatch<React.SetStateAction<T>>;
    defaultValue?: string | undefined;
    errorsData?: ErrorItem[];
    render?: boolean | string;
    placeholder?: string;
    Button?: () => void;
    loader?: boolean
  }

  interface InputAvatarType {
    title: string;
    name: string;
    setValue: React.Dispatch<React.SetStateAction<T>>;
    errorsData: ErrorItem[];
    render: boolean
  }

  interface InputDropDownType {
    title?: string;
    data: PickedInputDropDownType[];
    name: string;
    setValue: React.Dispatch<React.SetStateAction<T>>;
    defaultValue?: number | null;
    errorsData?: ErrorItem[];
    render?: boolean | string | number;
    disabled?: boolean;
    addEmployeeButton?: boolean;
  }

  interface Department {
    id: number;
    name: string;
  }
  
  interface Status {
    id: number;
    name: string;
  }

  interface Employee {
    avatar: string;
    department: Department;
    id: number;
    name: string;
    surname: string;
  };

  interface Priority {
    icon: string;
    id: number;
    name: string;
  };
  
  interface PickedInputDropDownType {
    id: number;
    name: string;
    surname?: string;
    avatar?: string;
    department?: Department;
    icon?: string;
  }

  interface EmployeeValues {
    name: string;
    surname: string;
    avatar: null | File;
    department_id: Department | null;
  }

  interface AddEmployeeValidationErrors {
    name?: string;
    surname?: string;
    avatar?: string;
    department_id?: string;
  }

  interface CreateNewTaskValues {
    name: string;
    description: string;
    due_date: string;
    status_id: Status | null;
    employee_id: Employee | null;
    priority_id: Priority | null;
    department_id: Department | null;
  }

  interface CreateNewTaskValidationErrors {
    name?: string;
    description?: string;
    due_date?: string;
    status_id?: string,
      employee_id?: string,
      priority_id?: string,
      department_id?: string,
  }

  interface ErrorItem {
    id: number;
    status: boolean;
    error: string;
  }

  interface TaskItem {
    id: number;
    name: string;
    description: string;
    due_date: string;
    department: Department;
    employee: Employee;
    priority: Priority;
    status: Status;
    total_comments?: number;
  };

  interface Task {
    id: number;
    status: string;
    tasks: TaskItem[]; 
  };

  interface Taskcard {
    data: TaskItem | null;
    small?: boolean
  };

  interface SingleTaskStatusValues {
    status_id: Status | null;
  }
  
  interface SingleTaskCommentValues {
    text: string;
    parent_id?: number | null;
  }

  interface SingleTaskComment {
    id: number;
    task_id: number;
    parent_id: number | null;
    text: string;
    author_nickname: string;
    author_avatar: string;
    sub_comments?: SingleTaskComment[] | [];
  }

  interface FilterComponent {
    id: number;
    title: string;
    titleEng: keyof FilterItems;
    data: Department[] | Employee[] | Priority[] | null; 
  }

  interface FilterItems {
    departments: number[],
    priorities: number[],
    employees: string
  }