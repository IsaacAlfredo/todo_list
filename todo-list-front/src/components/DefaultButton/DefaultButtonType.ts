export type DefaultButtonType = {
  readonly text: string;
  color: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};