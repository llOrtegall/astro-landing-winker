export interface NavItem {
  href: string;
  label: string;
  icon?: string;
}

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
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>'
  },
  { 
    href: '#precios', 
    label: 'Precios',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>'
  },
  { 
    href: '#blog', 
    label: 'Blog',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>'
  },
  { 
    href: '#contacto', 
    label: 'Contacto',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>'
  },
] as const;

export const SCROLL_THRESHOLD = 50;
export const OBSERVER_OPTIONS = {
  root: null,
  rootMargin: '-20% 0px -60% 0px',
  threshold: 0,
} as const;

// CSS Classes - Desktop
export const HEADER_BASE_CLASSES = 'mx-auto sticky rounded-xl z-50 transition-all duration-500 ease-in-out bg-background/95 backdrop-blur-md';
export const HEADER_SCROLLED_CLASSES = 'md:w-6xl md:top-6 md:border md:border-pri/5 md:bg-background/95 backdrop-blur px-4 md:px-12 top-0 md:rounded-xl';
export const HEADER_INITIAL_CLASSES = 'md:w-7xl md:top-2 md:border-transparent md:bg-transparent px-4 md:px-12';
export const SECTION_BASE_CLASSES = 'flex items-center justify-between transition-all duration-500 ease-in-out';
export const NAV_ACTIVE_CLASSES = 'px-4 py-2 rounded-full bg-primary/60 text-primary font-medium';

// Mobile Menu Classes
export const MOBILE_MENU_CLASSES = 'fixed left-0 right-0 top-16 md:hidden bg-primary/95 backdrop-blur-md border-b border-border-pri/30 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300 z-40';
export const MOBILE_NAV_CLASSES = 'flex flex-col w-full';
export const MOBILE_NAV_ITEM_CLASSES = 'px-4 py-3 border-b border-border-pri/10 hover:bg-tertiary/50 transition-colors';
export const MOBILE_OVERLAY_CLASSES = 'fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-30 animate-in fade-in duration-300';