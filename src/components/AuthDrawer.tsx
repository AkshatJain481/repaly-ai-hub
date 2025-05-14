
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
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const AuthDrawer = () => {
  const { isOpen, closeDrawer } = useAuthDrawerStore();
  const { signInWithGoogle, signInWithFacebook } = useAuth();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
      closeDrawer();
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setIsFacebookLoading(true);
    try {
      await signInWithFacebook();
      closeDrawer();
    } finally {
      setIsFacebookLoading(false);
    }
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
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <GoogleIcon className="h-5 w-5" />
              )}
              Sign in with Google
            </Button>
            
            <Button 
              className="w-full flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#1865D1] text-white"
              onClick={handleFacebookSignIn}
              disabled={isFacebookLoading}
            >
              {isFacebookLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Facebook className="h-5 w-5" />
              )}
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
