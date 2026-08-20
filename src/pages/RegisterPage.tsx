import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function validateRegister(): boolean {
    if (!name) {
      setError("El nombre es obligatorio");
      return false;
    }
  
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
      return false;
    }
  
    if (!password) {
      setError("La contraseña es obligatoria");
      return false;
    }
  
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }
  
    return true;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateRegister()) {
        return;
      }
    
      setError("");

    try {
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
    
        navigate("/dashboard");
    
      } catch (error) {
        console.log(error);
      }
    }
  

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-header">
          <h1>Strategic Task Manager</h1>
          <p>Crea tu cuenta y comienza a organizar tus tareas.</p>
        </div>

        <h2>Crear cuenta</h2>

        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Nombre</label>

            <input
              id="name"
              type="text"
              placeholder="Ingresa tu nombre"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-email">Correo electrónico</label>

            <input
              id="register-email"
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-password">Contraseña</label>

            <input
              id="register-password"
              type="password"
              placeholder="Crea una contraseña"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <Button
            text="Crear cuenta"
            type="submit"
          />
        </form>

        <p className="auth-footer">
          ¿Ya tienes una cuenta?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="auth-link"
          >
            Inicia sesión
          </button>
        </p>
      </section>
    </main>
  );
}

export default RegisterPage;