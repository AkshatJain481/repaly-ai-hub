
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <div className="bg-card rounded-lg border shadow-sm">
          <div className="p-4 border-b">
            <h2 className="font-medium">Connected Accounts</h2>
          </div>
          <div className="divide-y">
            {/* This will render connected accounts when you implement the backend */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountsPage;
