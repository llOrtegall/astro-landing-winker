import { useCallback } from 'react';
import {
  NAV_ACTIVE_CLASSES,
  MOBILE_NAV_ITEM_CLASSES,
  type NavLinkProps,
} from '../types';

export function NavLink({
  item,
  isActive,
  onClick,
  isMobile = false,
}: NavLinkProps) {
  const handleClick = useCallback(() => {
    onClick(item.href);
  }, [item.href, onClick]);

  if (isMobile) {
    return (
      <li className={`${MOBILE_NAV_ITEM_CLASSES} list-none`}>
        <a
          href={item.href}
          onClick={handleClick}
          className={`flex items-center gap-3 transition-colors ${isActive ? 'text-pri font-semibold' : 'text-sec'}`}
          aria-current={isActive ? 'page' : undefined}
        >
          {item.icon && (
            <span
              className="shrink-0"
              dangerouslySetInnerHTML={{ __html: item.icon }}
              aria-hidden="true"
            />
          )}
          <span>{item.label}</span>
        </a>
      </li>
    );
  }

  return (
    <li
      className={`transition-all hidden md:block ${isActive ? NAV_ACTIVE_CLASSES : ''}`}
    >
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
