import axios from "axios";
import { DefaultButton } from "../DefaultButton/DefaultButton";
import { TodoEditBoxProps } from "./TodoEditBoxProps";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export function TodoEditBox({
  setIsEditing,
  setTodoData,
  title,
  description,
  id,
}: TodoEditBoxProps) {
  const [titleExists, setTitleExists] = useState(false);

  const todoEditSchema = z.object({
    title: z.string().min(2),
    description: z.string(),
  });
  type TodoSubmitSchema = z.infer<typeof todoEditSchema>;

  const { register, handleSubmit } = useForm<TodoSubmitSchema>({
    resolver: zodResolver(todoEditSchema),
  });

  function handleCancel() {
    setIsEditing(false);
  }

  async function handleSave(data: TodoSubmitSchema) {
    await axios
      .patch(`http://127.0.0.1:5000/${id}`, {
        title: data.title,
        description: data.description,
      })
      .then(() => {
        setTodoData({ title: data.title, description: data.description });
        setIsEditing(false);
      })
      .catch((error) => {
        if (error.status == 409) {
          setTitleExists(true);
        }
      });
  }

  return (
    <div>
      <form className="flex-col" onSubmit={handleSubmit(handleSave)}>
        <div>
          <label className="ml-1 font-normal dark:text-blue-50">
            Titulo
            <input
              {...register("title")}
              type="text"
              className="w-full rounded-xl bg-blue-100/80 text-black dark:bg-gray-900/80 dark:text-blue-50"
              defaultValue={title}
            />
          </label>

          {titleExists ? (
            <span className="text-red-700">Titulo já existente</span>
          ) : null}
        </div>

        <label className="ml-1 font-normal dark:text-blue-50">
          Descrição
          <textarea
            {...register("description")}
            className="min-h-20 w-full rounded-xl bg-blue-100/80 text-black dark:bg-gray-900/80 dark:text-blue-50"
            defaultValue={description}
          ></textarea>
        </label>
        <div className="mt-2 flex justify-end gap-2">
          <DefaultButton text="Salvar" color="blue" />
          <DefaultButton
            text="Cancelar"
            color="red"
            type="button"
            onClick={handleCancel}
          />
        </div>
      </form>
    </div>
  );
}
