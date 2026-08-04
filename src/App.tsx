import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TasksPage from "./pages/TasksPage";
import DashboardPage from "./pages/DashboardPage";
import { useState } from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []); 

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage/>} />
      <Route 
        path="/dashboard"
        element={
          <ProtectedRoute user={user} loading={loading}>
            <DashboardPage />
          </ProtectedRoute>
        }
        />
      <Route path="/register" element={<RegisterPage />} />
      <Route 
        path="/tasks"
        element={
        <ProtectedRoute user={user} loading ={loading} >
          <TasksPage />
        </ProtectedRoute>
        }
        />  
    </Routes>
  );

 
}


export default App
