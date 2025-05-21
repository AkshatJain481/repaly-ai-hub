
import * as React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface RadioCardItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupItem> {
  icon?: React.ReactElement;
  label?: React.ReactNode;
  description?: React.ReactNode;
  addon?: React.ReactNode;
  indicator?: React.ReactNode | null;
  indicatorPlacement?: "start" | "end" | "inside";
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const RadioCardItem = React.forwardRef<
  HTMLInputElement,
  RadioCardItemProps
>(function RadioCardItem(props, ref) {
  const {
    id,
    inputProps,
    label,
    description,
    addon,
    icon,
    indicator = <div className="h-3 w-3 rounded-full bg-primary"></div>,
    indicatorPlacement = "end",
    className,
    ...rest
  } = props;

  const hasContent = label || description || icon;

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <RadioGroupItem id={id} ref={ref} {...rest} {...inputProps} />
      <label 
        htmlFor={id} 
        className="flex w-full cursor-pointer items-center justify-between rounded-md border border-input p-4 hover:bg-accent"
      >
        <div className="flex items-center space-x-2">
          {indicatorPlacement === "start" && indicator}
          {hasContent && (
            <div>
              {icon}
              {label && <div className="font-medium">{label}</div>}
              {description && <div className="text-sm text-muted-foreground">{description}</div>}
              {indicatorPlacement === "inside" && indicator}
            </div>
          )}
          {indicatorPlacement === "end" && indicator}
        </div>
        {addon && <div>{addon}</div>}
      </label>
    </div>
  );
});

export const RadioCardRoot = RadioGroup;
export const RadioCardLabel = React.forwardRef<
  HTMLLabelElement, 
  React.LabelHTMLAttributes<HTMLLabelElement>
>((props, ref) => (
  <label ref={ref} {...props} className={cn("text-sm font-medium leading-none", props.className)}>
    {props.children}
  </label>
));
RadioCardLabel.displayName = "RadioCardLabel";

export const RadioCardItemIndicator = () => (
  <div className="h-3 w-3 rounded-full bg-primary"></div>
);
