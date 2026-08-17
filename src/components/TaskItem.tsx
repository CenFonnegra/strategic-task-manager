import Button from "./Button";
import type { Task } from "../types/Task";

interface TaskItemProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (task: Task) => void;
}

function TaskItem({ task, onEdit, onDelete }: TaskItemProps) {

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

        </article>
    );
}

export default TaskItem;