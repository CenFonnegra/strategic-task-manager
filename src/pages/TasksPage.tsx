import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  createTask,
  subscribeToUserTasks,
  updateTask,
  deleteTask,
  toggleTaskComplete,
} from "../services/taskService";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";
import type { Task } from "../types/Task";

function TasksPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      return;
    }

    const unsubscribe = subscribeToUserTasks(user.uid, setTasks);

    return () => unsubscribe();
  }, []);

  // Crear / actualizar tarea
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      return;
    }

    try {
      if (editingTaskId) {
        await updateTask(editingTaskId, title, description);
      } else {
        await createTask(title, description, user.uid);
      }
    } catch (error) {
      console.log("Error al guardar la tarea:", error);
    }
  }

  // Borrar tarea
  async function handleDelete(task: Task) {
    const confirmed = window.confirm(
      `¿Estás seguro de que quieres eliminar "${task.title}"?\n\nEsta acción no se puede deshacer.`
    );
  
    if (!confirmed) {
      return;
    }
  
    try {
      await deleteTask(task.id);
    } catch (error) {
      console.log("Error al eliminar la tarea:", error);
    }
  }

  async function handleToggleComplete(task: Task) {
    try {
      await toggleTaskComplete(task.id, task.completed);
    } catch (error) {
      console.log("Error al actualizar el estado de la tarea:", error);
    }
  }

  return (
    <main className="tasks-page">
      <header className="tasks-header">
        <div>
          <h1>Mis tareas</h1>
          <p>Organiza y administra tus tareas de forma estratégica.</p>
        </div>

        <div className="tasks-header-actions">
          <button
            className="button button-secondary"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>

          <span className="tasks-count">
            {tasks.length} {tasks.length === 1 ? "tarea" : "tareas"}
          </span>
        </div>
      </header>

      <section className="task-form-section">
        <h2>{editingTaskId ? "Editar tarea" : "Nueva tarea"}</h2>

        <TaskForm
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          handleSubmit={handleSubmit}
          editingTaskId={editingTaskId}
        />
      </section>

      <section className="tasks-section">
        <div className="section-header">
          <h2>Mis tareas</h2>
        </div>

        <div className="tasks-list">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">✓</div>

              <h3>No tienes tareas todavía</h3>

              <p>
                Crea tu primera tarea y comienza a organizar tus objetivos de
                forma estratégica.
              </p>

              <button
                className="button button-primary"
                onClick={() => {
                  const titleInput = document.getElementById("task-title");
                
                  titleInput?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                
                  titleInput?.focus();
                }}
              >
                + Crear mi primera tarea
              </button>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={(task) => {
                  setEditingTaskId(task.id);
                  setTitle(task.title);
                  setDescription(task.description);
                }}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default TasksPage;
