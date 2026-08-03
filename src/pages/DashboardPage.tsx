import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  
    const navigate = useNavigate();

    async function handleLogout() {
        await signOut(auth);

        navigate("/login");
    }

    return(
        <main>
            <h1>Dashboard</h1>
            <p>~ Bienvenido ~</p>

            <button onClick={handleLogout}>
                Cerrar sesión
            </button>
        </main>
    );
}

export default DashboardPage;