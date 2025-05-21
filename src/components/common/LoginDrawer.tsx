import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { getOAuthLink } from "@/apis/oauthLink";

interface LoginDrawerProps {
  triggerButton: React.ReactNode;
}

const LoginDrawer = ({ triggerButton }: LoginDrawerProps) => {
  // Placeholder handlers for button clicks (to be implemented by you)
  const handleGoogleSignIn = () => {
    window.location.href = getOAuthLink("google");
  };

  const handleFacebookSignIn = () => {
    window.location.href = getOAuthLink("facebook");
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
      <DrawerContent className="max-w-md mx-auto overflow-hidden">
        <DrawerHeader>
          <DrawerTitle className="text-2xl">Welcome to Repaly</DrawerTitle>
          <DrawerDescription>
            Sign in with your Google or Facebook account to access all features
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 flex flex-col gap-4">
          <Button
            onClick={handleGoogleSignIn}
            className="w-full bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2 py-3 rounded-lg"
          >
            <FcGoogle size={24} />
            Sign in with Google
          </Button>
          <Button
            onClick={handleFacebookSignIn}
            className="w-full bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2 py-3 rounded-lg"
          >
            <FaFacebook size={24} />
            Sign in with Facebook
          </Button>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default LoginDrawer;
