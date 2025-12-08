"use client";

import type React from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
  IdCard,
  LayoutDashboard,
  LogOut,
  MenuIcon,
  Settings,
  SettingsIcon,
  X,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

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

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

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
    return classNames(
      active ? "bg-gray-200" : "",
      "flex flex-1 items-center gap-x-3 rounded-md px-3 py-2 font-poppins text-sm/6 font-normal text-gray-950 hover:bg-gray-200"
    );
  };
  return (
    <ul
      role="list"
      className={isNested ? "ml-4 space-y-1 border-l border-gray-200 pl-2" : "-mx-2 space-y-1"}
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
                  className={`${getClassName(active)} justify-between`}
                >
                  <span className="flex items-center justify-start gap-[4px]">
                    {item.icon && (
                      <item.icon
                        className={classNames(
                          active ? "text-indigo-600" : "text-gray-400",
                          "h-6 w-6 shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    )}
                    {item.name}
                  </span>

                  <span
                    className="mr-2 rounded p-1 hover:bg-gray-200"
                    aria-label={`Toggle ${item.name} submenu`}
                  >
                    <ChevronDown
                      className={classNames(
                        "h-4 w-4 transition-transform",
                        isExpanded ? "rotate-180" : ""
                      )}
                    />
                  </span>
                </button>
              ) : (
                <Link href={item.href} className={getClassName(active)} onClick={onLinkClick}>
                  {item.icon && (
                    <item.icon
                      className={classNames(
                        active ? "text-indigo-600" : "text-gray-400",
                        "h-6 w-6 shrink-0"
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
      <div className="h-full">
        {/* Mobile sidebar */}
        <Dialog open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <DialogContent className="inset-0 top-0 right-auto left-0 z-50 w-full max-w-xs rounded-none border-none p-0 lg:hidden">
            {/* Backdrop */}
            <div
              className="fixed inset-0 -z-10 bg-gray-900/80"
              onClick={() => setSidebarOpen(false)}
            />

            <div className="absolute top-0 left-full flex w-16 justify-center pt-5">
              <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                <span className="sr-only">Close sidebar</span>
                <X aria-hidden="true" className="size-6 text-white" />
              </button>
            </div>

            {/* Sidebar content */}
            <div className="relative flex h-full grow flex-col gap-y-5 overflow-y-auto bg-background px-6 pb-2">
              <div className="relative flex h-16 shrink-0 items-center gap-2">
                <img
                  alt="Your Company"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </div>

              <nav className="relative flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <NavigationItems
                      items={navigation}
                      pathname={pathname}
                      expandedItems={expandedItems}
                      onToggleExpand={handleToggleExpand}
                      onLinkClick={() => setSidebarOpen(false)}
                    />
                  </li>
                </ul>
              </nav>
            </div>
          </DialogContent>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6">
            <div className="flex h-16 shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </div>

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

                <li className="relative -mx-6 mt-auto border-t border-gray-200 px-4 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="relative flex w-full items-center rounded-md px-2 py-1 hover:bg-gray-200 focus:outline-0">
                      <span className="sr-only">Open user menu</span>
                      <div>
                        {user?.avatar ? (
                          <Image
                            src={user.avatar || "/placeholder.svg"}
                            alt="User Avatar"
                            className="h-8 w-8 rounded-full"
                            width={32}
                            height={32}
                          />
                        ) : (
                          <CircleUserRound className="size-6" />
                        )}
                      </div>
                      <div className="w-full px-2.5 py-1">
                        <div className="truncate text-left">
                          <h4 className="truncate text-sm font-medium text-gray-900">
                            {user?.first_name && user?.last_name
                              ? `${user.first_name} ${user.last_name}`
                              : "User"}
                          </h4>
                          <p className="truncate pl-[2px] text-left text-[12px] text-gray-500">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-full">
                      <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard/settings"
                          className="group flex w-full cursor-pointer items-center gap-x-2"
                        >
                          <Settings className="size-5 shrink-0 text-gray-600 group-hover:text-gray-700" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <button
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                          aria-busy={isLoggingOut}
                          className="group flex w-full cursor-pointer items-center gap-x-2 text-red-500"
                        >
                          <LogOut
                            aria-hidden="true"
                            className="size-5 shrink-0 text-red-500 group-hover:text-red-600"
                          />
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

        {/* Top bar (mobile) */}
        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-background px-4 py-4 sm:px-6 lg:hidden">
          <Dialog open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 lg:hidden"
              >
                <span className="sr-only">Open sidebar</span>
                <MenuIcon aria-hidden="true" className="size-6" />
              </button>
            </DialogTrigger>
          </Dialog>
          <div className="flex-1 text-sm/6 font-semibold text-gray-900">Dashboard</div>
          <DropdownMenu>
            <DropdownMenuTrigger className="relative flex items-center rounded-md px-2 py-1 hover:bg-gray-200 focus:outline-0">
              <span className="sr-only">Open user menu</span>
              <div>
                {user?.avatar ? (
                  <Image
                    src={user.avatar || "/placeholder.svg"}
                    alt="User Avatar"
                    className="h-8 w-8 rounded-full"
                    width={32}
                    height={32}
                  />
                ) : (
                  <CircleUserRound className="size-6" />
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/settings"
                  className="group flex w-full cursor-pointer items-center gap-x-2"
                >
                  <SettingsIcon className="size-5 shrink-0 text-gray-600 group-hover:text-gray-700" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  aria-busy={isLoggingOut}
                  className="group flex w-full cursor-pointer items-center gap-x-2 text-red-500"
                >
                  <LogOut
                    aria-hidden="true"
                    className="size-5 shrink-0 text-red-500 group-hover:text-red-600"
                  />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <main className="min-h-[calc(100vh-32px)] py-4 lg:ml-72">
          <div className="min-h-[calc(100vh-32px)] rounded-md bg-white px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
