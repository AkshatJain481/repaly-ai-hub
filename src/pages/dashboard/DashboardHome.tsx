
import { useAccountStore } from "@/stores/accountStore";
import { Button } from "@/components/ui/button";
import { Instagram, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  const { user, accounts } = useAccountStore();

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
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
            {accounts.map(account => (
              <div key={account.id} className="bg-card p-4 rounded-lg border shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded">
                    <Instagram className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{account.username}</h3>
                    <p className="text-sm text-muted-foreground">Instagram</p>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Link to={`/dashboard/instagram/${account.id}/posts`} className="flex-1">
                    <Button variant="secondary" className="w-full text-xs">View Posts</Button>
                  </Link>
                  <Link to={`/dashboard/instagram/${account.id}/stories`} className="flex-1">
                    <Button variant="secondary" className="w-full text-xs">View Stories</Button>
                  </Link>
                </div>
              </div>
            ))}

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
