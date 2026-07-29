
interface ButtonProps {
    text: string;
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
}

function Button({ text, onClick, type ="button", disabled }: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            >
            {text}
        </button>
    );
}

export default Button;