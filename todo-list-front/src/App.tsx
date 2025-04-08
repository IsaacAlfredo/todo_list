//import { useState } from 'react'
import TodoCard from "./components/TodoCard/TodoCard";

function App() {
  return (
    <ul className="">
      <h1 className="mb-10 w-full self-center text-center text-8xl text-blue-950 dark:text-blue-50">
        To Do List
      </h1>
      <div className="divide-y-3 flex h-screen flex-col place-items-center gap-5 divide-indigo-500">
        <TodoCard title="adaskdapkdo" />
        <TodoCard title="adaskdapkdo" description="opdksapodkadk" />
        <TodoCard title="adaskdapkdo" description="opdksapodkadk" />
      </div>
    </ul>
  );
}

export default App;
