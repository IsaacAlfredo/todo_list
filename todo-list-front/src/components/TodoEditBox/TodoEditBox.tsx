import axios from "axios";
import { API_URL } from "../../config";

import { useState } from "react";
import { DefaultButton } from "../DefaultButton/DefaultButton";
import { TodoEditBoxProps } from "./TodoEditBoxProps";
import { ErrorCard } from "../ErrorCard/ErrorCard";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  todoSubmitSchema,
  TodoSubmitSchemaType,
} from "../../schemas/TodoSubmitSchema";

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

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TodoSubmitSchemaType>({
    resolver: zodResolver(todoSubmitSchema),
  });

  function handleCancel() {
    setIsEditing(false);
  }

  function handleErrorMessage() {
    if (errorMessage.status) {
      setErrorMessage({ status: false, message: "" });
    }
  }

  async function handleSave(data: TodoSubmitSchemaType) {
    if (errorMessage.status) {
      setErrorMessage({ status: false, message: "" });
    }

    await axios
      .patch(`${API_URL}/${id}`, {
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
          setErrorMessage({ status: true, message: "Título já existente" });
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
            <ErrorCard message={errorMessage.message} />
          ) : (
            <ErrorCard message={errors.title?.message} />
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
          <DefaultButton
            text="Salvar"
            color="blue"
            onClick={handleErrorMessage}
          />
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
