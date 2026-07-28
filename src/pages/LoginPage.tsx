import Button from "../components/Button";
import { useState } from "react";

function LoginPage() {
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        console.log("Email:", email);
        console.log("Password:", password);
    }

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    return (
        <main>
            <h1>Iniciar Sesión</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                    id="email"
                    type="email"
                    placeholder="Ingresa tu correo"
                    onChange={(event) =>{
                        setEmail(event.target.value);
                    }}
                    />
                </div>

                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        onChange={(event) =>{
                            setPassword(event.target.value);
                        }}
                        />
                </div>

                <Button
                    text="Iniciar Sesión"
                    type="submit"
                    />
            </form>
        </main>
    );
}



export default LoginPage;