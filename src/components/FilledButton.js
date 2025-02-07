export default function FilledButton({type = "bottom", className, disabled = false, children}) {
    return (
        <button type={type} className={" flex items-center justify-center gap-2 px-4 py-2 bg-dark/75 text-white rounded-full  font-semibold " + className}
        disabled={disabled}
        >
            {children}
            Login</button>
    );
}