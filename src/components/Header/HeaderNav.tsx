import { HEADER_BASE_CLASSES, HEADER_INITIAL_CLASSES, HEADER_SCROLLED_CLASSES, NAV_ITEMS, SECTION_BASE_CLASSES } from './types';
import { useScrollDetection, useSectionObserver } from './hooks';
import { useCallback, useMemo } from 'react';

import { AuthButtons, Logo, NavLink} from './ui';

export default function HeaderNav() {
  const isScrolled = useScrollDetection();
  const [activeSection, setActiveSection] = useSectionObserver();

  const handleNavClick = useCallback((href: string) => {
    const targetId = href.replace('#', '');
    setActiveSection(targetId);
  }, [setActiveSection]);

  const headerClasses = useMemo(() => {
    return `${HEADER_BASE_CLASSES} ${isScrolled ? HEADER_SCROLLED_CLASSES : HEADER_INITIAL_CLASSES
      }`;
  }, [isScrolled]);

  const sectionClasses = useMemo(() => {
    return `${SECTION_BASE_CLASSES} ${isScrolled ? 'h-16' : 'h-20'}`;
  }, [isScrolled]);

  return (
    <header className={headerClasses} role="banner">
      <section className={sectionClasses}>
        <Logo />

        <nav role="navigation" aria-label="Navegación principal">
          <ul className="flex items-center gap-4">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                isActive={activeSection === item.href.replace('#', '')}
                onClick={handleNavClick}
              />
            ))}
          </ul>
        </nav>

        <AuthButtons />
      </section>
    </header>
  );
}
