import { useState } from "react";
import { DefaultButton } from "../DefaultButton/DefaultButton";
import { TodoProps } from "./TodoProps";
import axios from "axios";
import { TodoEditBox } from "../TodoEditBox/TodoEditBox";
import { API_URL } from "../../config";

export function TodoCard(todo: TodoProps) {
  const [isChecked, setIsChecked] = useState(todo.check);
  const [isEditing, setIsEditing] = useState(false);
  const [todoData, setTodoData] = useState({
    title: todo.title,
    description: todo.description,
  });

  async function handleDelete() {
    try {
      const del = axios.delete(`${API_URL}/${todo.id}`);
      const deleteStatus = (await del).status;
      if (deleteStatus == 204) {
        todo.setTodoCardList((prevTodos) =>
          prevTodos.filter((todos) => todos.id !== todo.id),
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleCheck() {
    try {
      if (isChecked) {
        await axios.patch(`${API_URL}/${todo.id}`, { check: false });
        setIsChecked(false);
      } else {
        await axios.patch(`${API_URL}/${todo.id}`, {
          check: true,
        });
        setIsChecked(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleEdit() {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }

  return (
    <div className="w-2/3 p-1">
      {isEditing ? null : (
        <>
          <div className="flex w-full gap-2">
            <h2 className="wrap-break-word w-15/16 text-balance rounded-md bg-blue-950/20 text-center text-3xl font-medium text-blue-950 dark:bg-transparent dark:text-blue-50">
              {todoData.title}
            </h2>
            <input
              type="checkbox"
              className="mr-1 flex size-9 self-center justify-self-end rounded-full border-zinc-500 bg-blue-950/40"
              checked={isChecked}
              onChange={handleCheck}
            />
          </div>
          <p className="wrap-break-word mb-5 text-balance font-thin dark:text-blue-50">
            {todoData.description}
          </p>
          <div className="flex justify-end gap-2">
            <DefaultButton
              text="Editar"
              color="blue"
              onClick={handleEdit}
              type="button"
            />
            <DefaultButton
              text="Excluir"
              color="red"
              onClick={handleDelete}
              type="button"
            />
          </div>
        </>
      )}

      <div>
        {isEditing ? (
          <TodoEditBox
            title={todoData.title}
            description={todoData.description}
            setIsEditing={setIsEditing}
            id={todo.id}
            setTodoData={setTodoData}
          />
        ) : null}
      </div>
    </div>
  );
}
