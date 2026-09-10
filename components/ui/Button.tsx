import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/app/lib/utils";

type Variant = "gold" | "ink" | "outline";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-sm font-semibold tracking-[-0.005em] whitespace-nowrap transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-55";

const variants: Record<Variant, string> = {
  gold: "lift gold-gradient text-ink hover:bg-none hover:bg-gold-deep hover:text-paper",
  ink: "lift bg-ink text-paper hover:bg-gold hover:text-ink",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-[0.875rem]",
  lg: "px-7 py-4 text-[0.9375rem]",
};

type SharedProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = SharedProps & {
  href: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

type ButtonAsButton = SharedProps & {
  href?: never;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

/** External schemes bypass the router and render a plain anchor. */
function isExternal(href: string) {
  return /^(tel:|mailto:|https?:)/.test(href);
}

export function Button(props: ButtonProps) {
  const { variant = "gold", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;

    if (isExternal(href)) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
