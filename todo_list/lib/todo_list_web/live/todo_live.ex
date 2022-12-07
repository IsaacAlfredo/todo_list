defmodule TodoListWeb.TodoLive do
  use TodoListWeb, :live_view

  alias TodoList.Todos
  def mount(_params, _session, socket) do
    {:ok, assign(socket, todos: Todos.list_todos())}
  end

  def handle_event("add", %{"todo" => todo}, socket) do
  Todos.create_todo(todo)

  {:noreply, fetch(socket)}
  end

  defp fetch(socket) do
    assign(socket, todos: Todos.list_todos())
  end
end
