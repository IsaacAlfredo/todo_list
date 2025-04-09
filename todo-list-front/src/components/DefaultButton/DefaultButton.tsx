import { DefaultButtonType } from "./DefaultButtonType";

export function DefaultButton(defaultButton: DefaultButtonType) {
  return (
    <button
      onClick={defaultButton.onClick}
      className={`focus:ring-3 group mb-2 flex rounded-lg bg-gradient-to-br ${defaultButton.color == "blue" ? "from-purple-600 to-blue-500" : "from-red-400 to-red-700"} p-0.5 font-medium ${defaultButton.color == "blue" ? "focus:ring-blue-300 dark:focus:ring-blue-900" : "focus:ring-rose-400 dark:focus:ring-rose-950"} `}
    >
      <span className="w-full rounded-md bg-blue-50 px-5 py-2.5 text-sm transition-all duration-200 ease-in group-hover:bg-transparent group-hover:text-blue-50 dark:bg-gray-900 dark:text-blue-50 group-hover:dark:bg-transparent">
        {defaultButton.text}
      </span>
    </button>
  );
}
