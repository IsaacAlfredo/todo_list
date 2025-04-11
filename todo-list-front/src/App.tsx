//import { useState } from 'react'
import { TodoCard } from "./components/TodoCard/TodoCard";
import { TodoInputBox } from "./components/TodoInputBox/TodoInputBox";

function App() {
  return (
    <div className="flex-col">
      <h1 className="mb-10 w-full text-center text-8xl text-blue-950 dark:text-blue-50">
        To Do List
      </h1>
      <TodoInputBox />

      <ul className="flex h-screen flex-col place-items-center gap-5 divide-y-2 divide-dotted divide-indigo-500">
        <TodoCard title="adaskdapkdo" />
        <TodoCard title="adaskdapkdo" description="opdksapodkadk" />
        <TodoCard title="adaskdapkdo" description="opdksapodkadk" />
      </ul>
    </div>
  );
}

export default App;
