
import * as React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
  function CloseButton(props, ref) {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        aria-label="Close" 
        ref={ref} 
        {...props}
      >
        {props.children ?? <X className="h-4 w-4" />}
      </Button>
    );
  }
);

export default CloseButton;
