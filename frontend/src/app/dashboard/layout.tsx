"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { useLogoutUserMutation } from "@/redux/features/user/user.api";
import { logout as logoutAction } from "@/redux/features/user/user.slice";
import { IQueryMutationErrorResponse } from "@/types";
import {
  Cable,
  CircleUserRound,
  Folder,
  LayoutDashboard,
  LogOut,
  MenuIcon,
  Settings,
  SettingsIcon,
  X,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Apps", href: "/dashboard/apps", icon: Folder },
  { name: "Connect Google", href: "/dashboard/connection", icon: Cable },
];

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutUserMutation();

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
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <X aria-hidden="true" className="size-6 text-white" />
                  </button>
                </div>
              </TransitionChild>

              {/* Sidebar content */}
              <div className="relative flex grow flex-col gap-y-5 overflow-y-auto bg-background px-6 pb-2">
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
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => {
                          const active = item.href === pathname;
                          return (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-200" : "",
                                  "group flex items-center gap-x-3 rounded-md px-3 py-2 font-poppins text-sm/6 font-normal text-gray-950 hover:bg-gray-200"
                                )}
                                onClick={() => setSidebarOpen(false)}
                              >
                                <item.icon
                                  aria-hidden="true"
                                  className={classNames(
                                    active ? "text-gray-950" : "text-gray-600",
                                    "size-4.5 shrink-0"
                                  )}
                                />
                                {item.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
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
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => {
                      const active = item.href === pathname;
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={classNames(
                              active ? "bg-gray-200" : "",
                              "group flex items-center gap-x-3 rounded-md px-3 py-2 font-poppins text-sm/6 font-normal text-gray-950 hover:bg-gray-200"
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className={classNames(
                                active ? "text-gray-950" : "text-gray-600",
                                "size-4.5 shrink-0"
                              )}
                            />
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>

                <li className="relative -mx-6 mt-auto border-t border-gray-200 px-4 py-3">
                  <Menu as="div" className="relative rounded-md px-2 py-1 hover:bg-gray-200">
                    <MenuButton className="relative flex items-center focus:outline-0">
                      <span className="sr-only">Open user menu</span>
                      <div>
                        {user?.avatar ? (
                          <Image
                            src={user.avatar}
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
                    </MenuButton>
                    <MenuItems
                      transition
                      className="absolute -top-24 right-0 left-0 z-10 w-full origin-bottom-right overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                      <MenuItem>
                        <Link
                          href="/dashboard/settings"
                          className="group flex w-full items-center gap-x-2 rounded-md px-4 py-2 text-sm/6 font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                          <Settings className="size-5 shrink-0 text-gray-600 group-hover:text-gray-700" />
                          Settings
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <button
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                          aria-busy={isLoggingOut}
                          className="group flex w-full items-center gap-x-2 rounded-md px-4 py-2 text-sm/6 font-semibold text-red-500 transition hover:bg-gray-100"
                        >
                          <LogOut
                            aria-hidden="true"
                            className="size-5 shrink-0 text-red-500 group-hover:text-red-600"
                          />
                          {isLoggingOut ? "Logging out..." : "Logout"}
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Top bar (mobile) */}
        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-background px-4 py-4 sm:px-6 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon aria-hidden="true" className="size-6" />
          </button>
          <div className="flex-1 text-sm/6 font-semibold text-gray-900">Dashboard</div>
          <Menu as="div" className="relative rounded-md px-2 py-1 hover:bg-gray-200">
            <MenuButton className="relative flex items-center focus:outline-0">
              <span className="sr-only">Open user menu</span>
              <div>
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt="User Avatar"
                    className="h-8 w-8 rounded-full"
                    width={32}
                    height={32}
                  />
                ) : (
                  <CircleUserRound className="size-6" />
                )}
              </div>
            </MenuButton>
            <MenuItems
              transition
              className="absolute top-9 right-0 z-10 w-36 origin-bottom-right overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <MenuItem>
                <Link
                  href="/dashboard/settings"
                  className="group flex w-full items-center gap-x-2 rounded-md px-4 py-2 text-sm/6 font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  <SettingsIcon className="size-5 shrink-0 text-gray-600 group-hover:text-gray-700" />
                  Settings
                </Link>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  aria-busy={isLoggingOut}
                  className="group flex w-full items-center gap-x-2 rounded-md px-4 py-2 text-sm/6 font-semibold text-red-500 transition hover:bg-gray-100"
                >
                  <LogOut
                    aria-hidden="true"
                    className="size-5 shrink-0 text-red-500 group-hover:text-red-600"
                  />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
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
