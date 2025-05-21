
import * as React from "react";
import {
  Drawer as DrawerPrimitive,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import CloseButton from "./CloseButton";

interface DrawerContentProps extends React.ComponentPropsWithoutRef<typeof DrawerContent> {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
  offset?: string | number;
}

export const DrawerContent = React.forwardRef<
  HTMLDivElement,
  DrawerContentProps
>(function DrawerContent(props, ref) {
  const { children, portalled = true, portalRef, offset, ...rest } = props;
  return (
    <DrawerContent ref={ref} {...rest}>
      {children}
    </DrawerContent>
  );
});

export const DrawerCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof DrawerClose>
>(function DrawerCloseTrigger(props, ref) {
  return (
    <DrawerClose
      className="absolute top-2 right-2"
      {...props}
    >
      <CloseButton ref={ref} size="sm" />
    </DrawerClose>
  );
});

export const DrawerTrigger = DrawerPrimitive.Trigger;
export const DrawerRoot = DrawerPrimitive.Root;
export const DrawerFooter = DrawerPrimitive.Footer;
export const DrawerHeader = DrawerPrimitive.Header;
export const DrawerBody = DrawerPrimitive.Content;
export const DrawerBackdrop = DrawerPrimitive.Overlay;
export const DrawerDescription = DrawerPrimitive.Description;
export const DrawerTitle = DrawerPrimitive.Title;
export const DrawerActionTrigger = DrawerClose;
