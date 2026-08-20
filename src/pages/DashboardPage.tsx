import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import type { Task } from "../types/Task";

function DashboardPage() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);

  const completedTasks = tasks.filter((task) => task.completed).length;

  const progress =
    tasks.length === 0 ? 0 : Math.round((completedTasks / tasks.length) * 100);

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

        <div className="dashboard-actions">
          <button
            className="button button-primary"
            onClick={() => navigate("/tasks")}
          >
            Mis tareas
          </button>

          <button className="button button-danger" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <section className="dashboard-stats">
        <article className="task-card dashboard-card-total">
          <h2>Total</h2>
          <p>{tasks.length}</p>
        </article>

        <article className="task-card dashboard-card-completed">
          <h2>Completadas</h2>
          <p>{tasks.filter((task) => task.completed).length}</p>
        </article>

        <article className="task-card dashboard-card-pending">
          <h2>Pendientes</h2>
          <p>{tasks.filter((task) => !task.completed).length}</p>
        </article>

        <article className="task-card dashboard-card-progress">
          <h2>Progreso</h2>

          <p>{progress}%</p>

          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </article>
      </section>
    </main>
  );
}

export default DashboardPage;
