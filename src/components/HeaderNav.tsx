import { useEffect, useState } from 'react';

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#precios', label: 'Precios' },
  { href: '#blog', label: 'Blog' },
  { href: '#contacto', label: 'Contacto' },
];

export default function HeaderNav() {
  const [activeSection, setActiveSection] = useState<string>('proyectos');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            setActiveSection(id);
          }
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const handleClick = (href: string) => {
    const targetId = href.replace('#', '');
    setActiveSection(targetId);
  };

  return (
    <header className="w-250 mx-auto px-12 mt-6 sticky top-0 border border-pri/10 rounded-md bg-background/50 backdrop-blur z-50">
      <section className="flex h-16 items-center justify-between">
        <a href="#hero">
          <figure className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt="Logo Winker"
              className="w-10 h-10 object-contain"
            />
            <p className="font-semibold text-xl">Winkermind</p>
          </figure>
        </a>

        <nav>
          <ul className="flex items-center gap-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <li
                  key={item.href}
                  className={`transition-all ${isActive
                      ? 'border-[0.5px] px-2 py-1 border-border-pri bg-tertiary rounded-full'
                      : ''
                    }`}
                >
                  <a
                    href={item.href}
                    onClick={() => handleClick(item.href)}
                    className={`transition-colors ${isActive ? 'text-pri' : 'text-sec'
                      }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex gap-4 items-center font-normal text-sec">
          <button>Login</button>
          <button className="px-4 py-2 font-normal text-pri bg-quaternary rounded-full">
            Registrate
          </button>
        </div>
      </section>
    </header>
  );
}
