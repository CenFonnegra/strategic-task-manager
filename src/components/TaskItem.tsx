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
        <article>
            <h3>{task.title}</h3>
            <p>{task.description}</p>

            <Button
            text="Editar"
            type="button"
            onClick={() => onEdit(task)}
            />

            <Button
            text="Eliminar"
            type="button"
            onClick={() => onDelete(task)}
            />

            <Button
             text={task.completed ? "Marcar como pendiente" : "Marcar como completada"}
             type="button"
             onClick={() => onToggleComplete(task)}
            />

        </article>
    );
}

export default TaskItem;