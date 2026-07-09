import * as React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '../lib/cn';

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-full text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-[var(--background)]";

    const variants = {
      primary: "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/25",
      secondary: "bg-gradient-to-r from-secondary-600 to-secondary-700 text-white shadow-lg shadow-secondary-500/25",
      outline: "border-2 border-slate-200 text-slate-700 shadow-sm",
      ghost: "text-slate-600",
    };

    const sizes = {
      sm: "h-9 px-3",
      md: "h-10 py-2 px-4",
      lg: "h-11 px-8 text-base",
    };

    // Define hover styles that framer motion will scale
    const hoverStyles = {
      primary: "hover:shadow-primary-500/40",
      secondary: "hover:shadow-secondary-500/40",
      outline: "hover:border-primary-500 hover:bg-primary-50 hover:text-primary-600",
      ghost: "hover:bg-slate-100/80 hover:text-slate-900",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={cn(baseStyles, variants[variant], hoverStyles[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };




