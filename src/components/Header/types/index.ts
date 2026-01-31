export interface NavItem {
  href: string;
  label: string;
}

export interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
  onClick: (href: string) => void;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#precios', label: 'Precios' },
  { href: '#blog', label: 'Blog' },
  { href: '#contacto', label: 'Contacto' },
] as const;

export const SCROLL_THRESHOLD = 50;
export const OBSERVER_OPTIONS = {
  root: null,
  rootMargin: '-20% 0px -60% 0px',
  threshold: 0,
} as const;

// CSS Classes
export const HEADER_BASE_CLASSES = 'mx-auto px-12 sticky rounded-md z-50 transition-all duration-700 ease-in-out';
export const HEADER_SCROLLED_CLASSES = 'w-4xl top-6 border border-pri/10 bg-background/50 backdrop-blur';
export const HEADER_INITIAL_CLASSES = 'w-7xl top-2 border-transparent bg-transparent';
export const SECTION_BASE_CLASSES = 'flex items-center justify-between transition-all duration-700 ease-in-out';
export const NAV_ACTIVE_CLASSES = 'border-[0.5px] px-2 py-1 border-border-pri bg-tertiary rounded-full';