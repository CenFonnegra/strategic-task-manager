
interface ButtonProps {
    text: string;
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
    variant?: "primary" | "secondary" | "danger" | "success";
}

function Button({ text, onClick, type ="button", disabled, variant = "primary" }: ButtonProps) {
    return (
        <button
            className={`button button-${variant}`}
            type={type}
            onClick={onClick}
            disabled={disabled}
            >
            {text}
        </button>
    );
}

export default Button;