import { ErrorProps } from "./ErrorProps";

export function ErrorCard({ message }: ErrorProps) {
  if (message != undefined) {
    return <span className="text-red-400">{message}</span>;
  }
}
