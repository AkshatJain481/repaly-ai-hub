
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Home, 
  Instagram, 
  LogOut, 
  Settings, 
  User,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { PlatformAccountProps } from "@/lib/interfaces";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  isCollapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  onClose: () => void;
  isMobile: boolean;
}

const DashboardSidebar = ({ 
  isCollapsed, 
  onCollapsedChange, 
  onClose,
  isMobile
}: DashboardSidebarProps) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [connectedAccounts, setConnectedAccounts] = useState<PlatformAccountProps[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<PlatformAccountProps | null>(null);

  // Mock data for demonstration
  useEffect(() => {
    // In a real app, you would fetch this from your API
    // This is just for demonstration
    const mockAccounts: PlatformAccountProps[] = [
      {
        platformName: "instagram",
        access_token: "mock-token-1",
        created_time: "2023-01-01T00:00:00Z",
        id: "123456789",
        media_count: 42,
        name: "John Doe",
        updated_time: "2023-05-15T00:00:00Z",
        user_id: "user123",
        username: "johndoe",
        profile_picture_url: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&q=80"
      },
      {
        platformName: "instagram",
        access_token: "mock-token-2",
        created_time: "2023-02-01T00:00:00Z",
        id: "987654321",
        media_count: 28,
        name: "Jane Smith",
        updated_time: "2023-06-15T00:00:00Z",
        user_id: "user456",
        username: "janesmith",
        profile_picture_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&q=80"
      }
    ];
    
    setConnectedAccounts(mockAccounts);
    // Set the first account as selected by default if there is one
    if (mockAccounts.length > 0 && !selectedAccount) {
      setSelectedAccount(mockAccounts[0]);
    }
  }, []);

  const handleLogout = async () => {
    await signOut();
  };

  const handleAccountSelect = (accountId: string) => {
    const account = connectedAccounts.find(acc => acc.id === accountId);
    if (account) {
      setSelectedAccount(account);
      // In mobile view, close the sidebar after selection
      if (isMobile) {
        onClose();
      }
    }
  };

  const navigateTo = (path: string) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  return (
    <div className={cn(
      "h-full flex flex-col bg-sidebar text-sidebar-foreground relative",
      isCollapsed ? "items-center" : ""
    )}>
      {/* Header */}
      <div className={cn(
        "flex items-center gap-2 p-4 border-b border-sidebar-border",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        {!isCollapsed && (
          <Link to="/dashboard" className="text-xl font-bold text-gradient" onClick={() => isMobile && onClose()}>
            repaly.ai
          </Link>
        )}

        {isMobile ? (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-3"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onCollapsedChange(!isCollapsed)}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Navigation */}
        <div className={cn("py-4", isCollapsed ? "px-2" : "px-4")}>
          <div className="space-y-1">
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start gap-3",
                location.pathname === "/dashboard" && "bg-sidebar-accent text-sidebar-accent-foreground",
                isCollapsed && "justify-center p-2"
              )}
              onClick={() => navigateTo("/dashboard")}
            >
              <Home className="h-4 w-4" />
              {!isCollapsed && <span>Dashboard</span>}
            </Button>
            
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start gap-3",
                location.pathname === "/dashboard/accounts" && "bg-sidebar-accent text-sidebar-accent-foreground",
                isCollapsed && "justify-center p-2"
              )}
              onClick={() => navigateTo("/dashboard/accounts")}
            >
              <User className="h-4 w-4" />
              {!isCollapsed && <span>Accounts</span>}
            </Button>
            
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start gap-3",
                location.pathname === "/dashboard/settings" && "bg-sidebar-accent text-sidebar-accent-foreground",
                isCollapsed && "justify-center p-2"
              )}
              onClick={() => navigateTo("/dashboard/settings")}
            >
              <Settings className="h-4 w-4" />
              {!isCollapsed && <span>Settings</span>}
            </Button>
          </div>
        </div>

        {/* Accounts Section */}
        {connectedAccounts.length > 0 && (
          <div className={cn("py-4 border-t border-sidebar-border", isCollapsed ? "px-2" : "px-4")}>
            {!isCollapsed && (
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">Instagram Accounts</h3>
            )}
            
            {!isCollapsed ? (
              <Select 
                value={selectedAccount?.id} 
                onValueChange={handleAccountSelect}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an account" />
                </SelectTrigger>
                <SelectContent>
                  {connectedAccounts.map(account => (
                    <SelectItem key={account.id} value={account.id}>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={account.profile_picture_url} alt={account.username} />
                          <AvatarFallback>{account.username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span>@{account.username}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="flex flex-col items-center gap-2">
                {connectedAccounts.map(account => (
                  <Button
                    key={account.id}
                    variant="ghost"
                    className={cn(
                      "p-1",
                      selectedAccount?.id === account.id && "bg-sidebar-accent"
                    )}
                    onClick={() => handleAccountSelect(account.id)}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={account.profile_picture_url} alt={account.username} />
                      <AvatarFallback>{account.username.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                ))}
              </div>
            )}
            
            {/* Show Instagram content navigation if an account is selected */}
            {selectedAccount && !isCollapsed && (
              <div className="mt-3 space-y-1">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 text-sm",
                    location.pathname.includes(`/dashboard/instagram/${selectedAccount.id}/posts`) && "bg-sidebar-accent text-sidebar-accent-foreground"
                  )}
                  onClick={() => navigateTo(`/dashboard/instagram/${selectedAccount.id}/posts`)}
                >
                  <Instagram className="h-4 w-4" />
                  <span>Posts</span>
                </Button>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 text-sm",
                    location.pathname.includes(`/dashboard/instagram/${selectedAccount.id}/stories`) && "bg-sidebar-accent text-sidebar-accent-foreground"
                  )}
                  onClick={() => navigateTo(`/dashboard/instagram/${selectedAccount.id}/stories`)}
                >
                  <Instagram className="h-4 w-4" />
                  <span>Stories</span>
                </Button>
              </div>
            )}
            
            {/* Add Account Button */}
            <div className={cn("mt-3", isCollapsed ? "flex justify-center" : "")}>
              <Button
                variant="outline"
                size={isCollapsed ? "icon" : "default"}
                className={cn(
                  isCollapsed ? "p-2" : "w-full justify-start gap-3"
                )}
                onClick={() => navigateTo("/dashboard/accounts")}
              >
                <PlusCircle className="h-4 w-4" />
                {!isCollapsed && <span>Add Account</span>}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Footer with User Profile */}
      <div className={cn(
        "p-4 border-t border-sidebar-border mt-auto",
        isCollapsed ? "flex justify-center" : ""
      )}>
        {user && (
          isCollapsed ? (
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={handleLogout}>
              <Avatar className="h-9 w-9">
                <AvatarImage 
                  src={user.user_metadata?.avatar_url} 
                  alt={user.user_metadata?.full_name || user.email || ""} 
                />
                <AvatarFallback>
                  {user.user_metadata?.full_name?.charAt(0) || 
                   user.email?.charAt(0) || 
                   "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          ) : (
            <div className="flex items-center justify-between gap-2 w-full overflow-hidden">
              <div className="flex items-center gap-2 min-w-0">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage
                    src={user.user_metadata?.avatar_url}
                    alt={user.user_metadata?.full_name || user.email || ""}
                  />
                  <AvatarFallback>
                    {user.user_metadata?.full_name?.charAt(0) ||
                      user.email?.charAt(0) ||
                      "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
