import { Button } from "@/components/ui/button";
import { Instagram, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DashboardHome = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<any[]>([]); // Empty array since you mentioned you'll handle backend logic

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome,{" "}
            {user?.user_metadata?.full_name ||
              user?.email?.split("@")[0] ||
              "User"}
          </h1>
          <p className="text-muted-foreground">
            Manage your social media automation
          </p>
        </div>
      </div>

      <div className="grid gap-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Connected Accounts</h2>
            <Link to="/dashboard/accounts">
              <Button variant="outline" size="sm">
                Manage Accounts
              </Button>
            </Link>
          </div>

          {accounts.length === 0 ? (
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="text-center">
                  No Social Media Accounts Connected
                </CardTitle>
                <CardDescription className="text-center">
                  Connect your Instagram account to start automating your social
                  media engagement
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="rounded-full bg-violet-100 p-6 mb-4">
                  <Instagram size={48} className="text-violet-600" />
                </div>
                <Link to="/dashboard/accounts">
                  <Button size="lg" className="gap-2">
                    <PlusCircle size={18} />
                    Connect Instagram Account
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* This will render connected accounts when you implement the backend */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
