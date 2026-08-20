import Button from "./Button";
import type { Task } from "../types/Task";

interface TaskItemProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (task: Task) => void;
    onToggleComplete: (task: Task) => void;
}

function TaskItem({ task, onEdit, onDelete, onToggleComplete }: TaskItemProps) {

    return (
        <article className={`task-card ${task.completed ? "completed" : ""}`}>
            <div className="task-card-header">
                <h3>{task.title}</h3>
    
                <span className="task-status">
                    {task.completed ? "Completada" : "Pendiente"}
                </span>
            </div>
    
            <p>{task.description}</p>
    
            <div className="task-actions">
                <Button
                    text="Editar"
                    type="button"
                    onClick={() => onEdit(task)}
                    variant="secondary"
                />
    
                <Button
                    text="Eliminar"
                    type="button"
                    onClick={() => onDelete(task)}
                    variant="danger"
                />
    
                <Button
                    text={
                        task.completed
                            ? "Marcar como pendiente"
                            : "Marcar como completada"
                    }
                    type="button"
                    onClick={() => onToggleComplete(task)}
                    variant="success"
                />
            </div>
        </article>
    );
}

export default TaskItem;