
import * as React from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "./Checkbox";

interface CheckboxCardProps extends React.ComponentPropsWithoutRef<typeof Checkbox> {
  title: string;
  description?: string;
}

export function CheckboxCard({
  title,
  description,
  className,
  ...props
}: CheckboxCardProps) {
  return (
    <div className={cn("flex items-start space-x-3 rounded-md border p-4", className)}>
      <Checkbox {...props} />
      <div className="space-y-1">
        <p className="font-medium leading-none">{title}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
}
