import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("text-base", {
  variants: {
    variant: {
      heading1: "text-3xl md:text-4xl lg:text-5xl font-bold text-primary",
      heading2: "text-3xl font-bold text-primary",
      heading3: "text-2xl font-bold text-primary",
      heading4: "text-xl font-bold text-primary",
      heading5: "text-lg font-bold text-primary",
      heading6: "text-base font-bold text-primary",
      paragraph: "text-base",
      caption: "text-sm italic",
    },
    color: {
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent",
      foreground: "text-foreground",
    },
    tag: {
      h1: "h1",
      h2: "h2",
      h3: "h3",
      h4: "h4",
      h5: "h5",
      h6: "h6",
      p: "p",
    },
  },

  defaultVariants: {
    variant: "paragraph",
    tag: "p",
    color: "foreground",
  },
});

export interface TypographyProps
  extends VariantProps<typeof typographyVariants> {
  className?: string;
  children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({
  className,
  variant,
  color,
  tag,
  children,
}) => {
  const getTag = (tag: string) => {
    switch (tag) {
      case "h1":
        return "h1";
      case "h2":
        return "h2";
      case "h3":
        return "h3";
      case "h4":
        return "h4";
      case "h5":
        return "h5";
      case "h6":
        return "h6";
      default:
        return "p";
    }
  };

  const Tag = getTag(tag!);
  return (
    <Tag className={cn(typographyVariants({ variant, color, className }))}>
      {children}
    </Tag>
  );
};

export default Typography;
