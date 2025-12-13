"use client";

import type React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { useLogoutUserMutation } from "@/redux/features/user/user.api";
import { logout as logoutAction } from "@/redux/features/user/user.slice";
import type { IQueryMutationErrorResponse } from "@/types";
import {
  Cable,
  ChevronDown,
  CircleUserRound,
  Folder,
  Award as IdCard,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  X,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

interface INavigation {
  name: string;
  href: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children?: INavigation[];
}

const navigation: INavigation[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Apps", href: "/dashboard/apps", icon: Folder },
  {
    name: "Settings",
    href: "",
    icon: Settings,
    children: [
      { name: "Profile", href: "/dashboard/settings", icon: CircleUserRound },
      { name: "Subscription", href: "/dashboard/settings/plan", icon: IdCard },
    ],
  },
  { name: "Connect Google", href: "/dashboard/connection", icon: Cable },
];

function NavigationItems({
  items,
  pathname,
  expandedItems,
  onToggleExpand,
  onLinkClick,
  isNested = false,
}: {
  items: INavigation[];
  pathname: string;
  expandedItems: Set<string>;
  onToggleExpand: (name: string) => void;
  onLinkClick?: () => void;
  isNested?: boolean;
}) {
  const getClassName = (active: boolean) => {
    return twMerge(
      active
        ? "bg-sidebar-accent/10 text-sidebar-primary border-l-2 border-sidebar-primary"
        : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar/50",
      "flex flex-1 items-center gap-x-3 rounded-md px-3 py-2.5 font-medium text-sm/6 transition-all duration-200"
    );
  };
  return (
    <ul
      role="list"
      className={
        isNested ? "ml-4 space-y-1 border-l border-sidebar-border pl-2" : "-mx-2 space-y-1"
      }
    >
      {items.map((item) => {
        const active = item.href === pathname;
        const isExpanded = expandedItems.has(item.name);
        const hasChildren = item.children && item.children.length > 0;

        return (
          <li key={item.name}>
            <div className="flex items-center">
              {hasChildren ? (
                <button
                  onClick={() => {
                    onToggleExpand(item.name);
                    onLinkClick?.();
                  }}
                  className={`${getClassName(active)} w-full justify-between`}
                >
                  <span className="flex items-center justify-start gap-2">
                    {item.icon && (
                      <item.icon
                        className={twMerge(
                          active ? "text-sidebar-primary" : "text-sidebar-foreground/50",
                          "h-5 w-5 shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    )}
                    {item.name}
                  </span>

                  <span
                    className="mr-2 rounded p-1 hover:bg-sidebar/50"
                    aria-label={`Toggle ${item.name} submenu`}
                  >
                    <ChevronDown
                      className={twMerge(
                        "h-4 w-4 text-sidebar-foreground/50 transition-transform",
                        isExpanded ? "rotate-180" : ""
                      )}
                    />
                  </span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`${getClassName(active)} w-full`}
                  onClick={onLinkClick}
                >
                  {item.icon && (
                    <item.icon
                      className={twMerge(
                        active ? "text-sidebar-primary" : "text-sidebar-foreground/50",
                        "h-5 w-5 shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  )}
                  {item.name}
                </Link>
              )}
            </div>
            {hasChildren && isExpanded && (
              <NavigationItems
                items={item.children!}
                pathname={pathname}
                expandedItems={expandedItems}
                onToggleExpand={onToggleExpand}
                onLinkClick={onLinkClick}
                isNested={true}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutUserMutation();

  const handleToggleExpand = useCallback((itemName: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemName)) {
        newSet.delete(itemName);
      } else {
        newSet.add(itemName);
      }
      return newSet;
    });
  }, []);

  const handleLogout = useCallback(async () => {
    const res = await logoutMutation(undefined);
    const error = res.error as IQueryMutationErrorResponse;
    if (error) {
      toast.error(error?.data?.message || "Something went wrong");
      return;
    }

    dispatch(logoutAction());

    toast.success("Logout successful! Login Again.");
    router.replace("/login");
  }, [logoutMutation, router, dispatch]);

  if (!user) router.replace("/login");

  return (
    <>
      <div className="flex h-[100dvh] items-start justify-start">
        {/* Mobile sidebar */}
        <div
          className={twMerge(
            sidebarOpen ? "fixed" : "hidden",
            "inset-y-0 left-0 z-40 w-72 overflow-y-auto bg-sidebar shadow-xl lg:hidden"
          )}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-sidebar-border px-6">
            <img
              alt="Your Company"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded p-1 hover:bg-sidebar-accent/10"
            >
              <X className="h-5 w-5 text-sidebar-foreground" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col px-6 py-4">
            <NavigationItems
              items={navigation}
              pathname={pathname}
              expandedItems={expandedItems}
              onToggleExpand={handleToggleExpand}
              onLinkClick={() => setSidebarOpen(false)}
            />
          </nav>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden h-full w-fit shrink-0 border-r border-sidebar-border lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-sidebar px-6 py-4">
            <Link href="/" className="flex h-16 shrink-0 items-center gap-[10px]">
              <Image
                width={32}
                height={32}
                alt="Your Company"
                src="/images/logo.png"
                className="h-8 w-auto"
              />
              <span className="text-foreground">DOCVIA</span>
            </Link>

            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <NavigationItems
                    items={navigation}
                    pathname={pathname}
                    expandedItems={expandedItems}
                    onToggleExpand={handleToggleExpand}
                  />
                </li>

                <li className="relative -mx-6 mt-auto border-t border-sidebar-border px-4 py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="relative flex w-full items-center rounded-lg px-2 py-2 transition-all duration-200 hover:bg-sidebar-accent/10 focus:outline-0">
                      <span className="sr-only">Open user menu</span>
                      <div>
                        {user?.avatar ? (
                          <Image
                            src={user.avatar || "/placeholder.svg"}
                            alt="User Avatar"
                            className="h-8 w-8 rounded-full ring-2 ring-sidebar-primary/30"
                            width={32}
                            height={32}
                          />
                        ) : (
                          <CircleUserRound className="size-8 text-sidebar-primary/50" />
                        )}
                      </div>
                      <div className="w-full px-3 py-1">
                        <div className="truncate text-left">
                          <h4 className="truncate text-sm font-semibold text-sidebar-foreground">
                            {user?.first_name && user?.last_name
                              ? `${user.first_name} ${user.last_name}`
                              : "User"}
                          </h4>
                          <p className="truncate text-[12px] text-sidebar-foreground/50">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-56 border-sidebar-border bg-sidebar"
                    >
                      <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard/settings"
                          className="group flex w-full cursor-pointer items-center gap-x-2 text-sidebar-foreground hover:text-sidebar-primary"
                        >
                          <Settings className="size-4 shrink-0" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <button
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                          aria-busy={isLoggingOut}
                          className="group flex w-full cursor-pointer items-center gap-x-2 text-destructive hover:text-red-400"
                        >
                          <LogOut className="size-4 shrink-0" />
                          {isLoggingOut ? "Logging out..." : "Logout"}
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <main className="smoothBar h-full w-full overflow-auto bg-gradient-to-b from-background to-primary/10 px-4 py-6 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded p-2 text-foreground hover:bg-muted"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          {children}
        </main>
      </div>
    </>
  );
}
