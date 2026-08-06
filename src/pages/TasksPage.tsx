import { useState } from "react";
import Button from "../components/Button";
import { auth, db } from "../firebase";
import {
     addDoc, 
     collection, 
     query, 
     where,
    getDocs
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
                ...(*doc.data() as Omit<Task, "id">)
            }));

            setTasks(tasksData);

            } catch (error) {
                console.log("Error al cargar las tareas:", error);
            }
            
        };
        loadTasks();
    }, []);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();



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
                    text="Crear tarea"
                    type="submit"
                />
            </form> 

            <section>
                <h2>Mis tareas</h2>

                {tasks.map((task) =>(
                    <article key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                    </article>
                ))}
            </section>
        </main>
    );
}

export default TasksPage;