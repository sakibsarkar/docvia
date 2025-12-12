import { clsx, type ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const navlinks: ({ href: string; name: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>)[] =
  [
    {
      href: "/",
      name: "Home",
    },
    {
      href: "/features",
      name: "Features",
    },
    {
      href: "/pricing",
      name: "Pricing",
    },
    {
      href: "https://www.npmjs.com/package/docvia",
      target: "_blank",
      name: "Documentation",
    },
  ];
