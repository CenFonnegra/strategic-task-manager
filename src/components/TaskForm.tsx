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
  <form onSubmit={handleSubmit} className="task-form">
    <div className="task-form-group">
      <label htmlFor="task-title">Título</label>

      <input
        id="task-title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Ej. Preparar presentación del proyecto"
      />
    </div>

    <div className="task-form-group">
      <label htmlFor="task-description">Descripción</label>

      <textarea
        id="task-description"
        aria-label="Descripción"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Describe brevemente lo que necesitas hacer..."
        rows={4}
      />
    </div>

    <div className="task-form-actions">
      <Button
        text={editingTaskId ? "Guardar cambios" : "Crear tarea"}
        type="submit"
      />
    </div>
  </form>
);

}

export default TaskForm;