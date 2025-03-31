// components/ui/scroll-area.tsx
import React from "react";

export const ScrollArea: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={`overflow-y-auto ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
