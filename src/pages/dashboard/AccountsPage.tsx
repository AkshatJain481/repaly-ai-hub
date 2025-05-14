
import { useState } from "react";
import { useAccountStore, SocialAccount } from "@/stores/accountStore";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Instagram, Check } from "lucide-react";
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

const AccountsPage = () => {
  const { accounts, addAccount } = useAccountStore();
  const [username, setUsername] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddAccount = () => {
    if (!username.trim()) {
      toast.error("Please enter a username");
      return;
    }

    // Check if account already exists
    if (accounts.some(acc => acc.username === username)) {
      toast.error("This account is already connected");
      return;
    }

    // Mock adding a new Instagram account
    const newAccount: SocialAccount = {
      id: Date.now().toString(),
      type: "instagram",
      username: username,
      profilePic: `https://api.dicebear.com/7.x/initials/svg?seed=${username}`,
      isConnected: true
    };

    addAccount(newAccount);
    toast.success(`Added @${username} successfully`);
    setUsername("");
    setIsDialogOpen(false);
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Social Media Accounts</h1>
          <p className="text-muted-foreground">Manage your connected social media accounts</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Account</Button>
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
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddAccount}>Connect</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg border shadow-sm">
        <div className="p-4 border-b">
          <h2 className="font-medium">Connected Accounts</h2>
        </div>
        
        <div className="divide-y">
          {accounts.map(account => (
            <div key={account.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded">
                  <Instagram className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">@{account.username}</h3>
                  <div className="flex items-center gap-1 text-xs text-green-500">
                    <Check className="h-3 w-3" />
                    <span>Connected</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}

          {accounts.length === 0 && (
            <div className="p-8 flex flex-col items-center justify-center text-center text-muted-foreground">
              <PlusCircle className="h-10 w-10 mb-2" />
              <h3 className="font-medium text-foreground">No accounts connected</h3>
              <p className="text-sm mt-1">Add your first Instagram account to get started</p>
              <Button onClick={() => setIsDialogOpen(true)} className="mt-4">Add Instagram Account</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;
