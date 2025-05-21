
import * as React from "react";
import { cn } from "@/lib/utils";

const Tabs = ({ defaultValue, value, onValueChange, children, ...props }: {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  [key: string]: any;
}) => {
  const [selectedTab, setSelectedTab] = React.useState<string>(value || defaultValue || "");
  
  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedTab(value);
    }
  }, [value]);
  
  const handleValueChange = (newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue);
    } else if (value === undefined) {
      setSelectedTab(newValue);
    }
  };
  
  return (
    <div {...props} data-selected-tab={selectedTab}>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;
        
        if (child.type === TabsList || child.type === TabsContent) {
          return React.cloneElement(child as React.ReactElement<any>, { 
            selectedTab,
            onValueChange: handleValueChange 
          });
        }
        
        return child;
      })}
    </div>
  );
};

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { 
    selectedTab?: string;
    onValueChange?: (value: string) => void;
  }
>(({ className, selectedTab, onValueChange, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  >
    {React.Children.map(children, child => {
      if (!React.isValidElement(child) || child.type !== TabsTrigger) return child;
      
      return React.cloneElement(child as React.ReactElement<any>, { 
        selectedTab,
        onValueChange
      });
    })}
  </div>
));
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { 
    value: string;
    selectedTab?: string;
    onValueChange?: (value: string) => void;
  }
>(({ className, selectedTab, value, onValueChange, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      selectedTab === value
        ? "bg-background text-foreground shadow-sm"
        : "hover:bg-background/50 hover:text-foreground",
      className
    )}
    onClick={() => onValueChange?.(value)}
    data-state={selectedTab === value ? "active" : "inactive"}
    {...props}
  >
    {children}
  </button>
));
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { 
    value: string;
    selectedTab?: string;
  }
>(({ className, selectedTab, value, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      selectedTab !== value && "hidden",
      className
    )}
    data-state={selectedTab === value ? "active" : "inactive"}
    {...props}
  >
    {children}
  </div>
));
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
