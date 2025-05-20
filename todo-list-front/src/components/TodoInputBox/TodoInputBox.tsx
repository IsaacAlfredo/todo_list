import { DefaultButton } from "../DefaultButton/DefaultButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoInputBoxProps } from "./TodoInputBoxProps";
import axios from "axios";
import { useState, useEffect } from "react";
import { ErrorCard } from "../ErrorCard/ErrorCard";
import {
  TodoSubmitSchemaType,
  todoSubmitSchema,
} from "../../schemas/TodoSubmitSchema";
import { API_URL } from "../../config";

export function TodoInputBox({ fetchData }: TodoInputBoxProps) {
  const [errorMessage, setErrorMessage] = useState({
    status: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    formState,
    reset,
  } = useForm<TodoSubmitSchemaType>({
    resolver: zodResolver(todoSubmitSchema),
  });

  function handleErrorMessage() {
    if (errorMessage.status) {
      setErrorMessage({ status: false, message: "" });
    }
  }

  async function handleTodoSubmit(data: TodoSubmitSchemaType) {
    await axios
      .post(API_URL, {
        title: data.title,
        description: data.description,
      })
      .then(() => {
        fetchData();
        setErrorMessage({ status: false, message: "" });
      })
      .catch((err) => {
        console.log(err);
        if (err.status == 409) {
          setErrorMessage({ status: true, message: "Título já existente" });
        }
      });
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [reset, formState, isSubmitSuccessful]);

  return (
    <form
      onSubmit={handleSubmit(handleTodoSubmit)}
      className="bg-purple-900-900/30 rounded-b-xs mb-2 w-2/3 flex-col justify-items-end gap-2 justify-self-center border-b-2 border-indigo-500 p-2"
    >
      <div className="w-full">
        {errorMessage.status ? (
          <ErrorCard message={errorMessage.message} />
        ) : (
          <ErrorCard message={errors.title?.message} />
        )}
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
      <DefaultButton
        text="Criar To Do"
        color="blue"
        onClick={handleErrorMessage}
      />
    </form>
  );
}
