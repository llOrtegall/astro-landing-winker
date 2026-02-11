import { useEffect, useMemo, useRef, useState } from 'react';
import {
  OBSERVER_OPTIONS,
  OBSERVER_THRESHOLDS,
  SCROLL_THRESHOLD,
} from '../types';

export function useScrollDetection(threshold: number = SCROLL_THRESHOLD) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > threshold);
      });
    };

    handleScroll(); // Check initial position
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [threshold]);

  return isScrolled;
}

export function useSectionObserver() {
  const [activeSection, setActiveSection] = useState('');
  const sectionsRef = useRef<HTMLElement[]>([]);
  const rafIdRef = useRef<number | null>(null);

  const observerOptions = useMemo<IntersectionObserverInit>(() => {
    return { ...OBSERVER_OPTIONS, threshold: [...OBSERVER_THRESHOLDS] };
  }, []);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('section[id]'),
    );
    if (sections.length === 0) return;

    sectionsRef.current = sections;

    const pickActiveSection = (entries?: IntersectionObserverEntry[]) => {
      const visible = entries?.filter((entry) => entry.isIntersecting) ?? [];
      if (visible.length > 0) {
        const topEntry = visible.sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio,
        )[0];
        const id = topEntry.target.getAttribute('id');
        if (id) setActiveSection(id);
        return;
      }

      const closest = sectionsRef.current
        .map((section) => ({
          section,
          distance: Math.abs(section.getBoundingClientRect().top),
        }))
        .sort((a, b) => a.distance - b.distance)[0];

      if (closest) {
        const id = closest.section.getAttribute('id');
        if (id) setActiveSection(id);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      pickActiveSection(entries);
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section)
    });

    const handleScroll = () => {
      if (rafIdRef.current !== null) return;
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        pickActiveSection();
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    pickActiveSection();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
    };
  }, [observerOptions]);

  return [activeSection, setActiveSection] as const;
}
