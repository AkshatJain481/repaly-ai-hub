
import { Button } from "@/components/ui/button";
import { Instagram, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const DashboardHome = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<any[]>([]); // Empty array since you mentioned you'll handle backend logic

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}</h1>
          <p className="text-muted-foreground">Manage your social media automation</p>
        </div>
      </div>

      <div className="grid gap-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Connected Accounts</h2>
            <Link to="/dashboard/accounts">
              <Button variant="outline" size="sm">Manage Accounts</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.length === 0 && (
              <Link to="/dashboard/accounts" className="border border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center text-muted-foreground hover:bg-secondary/40 transition-colors">
                <PlusCircle className="h-10 w-10 mb-2" />
                <h3 className="font-medium text-foreground">Connect Instagram Account</h3>
                <p className="text-sm mt-1">Add your first Instagram account to get started</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
