import { JSX, useCallback, useState, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { MENU_SIDEBAR_COMPACT, MenuItem, MenuConfig } from '@/config/menu.config';
import { useAuth } from '@/hooks/useAuth';

// Helper function to check permission (adapted from web)
function hasPermission(user: any, permission?: string): boolean {
  if (!permission) return true;
  if (!user?.role?.permissions_code) return false;
  return user.role.permissions_code.includes(permission);
}

// Sidebar Header (same as web)
function SidebarHeader() {
  return (
    <div className="mb-3.5">
      <div className="flex items-center justify-between gap-2.5 px-3.5 h-[70px]">
        <h1 className="cursor-pointer font-bold text-2xl tracking-tight flex items-center justify-between gap-2 w-[180px] text-foreground">
          EYESEE
        </h1>
      </div>
    </div>
  );
}

// Sidebar Menu (adapted from web)
function SidebarMenu() {
  const pathname = useLocation().pathname;
  const { user } = useAuth();
  const [openSubMenus, setOpenSubMenus] = useState<string[]>(['DEVICES']); // Default open

  const matchPath = useCallback(
    (path: string): boolean =>
      path === pathname || (path.length > 1 && pathname.startsWith(path)),
    [pathname],
  );

  const toggleSubMenu = (title: string) => {
    setOpenSubMenus(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const buildMenuItemRoot = (item: MenuItem, index: number): JSX.Element | null => {
    if (!item.sidebar) return null;

    // Permission check
    if (item.permission && !hasPermission(user, item.permission)) {
      return null;
    }

    if (item.children) {
      const isOpen = openSubMenus.includes(item.title);
      return (
        <div key={index}>
          <button
            onClick={() => toggleSubMenu(item.title)}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-medium rounded border border-transparent
              ${isOpen ? 'text-foreground' : 'text-muted-foreground'}
              hover:text-foreground hover:bg-muted`}
          >
            <div className="flex items-center gap-2">
              {item.icon && <item.icon className="w-4 h-4" />}
              <span>{item.title}</span>
            </div>
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {isOpen && (
            <div className="ml-6 space-y-1">
              {item.children.map((child, childIndex) => 
                buildMenuItemChild(child, childIndex)
              )}
            </div>
          )}
        </div>
      );
    } else {
      const isSelected = matchPath(item.path || '');
      return (
        <Link
          key={index}
          to={item.path || '#'}
          className={`flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium rounded border 
            ${isSelected 
              ? 'text-foreground bg-background border-border' 
              : 'text-muted-foreground border-transparent hover:text-foreground hover:bg-muted'
            }`}
        >
          {item.icon && <item.icon className="w-4 h-4" />}
          <span>{item.title}</span>
        </Link>
      );
    }
  };

  const buildMenuItemChild = (item: MenuItem, index: number): JSX.Element | null => {
    // Permission check
    if (item.permission && !hasPermission(user, item.permission)) {
      return null;
    }

    const isSelected = matchPath(item.path || '');
    return (
      <Link
        key={index}
        to={item.path || '#'}
        className={`block px-3 py-1.5 text-[13px] rounded
          ${isSelected 
            ? 'text-foreground font-medium' 
            : 'text-muted-foreground hover:text-foreground'
          }`}
      >
        {item.title}
      </Link>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto max-h-[calc(100vh-11.5rem)]">
      <div className="space-y-2.5 px-3.5">
        {MENU_SIDEBAR_COMPACT.map((item, index) => buildMenuItemRoot(item, index))}
      </div>
    </div>
  );
}

// Sidebar Footer (same as web)
function SidebarFooter() {
  const { user, logout } = useAuth();
  
  return (
    <div className="px-3.5 py-4 border-t border-border">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          {user?.image ? (
            <img src={user.image} alt="" className="w-10 h-10 rounded-full" />
          ) : (
            <span className="text-foreground text-sm font-medium">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-foreground truncate">{user?.name}</div>
          <div className="text-xs text-muted-foreground truncate">{user?.role?.name}</div>
        </div>
      </div>
    </div>
  );
}

// Sidebar Component - using semantic colors
function Sidebar() {
  return (
    <div className="fixed top-0 bottom-0 z-20 flex flex-col shrink-0 w-[270px] bg-card border-r border-border">
      <SidebarHeader />
      <SidebarMenu />
      <SidebarFooter />
    </div>
  );
}

// Footer Component
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-3">
          <div className="flex order-2 md:order-1 gap-2 font-normal text-sm">
            <span className="text-muted-foreground">{currentYear} ©</span>
            <span className="text-secondary-foreground hover:text-primary">EYESEE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main ManageLayout Component (same structure as web - using semantic colors)
interface ManageLayoutProps {
  children: ReactNode;
}

export default function ManageLayout({ children }: ManageLayoutProps) {
  return (
    <div className="flex grow min-h-screen bg-muted">
      <Sidebar />
      <div className="flex flex-col min-h-screen grow pt-0 p-[15px]">
        <div className="flex flex-col grow items-stretch rounded-xl bg-background border border-border ml-[270px] mt-[15px]">
          <div className="flex flex-col grow pt-5">
            <main className="grow" role="content">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
