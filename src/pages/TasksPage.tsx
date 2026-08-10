import { useState } from "react";
import Button from "../components/Button";
import { auth, db } from "../firebase";
import {
     addDoc, 
     collection, 
     query, 
     where,
    getDocs,
    doc, 
    updateDoc, 
    deleteDoc
 } from "firebase/firestore";
import { useEffect } from "react";


interface Task {
    id: string;
    title: string;
    description: string;
    userId: string;
}

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

        const loadTasks = async () => {
            try{

            const snapshot = await getDocs(tasksQuery);
            const tasksData: Task[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Task, "id">)
            }));

            setTasks(tasksData);

            } catch (error) {
                console.log("Error al cargar las tareas:", error);
            }
            
        };
        loadTasks();
    }, []);

    //crear Tarea
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (editingTaskId) {
            const taskRef = doc(db, "tasks", editingTaskId);

            await updateDoc(taskRef, {
                title: title,
                description: description
            });

            setTasks((currentTasks) =>
                currentTasks.map((task) =>
                task.id === editingTaskId
                    ? {
                        ...task,
                        title: title,
                        description: description
                    }
                    : task

                )
            );

            setTitle("");
            setDescription("");
            setEditingTaskId(null);

            return;
        }

        const user = auth.currentUser;

        if (!user) {
            return;
        }

        try{

            await addDoc(
                collection(db, "tasks"),
                {
                    title: title,
                    description: description,
                    userId: user.uid
                }
            );
    
            setTitle("");
            setDescription("");
        } catch (error) {
            console.log("Error al creal la tarea:", error);
        }
    }
    //Actualizar tarea
    async function handleUpdate(task:Task) {
        const taskRef = doc(db, "tasks", task.id);

        await updateDoc(taskRef, {
            title: task.title,
            description: task.description
        });
    }

    //Borrar tarea
    async function handleDelete(task: Task) {
        const taskRef = doc(db, "tasks", task.id);

        try {
            await deleteDoc(taskRef);

            setTasks((currentTasks) =>
            currentTasks.filter((currentTask) => currentTask.id !== task.id)
            );
        } catch (error) {
            console.log("Error al eliminar la tarea:", error);
        }
    }
    
    return (
        <main>
           <h1>Task Page</h1>

           <form onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Título de la tarea"
                />

                <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                
                <Button
                    text={editingTaskId ? "Guardar cambios" : "Crear tarea"}
                    type="submit"
                />
            </form> 

            <section>
                <h2>Mis tareas</h2>

                {tasks.map((task) =>(
                    <article key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>

                        <Button
                            text="Editar"
                            type="button"
                            onClick={() => {
                                setEditingTaskId(task.id);
                                setTitle(task.title);
                                setDescription(task.description);
                            }}
                            />
                        <Button
                            text="Eliminar"
                            type="button"
                            onClick={() => handleDelete(task)}
                            />
                    </article>
                ))}
            </section>
        </main>
    );
}

export default TasksPage;