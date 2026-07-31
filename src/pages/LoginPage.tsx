import Button from "../components/Button";
import { useState } from "react";


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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateLogin()) {
        return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
        setLoading(false);

        console.log("Email:", email);
        console.log("Password:", password);

        setEmail("");
        setPassword("");
    }, 2000);

  }

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  return (
    <main>
      <h1>Iniciar Sesión</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(event) =>{
              setEmail(event.target.value)
              setError("");
            }}  
            
          />
        </div>

        <div>
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
            text= {loading ?  "Iniciando Sesión..." :  "Iniciar Sesión" } 
            type="submit" 
            disabled={loading}
            />
      </form>
    </main>
  );
}

export default LoginPage;
