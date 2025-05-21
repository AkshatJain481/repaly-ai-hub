
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { useLoginMutation } from "@/apis/auth";
import { setCredentials } from "@/redux/slices/auth.slice";
import { FaSpinner } from "react-icons/fa";

interface LoginDrawerProps {
  triggerButton: React.ReactNode;
}

const LoginDrawer = ({ triggerButton }: LoginDrawerProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials(userData));
      navigate("/dashboard");
      toast.success("Logged in successfully!");
    } catch (error: any) {
      toast.error(error?.data || "Something went wrong");
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {triggerButton}
      </DrawerTrigger>
      <DrawerContent className="max-w-md mx-auto overflow-hidden">
        <DrawerHeader>
          <DrawerTitle className="text-2xl">Welcome to Repaly</DrawerTitle>
          <DrawerDescription>
            Log in to your account to access all features
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <DrawerFooter>
          <Button 
            onClick={handleLogin}
            disabled={isLoading || !email || !password}
            className="w-full"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin mr-2" /> 
                Please wait
              </>
            ) : (
              "Login"
            )}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default LoginDrawer;
