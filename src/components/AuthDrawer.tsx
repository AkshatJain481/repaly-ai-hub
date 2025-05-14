
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Facebook, GoogleIcon } from "@/components/icons/SocialIcons";
import { useAuthDrawerStore } from "@/stores/authDrawerStore";
import { useAccountStore } from "@/stores/accountStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AuthDrawer = () => {
  const { isOpen, closeDrawer } = useAuthDrawerStore();
  const { setUser, setAuthenticated } = useAccountStore();
  const navigate = useNavigate();

  const handleSignIn = (provider: 'google' | 'facebook') => {
    // Mock authentication for now
    // In a real app, this would connect to your auth provider
    const mockUser = {
      name: provider === 'google' ? 'John Doe' : 'Jane Smith',
      email: provider === 'google' ? 'john@example.com' : 'jane@example.com',
      avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${provider === 'google' ? 'john' : 'jane'}`
    };
    
    setUser(mockUser);
    setAuthenticated(true);
    
    // Close drawer and redirect to dashboard
    closeDrawer();
    toast.success(`Signed in as ${mockUser.name}`);
    navigate('/dashboard');
  };

  return (
    <Drawer open={isOpen} onOpenChange={closeDrawer}>
      <DrawerContent className="max-w-md mx-auto">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-center text-2xl">Welcome to repaly.ai</DrawerTitle>
            <DrawerDescription className="text-center">
              Sign in to manage your social media automation
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="p-4 space-y-4 pb-8">
            <Button 
              className="w-full flex items-center justify-center gap-2 bg-white text-slate-800 hover:bg-slate-100 border border-slate-200"
              onClick={() => handleSignIn('google')}
            >
              <GoogleIcon className="h-5 w-5" />
              Sign in with Google
            </Button>
            
            <Button 
              className="w-full flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#1865D1] text-white"
              onClick={() => handleSignIn('facebook')}
            >
              <Facebook className="h-5 w-5" />
              Sign in with Facebook
            </Button>
            
            <p className="text-center text-sm text-muted-foreground mt-6">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
          
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AuthDrawer;
