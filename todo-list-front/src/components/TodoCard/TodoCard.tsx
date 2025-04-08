type Todo = {
  title: string;
  description?: string;
};

function TodoCard(todo: Todo) {
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
        <button className="focus:ring-3 group mb-2 flex rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 font-medium focus:ring-blue-300 dark:focus:ring-blue-900">
          <span className="w-full rounded-md bg-blue-50 px-5 py-2.5 text-sm transition-all duration-200 ease-in group-hover:bg-transparent group-hover:text-blue-50 dark:bg-gray-900 dark:text-blue-50 group-hover:dark:bg-transparent">
            Editar
          </span>
        </button>
        <button className="focus:ring-3 group mb-2 flex rounded-lg bg-gradient-to-br from-red-400 to-red-700 p-0.5 font-medium focus:ring-blue-300 dark:focus:ring-blue-900">
          <span className="w-full rounded-md bg-blue-50 px-5 py-2.5 text-sm transition-all duration-200 ease-in group-hover:bg-transparent group-hover:text-blue-50 dark:bg-gray-900 dark:text-blue-50 group-hover:dark:bg-transparent">
            Excluir
          </span>
        </button>
      </div>
    </div>
  );
}

export default TodoCard;
