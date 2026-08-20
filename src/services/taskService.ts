import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase";
import type { Task } from "../types/Task";

export function subscribeToUserTasks(
  userId: string,
  onTasksChange: (tasks: Task[]) => void
): () => void {
  const tasksQuery = query(
    collection(db, "tasks"),
    where("userId", "==", userId)
  );

  const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
    const tasksData: Task[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Task, "id">),
    }));

    onTasksChange(tasksData);
  });

  return unsubscribe;
}

export async function createTask(
  title: string,
  description: string,
  userId: string
): Promise<void> {
  await addDoc(collection(db, "tasks"), {
    title,
    description,
    userId,
    completed: false,
  });
}

export async function updateTask(
  taskId: string,
  title: string,
  description: string
): Promise<void> {
  const taskRef = doc(db, "tasks", taskId);

  await updateDoc(taskRef, {
    title,
    description,
  });
}

export async function deleteTask(taskId: string): Promise<void> {
  const taskRef = doc(db, "tasks", taskId);

  await deleteDoc(taskRef);
}

export async function toggleTaskComplete(
  taskId: string,
  completed: boolean
): Promise<void> {
  const taskRef = doc(db, "tasks", taskId);

  await updateDoc(taskRef, {
    completed: !completed,
  });
}
