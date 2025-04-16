import { useState, useEffect } from "react";
import { TodoCard } from "./components/TodoCard/TodoCard";
import { TodoInputBox } from "./components/TodoInputBox/TodoInputBox";
import axios from "axios";
import { TodoProps } from "./components/TodoCard/TodoProps";

function App() {
  const [todoCardList, setTodoCardList] = useState<Array<TodoProps>>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const todoAPI = await axios.get("http://127.0.0.1:5000/");
        setTodoCardList(todoAPI.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex-col">
      <h1 className="mb-10 w-full text-center text-8xl text-blue-950 dark:text-blue-50">
        To Do List
      </h1>
      <TodoInputBox />

      <ul className="flex h-screen flex-col place-items-center gap-5 divide-y-2 divide-dotted divide-indigo-500">
        {todoCardList.map((TodoCards: TodoProps) => (
          <TodoCard
            title={TodoCards.title}
            description={TodoCards.description}
            key={TodoCards.id}
            id={TodoCards.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
