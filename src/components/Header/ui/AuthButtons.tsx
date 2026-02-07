export interface AuthButtonsProps {
  isMobile?: boolean;
  className?: string;
}

export function AuthButtons({
  isMobile = false,
  className = '',
}: AuthButtonsProps) {
  if (isMobile) {
    return (
      <div
        className={`flex flex-col gap-2 px-4 py-4 border-t border-border-pri/20 ${className}`}
      >
        <button
          aria-label="Iniciar sesión"
          className="w-full px-3 py-2 text-pri hover:text-pri transition-colors text-sm border rounded-full border-gray-600"
        >
          Login
        </button>
        <button
          className="w-full px-3 py-2 font-normal text-pri bg-quaternary rounded-full hover:brightness-110 transition-all duration-200 text-sm"
          aria-label="Registrarse"
        >
          Registrate
        </button>
      </div>
    );
  }

  return (
    <div className="hidden md:flex gap-4 items-center font-normal text-sec">
      <button
        aria-label="Iniciar sesión"
        className="hover:underline cursor-pointer"
      >
        Login
      </button>
      <button
        className="cursor-pointer px-3 py-2 font-normal text-pri bg-quaternary rounded-full hover:brightness-110 transition-all duration-200"
        aria-label="Registrarse"
      >
        Registrate
      </button>
    </div>
  );
}
