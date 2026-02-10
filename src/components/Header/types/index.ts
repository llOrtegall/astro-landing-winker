export interface NavItem {
  href: string;
  label: string;
  icon?: NavIconKey;
}

export type NavIconKey = 'folder' | 'tag' | 'file' | 'mail';

export interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
  onClick: (href: string) => void;
  isMobile?: boolean;
}

export const NAV_ITEMS: readonly NavItem[] = [
  {
    href: '#proyectos',
    label: 'Proyectos',
    icon: 'folder',
  },
  {
    href: '#precios',
    label: 'Precios',
    icon: 'tag',
  },
  {
    href: '#blog',
    label: 'Blog',
    icon: 'file',
  },
  {
    href: '#contacto',
    label: 'Contacto',
    icon: 'mail',
  },
] as const;

export const SCROLL_THRESHOLD = 50;
export const OBSERVER_OPTIONS = {
  root: null,
  rootMargin: '-20% 0px -60% 0px',
  threshold: 0,
} as const;

// CSS Classes - Desktop
export const HEADER_BASE_CLASSES =
  'mx-auto sticky rounded-xl z-50 transition-all duration-500 ease-in-out bg-background/95 backdrop-blur-md';
export const HEADER_SCROLLED_CLASSES =
  'md:w-2xl lg:w-3xl 2xl:w-5xl md:top-6 md:border md:border-pri/5 md:bg-background/95 backdrop-blur px-4 md:px-12 top-0 md:rounded-xl';
export const HEADER_INITIAL_CLASSES =
  'md:w-3xl lg:w-4xl 2xl:w-6xl md:top-2 md:border-transparent md:bg-transparent px-4 md:px-12';
export const SECTION_BASE_CLASSES =
  'flex items-center justify-between transition-all duration-500 ease-in-out';
export const NAV_ACTIVE_CLASSES =
  'px-4 py-2 rounded-full bg-primary/60 text-primary font-medium';

// Mobile Menu Classes
export const MOBILE_MENU_CLASSES =
  'fixed left-0 right-0 top-16 md:hidden bg-primary/95 backdrop-blur-md border-b border-border-pri/30 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300 z-40';
export const MOBILE_NAV_CLASSES = 'flex flex-col w-full';
export const MOBILE_NAV_ITEM_CLASSES =
  'px-4 py-3 border-b border-border-pri/10 hover:bg-tertiary/50 transition-colors';
export const MOBILE_OVERLAY_CLASSES =
  'fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-30 animate-in fade-in duration-300';
