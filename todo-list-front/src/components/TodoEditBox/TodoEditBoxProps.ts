export interface TodoEditBoxProps {
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
    setTodoData: React.Dispatch<React.SetStateAction<{ title: string; description: string | undefined; }>>;
    title: string
    description?: string
    id: number
};
