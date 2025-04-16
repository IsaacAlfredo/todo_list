import { DefaultButton } from "../DefaultButton/DefaultButton";
import { TodoProps } from "./TodoProps";

export function TodoCard(todo: TodoProps) {
  return (
    <div className="w-2/3 p-1">
      <div className="flex w-full gap-2">
        <h2 className="wrap-break-word w-15/16 text-balance rounded-md bg-blue-950/20 text-center text-3xl font-medium text-blue-950 dark:bg-transparent dark:text-blue-50">
          {todo.title}
        </h2>
        <input
          type="checkbox"
          className="mr-1 flex size-9 self-center justify-self-end rounded-full border-zinc-500 bg-blue-950/40"
        />
      </div>
      <p className="wrap-break-word mb-5 text-balance font-thin dark:text-blue-50">
        {todo.description}
      </p>
      <div className="flex justify-end gap-2">
        <DefaultButton text="Editar" color="blue" />
        <DefaultButton text="Excluir" color="red" />
      </div>
    </div>
  );
}
