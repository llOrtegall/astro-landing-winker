import { memo } from 'react';

export interface AuthButtonsProps {
  isMobile?: boolean;
  className?: string;
}

function AuthButtonsComponent({
  isMobile = false,
  className = '',
}: AuthButtonsProps) {
  if (isMobile) {
    return (
      <div
        className={`flex gap-2 px-4 py-4 border-t border-border-pri/20 ${className}`}
      >
        <a
          href="https://auth.winkermind.com/login"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Iniciar sesión"
          className="w-full px-3 py-2 text-center text-pri hover:text-pri transition-colors text-sm border rounded-full border-gray-600"
        >
          Login
        </a>
        <a
          href="https://auth.winkermind.com/register"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full px-3 py-2 text-center font-normal text-pri bg-quaternary rounded-full hover:brightness-110 transition-all duration-200 text-sm"
          aria-label="Registrarse"
        >
          Registrate
        </a>
      </div>
    );
  }

  return (
    <div
      className={`hidden md:flex shrink-0 items-center font-normal text-sec gap-2 lg:gap-4 ${className}`}
    >
      <a
        href="https://auth.winkermind.com/login"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Iniciar sesión"
        className="cursor-pointer whitespace-nowrap text-xs lg:text-sm xl:text-base hover:text-gray-200 transition-colors duration-300"
      >
        Login
      </a>
      <a
        href="https://auth.winkermind.com/register"
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer whitespace-nowrap px-3 lg:px-4 xl:px-5 py-1.5 lg:py-2 font-normal text-xs lg:text-sm xl:text-base text-pri bg-quaternary rounded-full hover:brightness-110 transition-all duration-200"
        aria-label="Registrarse"
      >
        Registrate
      </a>
    </div>
  );
}

export const AuthButtons = memo(AuthButtonsComponent);
