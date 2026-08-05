import { useState } from "react";
import Button from "../components/Button";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";


function TasksPage() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();



        const user = auth.currentUser;

        if (!user) {
            return;
        }

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

        console.log(user.uid);
        console.log(title);
        console.log(description);
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
        </main>
    );
}

export default TasksPage;