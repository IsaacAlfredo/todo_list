import { DefaultButton } from "../DefaultButton/DefaultButton";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoInputBoxProps } from "./TodoInputBoxProps";
import axios from "axios";

export function TodoInputBox({ fetchData }: TodoInputBoxProps) {
  const todoSubmitSchema = z.object({
    title: z.string().min(5),
    description: z.string(),
  });
  type TodoSubmitSchema = z.infer<typeof todoSubmitSchema>;

  const { register, handleSubmit } = useForm<TodoSubmitSchema>({
    resolver: zodResolver(todoSubmitSchema),
  });

  async function handleTodoSubmit(data: TodoSubmitSchema) {
    console.log(data);
    try {
      await axios.post("http://127.0.0.1:5000/", {
        title: data.title,
        description: data.description,
      });
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleTodoSubmit)}
      className="bg-purple-900-900/30 rounded-b-xs mb-2 w-2/3 flex-col justify-items-end gap-2 justify-self-center border-b-2 border-indigo-500 p-2"
    >
      <div className="w-full">
        <div className="focus:ring-3 group mb-2 w-full flex-col rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 font-medium focus:ring-blue-300 dark:focus:ring-blue-900">
          <label className="ml-1 font-normal text-blue-50">
            Titulo
            <input
              {...register("title")}
              type="text"
              className="w-full rounded-xl bg-blue-100/80 text-black dark:bg-gray-900/80 dark:text-blue-50"
            />
          </label>
          <label className="ml-1 font-extralight text-blue-50">
            Descrição
            <textarea
              {...register("description")}
              className="w-full rounded-xl bg-blue-100/80 text-black dark:bg-gray-900/80 dark:text-blue-50"
            ></textarea>
          </label>
        </div>
      </div>
      <DefaultButton text="Criar To Do" color="blue" />
    </form>
  );
}
