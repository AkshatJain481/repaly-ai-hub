
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Instagram, Check, Loader2, LinkIcon, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlatformAccountProps } from "@/lib/interfaces";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const AccountsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState<PlatformAccountProps[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

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
    
    // Comment out the next line to see the empty state UI
    setAccounts(mockAccounts);
  }, []);

  const handleAddAccount = () => {
    if (!username.trim()) {
      toast.error("Please enter a username");
      return;
    }

    setIsLoading(true);
    
    // You'll handle the backend logic later
    setTimeout(() => {
      toast.success(`Ready to connect @${username}`);
      setUsername("");
      setIsDialogOpen(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleAccountSelection = (id: string) => {
    setSelectedAccountId(selectedAccountId === id ? null : id);
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Social Media Accounts</h1>
          <p className="text-muted-foreground">Manage your connected social media accounts</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Instagram Account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Instagram Account</DialogTitle>
              <DialogDescription>
                Enter your Instagram username to connect your account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Instagram Username</Label>
                <Input 
                  id="username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. username" 
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isLoading}>Cancel</Button>
              <Button onClick={handleAddAccount} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  'Connect'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {accounts.length === 0 ? (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-center">No Social Media Accounts Connected</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-8">
            <div className="rounded-full bg-violet-100 p-6 mb-6">
              <Instagram size={48} className="text-violet-600" />
            </div>
            <p className="text-center text-muted-foreground max-w-md mb-6">
              Connect your Instagram account to start automating your responses and increasing your engagement.
            </p>
            <Button 
              onClick={() => setIsDialogOpen(true)} 
              size="lg"
              className="gap-2"
            >
              <PlusCircle size={18} />
              Connect Instagram Account
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map(account => (
            <Card 
              key={account.id}
              className={`cursor-pointer transition-all ${
                selectedAccountId === account.id 
                  ? "ring-2 ring-primary" 
                  : "hover:border-primary/50"
              }`}
              onClick={() => handleAccountSelection(account.id)}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
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
                <div className="flex items-center">
                  {selectedAccountId === account.id && (
                    <Badge variant="outline" className="mr-2 bg-primary/10">
                      <Check className="h-3 w-3 mr-1" />
                      Selected
                    </Badge>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/dashboard/instagram/${account.id}/posts`);
                      }}>
                        View Posts
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/dashboard/instagram/${account.id}/stories`);
                      }}>
                        View Stories
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={(e) => {
                        e.stopPropagation();
                        toast.error("Disconnect feature will be implemented later");
                      }}>
                        Disconnect
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Platform:</span>
                    <span className="text-sm font-medium flex items-center">
                      <Instagram className="h-3 w-3 mr-1" /> Instagram
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Media Count:</span>
                    <span className="text-sm font-medium">{account.media_count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Connected:</span>
                    <span className="text-sm font-medium">
                      {new Date(account.created_time).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/dashboard/instagram/${account.id}/posts`);
                  }}
                >
                  View Posts
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/dashboard/instagram/${account.id}/stories`);
                  }}
                >
                  View Stories
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountsPage;
