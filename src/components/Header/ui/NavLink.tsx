import { memo, useCallback, type ReactElement } from 'react';
import {
  MOBILE_NAV_ITEM_CLASSES,
  type NavIconKey,
  type NavLinkProps,
} from '../types';

const NAV_ICONS: Record<NavIconKey, ReactElement> = {
  folder: (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  tag: (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  ),
  question: (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 15a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 12 17zm1-4h-2V7h2z" />
    </svg>
  ),
  file: (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  mail: (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
};

function NavLinkComponent({
  item,
  isActive,
  onClick,
  isMobile = false,
  registerNode,
}: NavLinkProps) {
  const handleClick = useCallback(() => {
    onClick(item.href);
  }, [item.href, onClick]);

  if (isMobile) {
    return (
      <li
        className={`${MOBILE_NAV_ITEM_CLASSES} list-none transition-all duration-300 ease-out`}
      >
        <a
          href={item.href}
          onClick={handleClick}
          className={`flex items-center gap-3 transition-all duration-300 ease-out ${isActive ? 'text-pri font-semibold' : 'text-sec'}`}
          aria-current={isActive ? 'page' : undefined}
        >
          {item.icon && (
            <span className="shrink-0">{NAV_ICONS[item.icon]}</span>
          )}
          <span>{item.label}</span>
        </a>
      </li>
    );
  }

  return (
    <li
      ref={(node) => registerNode?.(item.href, node)}
      className="relative z-10 hidden md:block rounded-full px-3 py-1.5 transition-all duration-300 ease-out"
    >
      <a
        href={item.href}
        onClick={handleClick}
        className={`inline-flex items-center justify-center font-medium transition-all duration-300 ease-out ${isActive ? 'text-pri' : 'text-sec hover:text-pri'}`}
        aria-current={isActive ? 'page' : undefined}
      >
        {item.label}
      </a>
    </li>
  );
}

export const NavLink = memo(NavLinkComponent, (prevProps, nextProps) => {
  return (
    prevProps.item === nextProps.item &&
    prevProps.isActive === nextProps.isActive &&
    prevProps.onClick === nextProps.onClick &&
    prevProps.isMobile === nextProps.isMobile &&
    prevProps.registerNode === nextProps.registerNode
  );
});
