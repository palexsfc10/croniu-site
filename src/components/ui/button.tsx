import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

const VARIANT_CLASSES = {
  primary:
    "bg-brand-700 text-white shadow-sm hover:bg-brand-800 focus-visible:outline-brand-700",
  secondary:
    "bg-white text-ink border border-ink/15 hover:border-ink/30 hover:bg-ink/[0.03] focus-visible:outline-brand-700",
  ghost: "text-ink hover:bg-ink/5 focus-visible:outline-brand-700",
  ai: "bg-ai-600 text-white shadow-sm hover:bg-ai-700 focus-visible:outline-ai-600",
} as const;

const SIZE_CLASSES = {
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
} as const;

type CommonProps = {
  variant?: keyof typeof VARIANT_CLASSES;
  size?: keyof typeof SIZE_CLASSES;
  className?: string;
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

type LinkButtonProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  const classes = cn(BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className);

  if (props.href !== undefined) {
    const { href, ...anchorProps } = props;
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a href={href} className={classes} {...anchorProps}>
          {props.children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {props.children}
      </Link>
    );
  }

  const { ...buttonProps } = props;
  return (
    <button className={classes} {...buttonProps}>
      {props.children}
    </button>
  );
}
