import {
  HEADER_BASE_CLASSES,
  HEADER_INITIAL_CLASSES,
  HEADER_SCROLLED_CLASSES,
  NAV_ITEMS,
  SECTION_BASE_CLASSES,
  MOBILE_MENU_CLASSES,
  MOBILE_NAV_CLASSES,
  MOBILE_OVERLAY_CLASSES,
} from './types';
import { useScrollDetection, useSectionObserver } from './hooks';
import {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';

import { AuthButtons, Logo, NavLink, HamburgerMenu } from './ui';

export default function HeaderNav() {
  const isScrolled = useScrollDetection();
  const [activeSection, setActiveSection] = useSectionObserver();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navListRef = useRef<HTMLUListElement | null>(null);
  const navItemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const [indicatorRect, setIndicatorRect] = useState<{
    left: number;
    width: number;
  } | null>(null);

  const registerNavItem = useCallback(
    (href: string, node: HTMLLIElement | null) => {
      if (node) {
        navItemRefs.current[href] = node;
      } else {
        delete navItemRefs.current[href];
      }
    },
    [],
  );

  const handleNavClick = useCallback(
    (href: string) => {
      const targetId = href.replace('#', '');
      setActiveSection(targetId);
      // Cerrar menú móvil al hacer click en un link
      setIsMobileMenuOpen(false);
    },
    [setActiveSection],
  );

  const handleToggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  // Cerrar menú móvil cuando se redimensiona la ventana a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cerrar menú móvil al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  const headerClasses = useMemo(() => {
    return `${HEADER_BASE_CLASSES} ${
      isScrolled ? HEADER_SCROLLED_CLASSES : HEADER_INITIAL_CLASSES
    }`;
  }, [isScrolled]);

  const sectionClasses = useMemo(() => {
    return `${SECTION_BASE_CLASSES} ${isScrolled ? 'h-16' : 'md:h-20 h-16'}`;
  }, [isScrolled]);

  const updateIndicator = useCallback(() => {
    const listNode = navListRef.current;
    if (!listNode) {
      setIndicatorRect(null);
      return;
    }

    const activeHref = activeSection ? `#${activeSection}` : null;
    if (!activeHref) {
      setIndicatorRect(null);
      return;
    }

    const itemNode = navItemRefs.current[activeHref];
    if (!itemNode) {
      setIndicatorRect(null);
      return;
    }

    const listRect = listNode.getBoundingClientRect();
    const itemRect = itemNode.getBoundingClientRect();

    if (itemRect.width === 0) {
      setIndicatorRect(null);
      return;
    }

    setIndicatorRect({
      left: itemRect.left - listRect.left,
      width: itemRect.width,
    });
  }, [activeSection]);

  useLayoutEffect(() => {
    updateIndicator();

    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  return (
    <>
      <header className={headerClasses}>
        <section className={sectionClasses}>
          <Logo />

          {/* Desktop Navigation */}
          <nav aria-label="Navegación principal" className="hidden md:block">
            <ul
              ref={navListRef}
              className="relative flex items-center gap-6 lg:gap-8 text-sm lg:text-base"
            >
              {indicatorRect && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 hidden h-9 -translate-y-1/2 rounded-full bg-[#202024] shadow-lg transition-[left,width] duration-500 ease-out md:block"
                  style={{
                    left: `${indicatorRect.left}px`,
                    width: `${indicatorRect.width}px`,
                  }}
                />
              )}
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  isActive={activeSection === item.href.replace('#', '')}
                  onClick={handleNavClick}
                  isMobile={false}
                  registerNode={registerNavItem}
                />
              ))}
            </ul>
          </nav>

          {/* Desktop Auth Buttons */}
          <AuthButtons isMobile={false} />

          {/* Mobile Hamburger Menu */}
          <HamburgerMenu
            isOpen={isMobileMenuOpen}
            onToggle={handleToggleMobileMenu}
          />
        </section>
      </header>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <button
          aria-label="Cerrar menú móvil"
          type="button"
          className={MOBILE_OVERLAY_CLASSES}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Navegación móvil"
          className={MOBILE_MENU_CLASSES}
        >
          <ul className={MOBILE_NAV_CLASSES}>
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                isActive={activeSection === item.href.replace('#', '')}
                onClick={handleNavClick}
                isMobile={true}
              />
            ))}
          </ul>
          <AuthButtons isMobile={true} />
        </nav>
      )}
    </>
  );
}
