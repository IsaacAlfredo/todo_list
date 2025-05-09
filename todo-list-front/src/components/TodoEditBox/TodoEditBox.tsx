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
  const [errorMessage, setErrorMessage] = useState({
    status: false,
    message: "",
  });

  const todoEditSchema = z.object({
    title: z.string().min(2, { message: "Titulo muito curto" }),
    description: z.string(),
  });
  type TodoSubmitSchema = z.infer<typeof todoEditSchema>;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TodoSubmitSchema>({
    resolver: zodResolver(todoEditSchema),
  });

  function handleCancel() {
    setIsEditing(false);
  }

  function handleOnChange() {
    if (errorMessage.status) {
      setErrorMessage({ status: false, message: "" });
    }
  }

  async function handleSave(data: TodoSubmitSchema) {
    const validation = todoEditSchema.safeParse(data);
    console.log(validation);

    await axios
      .patch(`http://127.0.0.1:5000/${id}`, {
        title: data.title,
        description: data.description,
      })
      .then(() => {
        setTodoData({ title: data.title, description: data.description });
        setIsEditing(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.status == 409) {
          setErrorMessage({ status: true, message: "Titulo já existente" });
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
          {errorMessage.status ? (
            <span className="text-red-700">{errorMessage.message}</span>
          ) : (
            <span className="text-red-700">{errors.title?.message}</span>
          )}
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
          <DefaultButton text="Salvar" color="blue" onClick={handleOnChange} />
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
