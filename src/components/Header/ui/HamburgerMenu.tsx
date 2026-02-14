import { memo } from 'react';

export interface HamburgerMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  ariaLabel?: string;
}

function HamburgerMenuComponent({
  isOpen,
  onToggle,
  ariaLabel = 'Menú de navegación',
}: HamburgerMenuProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={ariaLabel}
      aria-expanded={isOpen}
      aria-controls="mobile-nav"
      className=" md:hidden flex flex-col justify-center items-center gap-1.5 p-2 hover:bg-tertiary/50 rounded transition-colors"
    >
      <span
        className={`block h-0.5 w-6 bg-pri transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
      />
      <span
        className={`block h-0.5 w-6 bg-pri transition-all duration-300 ${isOpen ? 'opacity-0' : ''
          }`}
      />
      <span
        className={`block h-0.5 w-6 bg-pri transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
      />
    </button>
  );
}

export const HamburgerMenu = memo(HamburgerMenuComponent);
