export interface TodoProps {
  title: string;
  description?: string;
  id: number;
  setTodoCardList: React.Dispatch<React.SetStateAction<TodoProps[]>>
};
