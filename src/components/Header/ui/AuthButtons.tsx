export function AuthButtons() {
  return (
    <div className="flex gap-4 items-center font-normal text-sec">
      <button aria-label="Iniciar sesión" className="hover:underline cursor-pointer">Login</button>
      <button
        className="cursor-pointer px-3 py-2 font-normal text-pri bg-quaternary rounded-full hover:brightness-110 transition-all duration-200"
        aria-label="Registrarse"
      >
        Registrate
      </button>
    </div>
  );
}
