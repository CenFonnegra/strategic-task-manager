import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TaskForm from "../TaskForm";

describe("TaskForm", () => {

    it("muestra el botón de crear tarea", () => {

        render(
            <TaskForm
                title=""
                description=""
                setTitle={vi.fn()}
                setDescription={vi.fn()}
                handleSubmit={vi.fn()}
                editingTaskId={null}
            />
        );

        expect(
            screen.getByRole("button", {
                name: "Crear tarea"
            })
        ).toBeInTheDocument();

    });

    it("muestra el botón de guardar cambios al editar una tarea", () => {

        render(
            <TaskForm
                title="Aprender React"
                description="Estudiar testing"
                setTitle={vi.fn()}
                setDescription={vi.fn()}
                handleSubmit={vi.fn()}
                editingTaskId="task-123"
            />
        );

        expect(
            screen.getByRole("button", {
                name: "Guardar cambios"
            })
        ).toBeInTheDocument();

    });

});