import { ReactNode } from "react";
import HeaderDashboard from "@/components/HeaderDashboard";
import StreamFullScreenModal from "@/components/Modal/StreamModal";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-dark-ocean lg:p-8 overflow-x-hidden">
      <div className="flex min-h-screen">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <HeaderDashboard />
          <main className="px-4 lg:p-0">
            {children}
          </main>
        </div>
        <StreamFullScreenModal />
      </div>
    </div>
  );
}
