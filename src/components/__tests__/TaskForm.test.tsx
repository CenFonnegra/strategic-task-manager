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

});