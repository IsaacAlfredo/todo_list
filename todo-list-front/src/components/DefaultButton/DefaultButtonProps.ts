export interface DefaultButtonProps {
  text: string;
  color: string;
  type?: "button"|"submit" 
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};