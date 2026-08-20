import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TaskItem from "../TaskItem";
import type { Task } from "../../types/Task";

const task: Task = {
    id: "1",
    title: "Aprender React",
    description: "Estudiar testing",
    userId: "user-123",
    completed: false
};

describe("TaskItem", () => {

    it("muestra el título y la descripción de la tarea", () => {

        render(
            <TaskItem
                task={task}
                onEdit={vi.fn()}
                onDelete={vi.fn()}
                onToggleComplete={vi.fn()}
            />
        );

        expect(
            screen.getByText("Aprender React")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Estudiar testing")
        ).toBeInTheDocument();
    });


    it("ejecuta onEdit al hacer clic en Editar", async () => {

        const user = userEvent.setup();

        const onEdit = vi.fn();

        render(
            <TaskItem
                task={task}
                onEdit={onEdit}
                onDelete={vi.fn()}
                onToggleComplete={vi.fn()}
            />
        );

        await user.click(
            screen.getByRole("button", {
                name: "Editar"
            })
        );

        expect(onEdit).toHaveBeenCalledWith(task);
    });


    it("ejecuta onDelete al hacer clic en Eliminar", async () => {

        const user = userEvent.setup();

        const onDelete = vi.fn();

        render(
            <TaskItem
                task={task}
                onEdit={vi.fn()}
                onDelete={onDelete}
                onToggleComplete={vi.fn()}
            />
        );

        await user.click(
            screen.getByRole("button", {
                name: "Eliminar"
            })
        );

        expect(onDelete).toHaveBeenCalledWith(task);
    });

});