import Button from "../components/Button";

function LoginPage() {

    function handleLogin() {
        console.log("Iniciando sesión...");
    }

    return (
        <>
            <h1>Login</h1>

            <Button 
            text="Iniciar sesión" 
            onClick={handleLogin}
            />
        </>
    );
}



export default LoginPage;