export function AuthButtons() {
  return (
    <div className="flex gap-4 items-center font-normal text-sec">
      <button aria-label="Iniciar sesión">Login</button>
      <button
        className="px-4 py-2 font-normal text-pri bg-quaternary rounded-full hover:brightness-110 transition-all"
        aria-label="Registrarse"
      >
        Registrate
      </button>
    </div>
  );
}
