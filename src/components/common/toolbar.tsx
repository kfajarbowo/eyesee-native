import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { MENU_SIDEBAR_COMPACT, MenuItem } from '@/config/menu.config';

// Container component (same as web)
export function Container({ children, className = '' }: { children?: ReactNode; className?: string }) {
  return (
    <div className={`container-fixed px-4 mx-auto max-w-[1580px] ${className}`}>
      {children}
    </div>
  );
}

// Toolbar components (same as web)
export function Toolbar({ children }: { children?: ReactNode }) {
  return (
    <div className="pb-5">
      <Container className="flex items-center justify-between flex-wrap gap-3">
        {children}
      </Container>
    </div>
  );
}

export function ToolbarActions({ children }: { children?: ReactNode }) {
  return (
    <div className="flex items-center flex-wrap gap-1.5 lg:gap-3.5">
      {children}
    </div>
  );
}

// Find current menu item from path
function getCurrentItem(items: MenuItem[], pathname: string): MenuItem | null {
  for (const item of items) {
    if (item.path && pathname.startsWith(item.path)) {
      return item;
    }
    if (item.children) {
      const found = getCurrentItem(item.children, pathname);
      if (found) return found;
    }
  }
  return null;
}

export interface ToolbarHeadingProps {
  title?: string | ReactNode;
}

export const ToolbarHeading = ({ title = '' }: ToolbarHeadingProps) => {
  const pathname = useLocation().pathname;
  const item = getCurrentItem(MENU_SIDEBAR_COMPACT, pathname);

  return (
    <div className="flex flex-col md:flex-row md:items-center flex-wrap gap-1 lg:gap-5">
      <h1 className="font-medium text-lg text-foreground">{title || item?.title}</h1>
    </div>
  );
};
