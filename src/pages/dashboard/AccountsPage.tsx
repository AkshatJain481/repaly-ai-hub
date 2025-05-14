
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Instagram, Check, Loader2 } from "lucide-react";
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

const AccountsPage = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState<any[]>([]); // Empty array as you'll handle the backend logic

  const handleAddAccount = () => {
    if (!username.trim()) {
      toast.error("Please enter a username");
      return;
    }

    setIsLoading(true);
    
    // You mentioned you'll handle the backend logic
    // This is just a placeholder for UI demonstration
    setTimeout(() => {
      toast.success(`Ready to connect @${username}`);
      setUsername("");
      setIsDialogOpen(false);
      setIsLoading(false);
    }, 1000);
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

      <div className="bg-card rounded-lg border shadow-sm">
        <div className="p-4 border-b">
          <h2 className="font-medium">Connected Accounts</h2>
        </div>
        
        <div className="divide-y">
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
