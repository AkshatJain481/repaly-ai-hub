
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import MobileDashboardHeader from "./MobileDashboardHeader";
import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const DashboardLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-200 hidden md:block`}>
          <DashboardSidebar 
            isCollapsed={isSidebarCollapsed}
            onCollapsedChange={setIsSidebarCollapsed}
            onClose={() => {}}
            isMobile={false}
          />
        </div>
      )}
      
      {/* Mobile Sidebar (Sheet) */}
      {isMobile && (
        <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
          <SheetContent side="left" className="p-0 w-64 sm:max-w-sm">
            <DashboardSidebar 
              onClose={() => setIsMobileSidebarOpen(false)}
              isMobile={true}
              isCollapsed={false}
              onCollapsedChange={() => {}}
            />
          </SheetContent>
        </Sheet>
      )}
      
      {/* Main Content Area */}
      <main className="flex-grow overflow-auto">
        {isMobile && (
          <MobileDashboardHeader onMenuClick={() => setIsMobileSidebarOpen(true)} />
        )}
        <div className="h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
