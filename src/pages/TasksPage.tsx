import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
    addDoc,
    collection,
    query,
    where,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";
import type { Task } from "../types/Task";



function TasksPage() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

    useEffect(() => {

        const user = auth.currentUser;

        if (!user) {
            return;
        }

        const tasksQuery = query(
            collection(db, "tasks"),
            where("userId", "==", user.uid)
        );

        const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {

            const tasksData: Task[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Task, "id">)
            }));

            setTasks(tasksData);
        });

        return () => unsubscribe();

    }, []);

    // Crear / actualizar tarea
    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        const user = auth.currentUser;

        if (!user) {
            return;
        }

        try {

            if (editingTaskId) {

                const taskRef = doc(db, "tasks", editingTaskId);

                await updateDoc(taskRef, {
                    title: title,
                    description: description
                });

            } else {

                await addDoc(
                    collection(db, "tasks"),
                    {
                        title: title,
                        description: description,
                        userId: user.uid,
                        completed: false
                    }
                );
            }

            setTitle("");
            setDescription("");
            setEditingTaskId(null);

        } catch (error) {

            console.log(
                "Error al guardar la tarea:",
                error
            );
        }
    }

    // Borrar tarea
    async function handleDelete(task: Task) {

        const taskRef = doc(
            db,
            "tasks",
            task.id
        );

        try {

            await deleteDoc(taskRef);

        } catch (error) {

            console.log(
                "Error al eliminar la tarea:",
                error
            );
        }
    }

    async function handleToggleComplete(task: Task) {

        const taskRef = doc(
            db,
            "tasks",
            task.id
        );
    
        try {
    
            await updateDoc(taskRef, {
                completed: !task.completed
            });
    
        } catch (error) {
    
            console.log(
                "Error al actualizar el estado de la tarea:",
                error
            );
        }
    }

    return (
        <main>

            <h1>Task Page</h1>

            <TaskForm
                title={title}
                description={description}
                setTitle={setTitle}
                setDescription={setDescription}
                handleSubmit={handleSubmit}
                editingTaskId={editingTaskId}
            />

            <section>

                <h2>Mis tareas</h2>

                {tasks.map((task) => (

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

                ))}

            </section>

        </main>
    );
}

export default TasksPage;