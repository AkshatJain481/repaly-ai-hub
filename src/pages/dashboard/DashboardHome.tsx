
import { Button } from "@/components/ui/button";
import { Instagram, PlusCircle, Image, Film } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { PlatformAccountProps } from "@/lib/interfaces";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<PlatformAccountProps[]>([]);
  const [activeTab, setActiveTab] = useState("posts");

  // Mock data for demonstration
  useEffect(() => {
    // In a real app, you would fetch this from your API
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
      }
    ];
    
    // Initialize tab from localStorage if available
    const savedTab = localStorage.getItem('dashboard-active-tab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
    
    // Comment out the next line to see the empty state UI
    setAccounts(mockAccounts);
  }, []);

  // Save active tab to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('dashboard-active-tab', activeTab);
  }, [activeTab]);

  // Navigate to the appropriate page when a tab is selected
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    // If accounts exist, navigate to the appropriate page for the first account
    if (accounts.length > 0) {
      const accountId = accounts[0].id;
      if (tab === 'posts') {
        navigate(`/dashboard/instagram/${accountId}/posts`);
      } else if (tab === 'stories') {
        navigate(`/dashboard/instagram/${accountId}/stories`);
      }
    }
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
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
            <div>
              <div className="mb-6">
                <Tabs value={activeTab} onValueChange={handleTabChange}>
                  <TabsList>
                    <TabsTrigger value="posts" className="gap-2">
                      <Image className="h-4 w-4" />
                      <span className="hidden sm:inline">Posts</span>
                    </TabsTrigger>
                    <TabsTrigger value="stories" className="gap-2">
                      <Film className="h-4 w-4" />
                      <span className="hidden sm:inline">Stories</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accounts.map((account) => (
                  <Card key={account.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={account.profile_picture_url} alt={account.username} />
                          <AvatarFallback>{account.username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">@{account.username}</CardTitle>
                          <p className="text-sm text-muted-foreground">{account.name}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="pt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Media Count:</span>
                          <span className="text-sm font-medium">{account.media_count}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => navigate(`/dashboard/instagram/${account.id}/posts`)}
                      >
                        View Posts
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => navigate(`/dashboard/instagram/${account.id}/stories`)}
                      >
                        View Stories
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
