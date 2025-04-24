export interface TodoProps {
  title: string;
  description?: string;
  id: number;
  check: boolean;
  setTodoCardList: React.Dispatch<React.SetStateAction<TodoProps[]>>
};
