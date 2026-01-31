import { useCallback } from "react";
import { NAV_ACTIVE_CLASSES, type NavLinkProps } from "../types";

export function NavLink({ item, isActive, onClick }: NavLinkProps) {
  const handleClick = useCallback(() => {
    onClick(item.href);
  }, [item.href, onClick]);

  return (
    <li className={`transition-all ${isActive ? NAV_ACTIVE_CLASSES : ''}`}>
      <a
        href={item.href}
        onClick={handleClick}
        className={`transition-colors ${isActive ? 'text-pri' : 'text-sec'}`}
        aria-current={isActive ? 'page' : undefined}
      >
        {item.label}
      </a>
    </li>
  );
}