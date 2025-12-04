"use client";

import { use, useMemo, useState, useEffect, useId } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  Cog6ToothIcon,
  Squares2X2Icon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  ChevronRightIcon,
  InboxIcon,
  ChatBubbleBottomCenterIcon,
  UsersIcon,
  ScissorsIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";

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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const pathname = usePathname();

  // NOTE: first-child routes have distinct paths so parents can redirect to them
  const navigation: NavItem[] = useMemo(
    () => [
      { name: "Overview", href: `/dashboard/apps/${slug}`, icon: Squares2X2Icon },
      {
        name: "Channels",
        href: `/dashboard/apps/${slug}/channels`,
        icon: InboxIcon,
        children: [
          {
            name: "Chat Widget",
            href: `/dashboard/apps/${slug}/channels/chat-widget`,
            icon: ChatBubbleLeftRightIcon,
          },
          {
            name: "FB Messenger",
            href: `/dashboard/apps/${slug}/channels/fb-messenger`,
            icon: ChatBubbleBottomCenterIcon,
          },
        ],
      },
      {
        name: "Settings",
        href: `/dashboard/apps/${slug}/settings`,
        icon: Cog6ToothIcon,
        children: [
          {
            name: "Shortcuts",
            href: `/dashboard/apps/${slug}/settings/shortcuts`,
            icon: ScissorsIcon,
          },
          {
            name: "Triggers",
            href: `/dashboard/apps/${slug}/settings/triggers`,
            icon: HashtagIcon,
          },
        ],
      },
      {
        name: "User Management",
        href: `/dashboard/apps/${slug}/users`,
        icon: UserGroupIcon,
        children: [
          { name: "Members", href: `/dashboard/apps/${slug}/users/members`, icon: UsersIcon },
        ],
      },
    ],
    [slug]
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
      <aside className="fixed inset-y-0 top-10 lg:z-50 lg:flex lg:w-66 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto px-2 py-2">
          <div className="flex items-center justify-between pr-1">
            <h4 className="font-poppins text-lg font-medium text-gray-900">Administration</h4>
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
      <div className="ml-66 w-full px-4">
        <div className="sticky top-0 z-30 -mt-6 bg-white px-4 pt-8 pb-6 font-poppins text-[16px] font-medium text-gray-800">
          {pageTitle}
        </div>
        <div className="z-10 px-2">{children}</div>
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
              parentActive ? "bg-gray-100" : "",
              "group flex items-center gap-x-3 rounded-md px-3 py-2 text-left font-poppins text-sm font-normal text-gray-950 hover:bg-gray-200"
            )}
            aria-expanded={open}
            aria-controls={groupId}
            onClick={() => setOpen((v) => !v)}
          >
            <ItemIcon
              aria-hidden="true"
              className={cn(
                parentActive ? "text-gray-950" : childActive ? "text-gray-900" : "text-gray-600",
                "size-4.5 shrink-0"
              )}
            />
            <span className="flex-1">{item.name}</span>
            <ChevronRightIcon
              className={cn(
                "size-4 transition-transform duration-200",
                open ? "rotate-90 text-gray-900" : "text-gray-500"
              )}
              aria-hidden="true"
            />
          </button>
        ) : (
          <Link
            href={item.href}
            className={cn(
              parentActive ? "bg-gray-100" : "",
              "group flex items-center gap-x-3 rounded-md px-3 py-2 font-poppins text-sm font-normal text-gray-950 hover:bg-gray-200"
            )}
          >
            <ItemIcon
              aria-hidden="true"
              className={cn(parentActive ? "text-gray-950" : "text-gray-600", "size-4.5 shrink-0")}
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
                        childIsActive ? "bg-gray-100" : "",
                        "group flex items-center gap-x-3 rounded-md px-3 py-2 font-poppins text-sm font-normal text-gray-950 hover:bg-gray-200"
                      )}
                    >
                      <ChildIcon
                        aria-hidden="true"
                        className={cn(
                          childIsActive ? "text-gray-950" : "text-gray-600",
                          "size-4.5 shrink-0"
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
