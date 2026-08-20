import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import type { Task } from "../types/Task";

function DashboardPage() {
  const navigate = useNavigate();

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

    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      const tasksData: Task[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Task, "id">),
      }));

      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    await signOut(auth);

    navigate("/login");
  }

  return (
    <main className="tasks-page">
      <header className="dashboard-header">
    <div>
        <h1>Dashboard</h1>
        <p>Bienvenido de nuevo 👋</p>
    </div>

    <button onClick={handleLogout}>
        Cerrar sesión
    </button>
</header>

      <section className="dashboard-stats">

        <article className="task-card">
          <h2>Total</h2>
          <p>{tasks.length}</p>
        </article>

        <article className="task-card">
          <h2>Completadas</h2>
          <p>{tasks.filter((task) => task.completed).length}</p>
        </article>

        <article className="task-card">
          <h2>Pendientes</h2>
          <p>{tasks.filter((task) => !task.completed).length}</p>
        </article>

        <article className="task-card">
          <h2>Progreso</h2>
          <p>
            {tasks.length === 0
              ? 0
              : Math.round(
                  (tasks.filter((task) => task.completed).length /
                    tasks.length) *
                    100
                )}
            %
          </p>
        </article>
      </section>
    </main>
  );
}

export default DashboardPage;
