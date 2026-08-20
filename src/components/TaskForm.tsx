import Button from "./Button";

interface TaskFormProps {
    title: string;
    description: string;
    setTitle: (value: string) => void;
    setDescription: (value: string) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    editingTaskId: string | null;
}

function TaskForm({ title, description, setTitle, setDescription, handleSubmit, editingTaskId}: TaskFormProps) {
    return (
    <form onSubmit={handleSubmit}>
    <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Título de la tarea"
        />

    <textarea
        aria-label="Descripción"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
    />
        
        <Button
            text={editingTaskId ? "Guardar cambios" : "Crear tarea"}
            type="submit"
        />
    </form> 
    );
}

export default TaskForm;