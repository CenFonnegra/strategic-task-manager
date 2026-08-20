import Button from "../components/Button";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";


function LoginPage() {

  function validateLogin(): boolean {

    if (!email) {
      setError("El correo es obligatorio");
      return false;
    }
  
    if (!email.includes("@")) {
        setError("El correo debe contener @");
        return false;
    }
  
    if (!email.includes(".")) {
      setError("El correo debe contener un dominio válido");
      return false ;
  }
  
    if (!password) {
      setError("La contraseña es obligatoria");
      return false;
    }
  
    return true;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateLogin()) {
        return;
    }

    setError("");
    setLoading(true);

    try {
       await signInWithEmailAndPassword(auth, email, password);

       setEmail("");
       setPassword("");

       navigate("/dashboard");

    } catch (error) {
          if (error instanceof Error){
                console.log(error.message);
          }
          
          setError("Correo o contraseña inválidos");
    } finally {
        setLoading(false);
    }


  }

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-header">
          <h1>Strategic Task Manager</h1>
          <p>Organiza tus tareas y alcanza tus objetivos.</p>
        </div>
  
        <h2>Iniciar sesión</h2>
  
        {error && (
          <p className="auth-error">
            {error}
          </p>
        )}
  
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
            />
          </div>
  
          <Button
            text={loading ? "Iniciando sesión..." : "Iniciar sesión"}
            type="submit"
            disabled={loading}
          />
        </form>
  
        <p className="auth-footer">
          ¿No tienes una cuenta?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="auth-link"
          >
            Regístrate
          </button>
        </p>
      </section>
    </main>
  );
}

export default LoginPage