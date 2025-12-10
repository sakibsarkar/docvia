"use client";

import type React from "react";

import {
  ArrowRight,
  MessageCircleCode,
  MessageCircleMore,
  PanelsTopLeft,
  Settings,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { use, useEffect, useId, useMemo, useState } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export type NavItem = {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
  children?: NavItem[];
  action?: ReactNode;
};

function usePersistentOpen(key: string, initial: boolean) {
  const [open, setOpen] = useState<boolean>(initial);
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(key) : null;
    if (saved !== null) setOpen(saved === "1");
  }, [key]);
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem(key, open ? "1" : "0");
  }, [key, open]);
  return [open, setOpen] as const;
}

export default function AppDetailsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ appId: string }>;
}) {
  const { appId } = use(params);
  const pathname = usePathname();

  // NOTE: first-child routes have distinct paths so parents can redirect to them
  const navigation: NavItem[] = useMemo(
    () => [
      { name: "Overview", href: `/dashboard/apps/${appId}`, icon: PanelsTopLeft },
      {
        name: "Channels",
        href: `/dashboard/apps/${appId}/channels`,
        icon: MessageCircleMore,
        children: [
          {
            name: "Chat Widget",
            href: `/dashboard/apps/${appId}/channels/chat-widget`,
            icon: MessageCircleCode,
          },
        ],
      },
      {
        name: "Settings",
        href: `/dashboard/apps/${appId}/settings`,
        icon: Settings,
      },
      {
        name: "User Management",
        href: `/dashboard/apps/${appId}/users`,
        icon: Users,
        children: [{ name: "Members", href: `/dashboard/apps/${appId}/users/members`, icon: User }],
      },
    ],
    [appId]
  );

  // title from path (segment after slug)
  const segments = pathname.split("/").filter(Boolean);
  let pageTitle = "Overview";
  if (segments.length > 3) {
    pageTitle = segments[segments.length - 1]
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  }

  // Active: exact match only; parents won't be active when a child is.
  const isItemActive = (item: NavItem) => pathname === item.href;

  return (
    <div className="flex gap-4">
      {/* Sidebar */}
      <aside className="inset-y-0 top-10 shrink-0 lg:z-50 lg:flex lg:w-66 lg:flex-col">
        <div className="bg-glow-blue flex grow flex-col gap-y-5 overflow-y-auto bg-sidebar px-2 py-2">
          <div className="flex items-center justify-between pr-1">
            <h4 className="font-poppins text-lg font-medium text-sidebar-foreground">
              Administration
            </h4>
          </div>

          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-2">
              {navigation.map((item) => (
                <SidebarItem
                  key={item.name}
                  item={item}
                  active={isItemActive(item)}
                  pathname={pathname}
                />
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main */}
      <div className="w-full px-4">
        <div className="z-30 border-b border-border bg-background/80 px-4 pt-8 pb-6 font-poppins text-[16px] font-medium text-foreground backdrop-blur-md">
          {pageTitle}
        </div>
        <div className="z-10 mt-3">{children}</div>
      </div>
    </div>
  );
}

function SidebarItem({
  item,
  active,
  pathname,
}: {
  item: NavItem;
  active: boolean;
  pathname: string;
}) {
  const hasChildren = !!item.children?.length;
  const groupId = useId();

  // child active (exact or nested under a child)
  const childActive = hasChildren
    ? item.children!.some((c) => pathname === c.href || pathname.startsWith(c.href + "/"))
    : false;

  // open if parent is active OR any child is active
  const [open, setOpen] = usePersistentOpen(`nav:${item.href}`, active || childActive);

  const ItemIcon = item.icon;

  // auto-open when path enters this group via deep-link
  useEffect(() => {
    if (hasChildren && childActive && !open) setOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, hasChildren, childActive]);

  // Style: parent row active only on exact match
  const parentActive = active;

  return (
    <li>
      <div className="flex flex-col">
        {/* Parent row */}
        {hasChildren ? (
          <button
            type="button"
            className={cn(
              parentActive
                ? "bg-sidebar-accent/10 text-sidebar-primary"
                : "text-sidebar-foreground hover:bg-sidebar-accent/5",
              "group flex items-center gap-x-3 rounded-md px-3 py-2 text-left font-poppins text-sm font-normal transition-colors"
            )}
            aria-expanded={open}
            aria-controls={groupId}
            onClick={() => setOpen((v) => !v)}
          >
            <ItemIcon
              aria-hidden="true"
              className={cn(
                parentActive
                  ? "text-sidebar-primary"
                  : childActive
                    ? "text-sidebar-accent"
                    : "text-sidebar-foreground/60",
                "size-4.5 shrink-0 transition-colors"
              )}
            />
            <span className="flex-1">{item.name}</span>
            <ArrowRight
              className={cn(
                "size-4 transition-transform duration-200",
                open ? "rotate-90 text-sidebar-accent" : "text-sidebar-foreground/40"
              )}
              aria-hidden="true"
            />
          </button>
        ) : (
          <Link
            href={item.href}
            className={cn(
              parentActive
                ? "bg-sidebar-accent/10 text-sidebar-primary"
                : "text-sidebar-foreground hover:bg-sidebar-accent/5",
              "group flex items-center gap-x-3 rounded-md px-3 py-2 font-poppins text-sm font-normal transition-colors"
            )}
          >
            <ItemIcon
              aria-hidden="true"
              className={cn(
                parentActive ? "text-sidebar-primary" : "text-sidebar-foreground/60",
                "size-4.5 shrink-0 transition-colors"
              )}
            />
            <span className="flex-1">{item.name}</span>
          </Link>
        )}

        {/* Children */}
        {hasChildren && (
          <div
            id={groupId}
            role="group"
            className={cn("mt-1 pl-6", open ? "block" : "hidden")}
            data-open={open}
          >
            <ul className="space-y-1">
              {item.children!.map((child) => {
                const ChildIcon = child.icon;
                const childIsActive =
                  pathname === child.href || pathname.startsWith(child.href + "/");
                return (
                  <li key={child.name}>
                    <Link
                      href={child.href}
                      className={cn(
                        childIsActive
                          ? "bg-sidebar-accent/10 text-sidebar-primary"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/5 hover:text-sidebar-foreground",
                        "group flex items-center gap-x-3 rounded-md px-3 py-2 font-poppins text-sm font-normal transition-colors"
                      )}
                    >
                      <ChildIcon
                        aria-hidden="true"
                        className={cn(
                          childIsActive ? "text-sidebar-primary" : "text-sidebar-foreground/50",
                          "size-4.5 shrink-0 transition-colors"
                        )}
                      />
                      <span className="flex-1">{child.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            {item.action}
          </div>
        )}
      </div>
    </li>
  );
}
